import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  onSnapshot,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Generate unique ticket number
const generateTicketNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `TKT-${timestamp}-${random}`;
};

// Generate unique lead ID
const generateLeadId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `LEAD-${timestamp}-${random}`;
};

// Generate unique team ID
const generateTeamId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `TEAM-${timestamp}-${random}`;
};

// Doubts Service with enhanced ticket system
export const doubtsService = {
  async create(doubt: any) {
    const ticketNumber = generateTicketNumber();
    const docRef = await addDoc(collection(db, 'doubts'), {
      ...doubt,
      ticketNumber,
      createdAt: serverTimestamp(),
      status: 'pending',
      assignedTo: null,
      resolution: null,
      tutorType: doubt.tutorType || 'instant'
    });
    
    if (doubt.userId) {
      await this.updateUserProfile(doubt.userId, ticketNumber);
    }
    
    return { id: docRef.id, ticketNumber };
  },

  async updateUserProfile(userId: string, ticketNumber: string) {
    const userProfileRef = doc(db, 'userProfiles', userId);
    try {
      const userDoc = await getDoc(userProfileRef);
      if (userDoc.exists()) {
        const currentTickets = userDoc.data().tickets || [];
        await updateDoc(userProfileRef, {
          tickets: [...currentTickets, ticketNumber],
          updatedAt: serverTimestamp()
        });
      } else {
        await setDoc(userProfileRef, {
          userId,
          tickets: [ticketNumber],
          createdAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  },

  async getAll(userId?: string) {
    const q = userId 
      ? query(collection(db, 'doubts'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
      : query(collection(db, 'doubts'), orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getByAssignee(assigneeId: string) {
    const q = query(collection(db, 'doubts'), where('assignedTo', '==', assigneeId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async update(id: string, updates: any) {
    const docRef = doc(db, 'doubts', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  async assignToTutor(doubtId: string, tutorId: string) {
    await this.update(doubtId, {
      assignedTo: tutorId,
      status: 'assigned'
    });
  }
};

// Enhanced Leads Service for Complete CRM flow
export const leadsService = {
  async create(lead: any) {
    const leadId = generateLeadId();
    const docRef = await addDoc(collection(db, 'leads'), {
      ...lead,
      leadId,
      createdAt: serverTimestamp(),
      status: 'new',
      assignedTo: null,
      assignedLevel: null,
      vertical: lead.vertical || 'general',
      source: lead.source || 'website',
      assignmentHistory: []
    });
    return { id: docRef.id, leadId };
  },

  async getAll() {
    const querySnapshot = await getDocs(collection(db, 'leads'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getByAssignee(assigneeEmail: string) {
    const q = query(collection(db, 'leads'), where('assignedTo', '==', assigneeEmail));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getByStatus(status: string) {
    const q = query(collection(db, 'leads'), where('status', '==', status));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async update(id: string, updates: any) {
    const docRef = doc(db, 'leads', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  async assignLead(leadId: string, assigneeEmail: string, assignerEmail: string, level: string) {
    const leadRef = doc(db, 'leads', leadId);
    const leadDoc = await getDoc(leadRef);
    
    if (leadDoc.exists()) {
      const currentHistory = leadDoc.data().assignmentHistory || [];
      const newAssignment = {
        assignedTo: assigneeEmail,
        assignedBy: assignerEmail,
        assignedLevel: level,
        assignedAt: new Date().toISOString(),
        status: `assigned-${level}`
      };

      await updateDoc(leadRef, {
        assignedTo: assigneeEmail,
        assignedLevel: level,
        status: `assigned-${level}`,
        assignmentHistory: [...currentHistory, newAssignment],
        updatedAt: serverTimestamp()
      });
    }
  },

  async bulkAssign(leadIds: string[], assigneeEmail: string, assignerEmail: string, level: string) {
    const promises = leadIds.map(leadId => 
      this.assignLead(leadId, assigneeEmail, assignerEmail, level)
    );
    await Promise.all(promises);
  },

  async updateStatus(leadId: string, status: string, updatedBy: string) {
    await this.update(leadId, {
      status,
      updatedBy,
      statusUpdatedAt: serverTimestamp()
    });
  }
};

// Teams Service for Team Leaders
export const teamsService = {
  async create(team: any) {
    const teamId = generateTeamId();
    const docRef = await addDoc(collection(db, 'teams'), {
      ...team,
      teamId,
      createdAt: serverTimestamp(),
      members: [],
      leaderId: team.leaderId
    });
    return { id: docRef.id, teamId };
  },

  async getByLeader(leaderId: string) {
    const q = query(collection(db, 'teams'), where('leaderId', '==', leaderId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async addMember(teamId: string, memberEmail: string) {
    const teamRef = doc(db, 'teams', teamId);
    const teamDoc = await getDoc(teamRef);
    
    if (teamDoc.exists()) {
      const currentMembers = teamDoc.data().members || [];
      if (!currentMembers.includes(memberEmail)) {
        await updateDoc(teamRef, {
          members: [...currentMembers, memberEmail],
          updatedAt: serverTimestamp()
        });
      }
    }
  },

  async removeMember(teamId: string, memberEmail: string) {
    const teamRef = doc(db, 'teams', teamId);
    const teamDoc = await getDoc(teamRef);
    
    if (teamDoc.exists()) {
      const currentMembers = teamDoc.data().members || [];
      await updateDoc(teamRef, {
        members: currentMembers.filter(member => member !== memberEmail),
        updatedAt: serverTimestamp()
      });
    }
  }
};

// Analytics Service for Daily Sales Whiteboard
export const analyticsService = {
  async getDailySalesData(userEmail: string, userRole: string) {
    const today = new Date().toISOString().split('T')[0];
    
    let leadsQuery;
    switch (userRole) {
      case 'admin':
        leadsQuery = query(collection(db, 'leads'));
        break;
      case 'verticalhead':
      case 'manager':
      case 'teamlead':
        leadsQuery = query(collection(db, 'leads'), where('assignedTo', '==', userEmail));
        break;
      case 'bda':
      case 'sales':
        leadsQuery = query(collection(db, 'leads'), where('assignedTo', '==', userEmail));
        break;
      default:
        leadsQuery = query(collection(db, 'leads'), where('assignedTo', '==', userEmail));
    }

    const querySnapshot = await getDocs(leadsQuery);
    const leads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return {
      totalLeads: leads.length,
      newLeads: leads.filter(l => l.status === 'new').length,
      interestedLeads: leads.filter(l => l.status === 'interested').length,
      boughtLeads: leads.filter(l => l.status === 'bought').length,
      conversionRate: leads.length > 0 ? (leads.filter(l => l.status === 'bought').length / leads.length * 100).toFixed(1) : '0'
    };
  }
};

// Projects Service for Tech Box
export const projectsService = {
  async create(project: any) {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: serverTimestamp(),
      status: 'active',
      category: project.category || 'web-development'
    });
    return docRef.id;
  },

  async getAll(category?: string) {
    const q = category 
      ? query(collection(db, 'projects'), where('category', '==', category))
      : query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getPopular() {
    const q = query(collection(db, 'projects'), orderBy('downloads', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).slice(0, 6);
  }
};

// Events Service
export const eventsService = {
  async create(event: any) {
    const docRef = await addDoc(collection(db, 'events'), {
      ...event,
      createdAt: serverTimestamp(),
      registrations: 0
    });
    return docRef.id;
  },

  async getAll(type?: string) {
    const q = type 
      ? query(collection(db, 'events'), where('type', '==', type))
      : query(collection(db, 'events'), orderBy('date', 'asc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async register(eventId: string, userId: string) {
    const eventRef = doc(db, 'events', eventId);
    const registrationRef = doc(db, 'eventRegistrations', `${eventId}_${userId}`);
    
    await setDoc(registrationRef, {
      eventId,
      userId,
      registeredAt: serverTimestamp()
    });
    
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      const currentRegistrations = eventDoc.data().registrations || 0;
      await updateDoc(eventRef, {
        registrations: currentRegistrations + 1
      });
    }
  }
};

// Users Service for employee management
export const usersService = {
  async create(user: any) {
    const docRef = await addDoc(collection(db, 'users'), {
      ...user,
      createdAt: serverTimestamp(),
      status: 'active',
      earnings: 0,
      rating: 0,
      completedTasks: 0
    });
    return docRef.id;
  },

  async getAll() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getByRole(role: string) {
    const q = query(collection(db, 'users'), where('role', '==', role));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async update(id: string, updates: any) {
    const docRef = doc(db, 'users', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  async updateEarnings(userId: string, amount: number) {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const currentEarnings = userDoc.data().earnings || 0;
      await updateDoc(userRef, {
        earnings: currentEarnings + amount,
        updatedAt: serverTimestamp()
      });
    }
  }
};

// User Profile Service
export const userProfileService = {
  async get(userId: string) {
    const docRef = doc(db, 'userProfiles', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },

  async update(userId: string, updates: any) {
    const docRef = doc(db, 'userProfiles', userId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  async createProfile(userId: string, userInfo: any) {
    const docRef = doc(db, 'userProfiles', userId);
    await setDoc(docRef, {
      userId,
      ...userInfo,
      tickets: [],
      projects: [],
      events: [],
      createdAt: serverTimestamp()
    });
  }
};

// Notifications Service
export const notificationsService = {
  async create(notification: any) {
    const docRef = await addDoc(collection(db, 'notifications'), {
      ...notification,
      createdAt: serverTimestamp(),
      read: false
    });
    return docRef.id;
  },

  async getByUser(userId: string) {
    const q = query(
      collection(db, 'notifications'), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async markAsRead(notificationId: string) {
    const docRef = doc(db, 'notifications', notificationId);
    await updateDoc(docRef, {
      read: true,
      readAt: serverTimestamp()
    });
  }
};
