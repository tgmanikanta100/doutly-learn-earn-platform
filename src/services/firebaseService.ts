
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

// Doubts Service
export const doubtsService = {
  async create(doubt: any) {
    const ticketNumber = generateTicketNumber();
    const docRef = await addDoc(collection(db, 'doubts'), {
      ...doubt,
      ticketNumber,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    
    // Update user profile with new ticket
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

  async update(id: string, updates: any) {
    const docRef = doc(db, 'doubts', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  async delete(id: string) {
    await deleteDoc(doc(db, 'doubts', id));
  }
};

// Users Service
export const usersService = {
  async create(user: any) {
    const docRef = await addDoc(collection(db, 'users'), {
      ...user,
      createdAt: serverTimestamp(),
      status: 'active'
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

  async update(id: string, updates: any) {
    const docRef = doc(db, 'users', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  }
};

// Leads Service
export const leadsService = {
  async create(lead: any) {
    const docRef = await addDoc(collection(db, 'leads'), {
      ...lead,
      createdAt: serverTimestamp(),
      status: 'new'
    });
    return docRef.id;
  },

  async getAll() {
    const querySnapshot = await getDocs(collection(db, 'leads'));
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
  }
};

// Projects Service  
export const projectsService = {
  async create(project: any) {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: serverTimestamp(),
      status: 'active'
    });
    return docRef.id;
  },

  async getAll(userId?: string) {
    const q = userId 
      ? query(collection(db, 'projects'), where('userId', '==', userId))
      : query(collection(db, 'projects'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};

// Events Service
export const eventsService = {
  async create(event: any) {
    const docRef = await addDoc(collection(db, 'events'), {
      ...event,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async getAll() {
    const querySnapshot = await getDocs(collection(db, 'events'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
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
  }
};
