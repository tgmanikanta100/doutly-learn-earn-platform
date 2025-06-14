
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
  onSnapshot
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Doubts Service
export const doubtsService = {
  async create(doubt: any) {
    const docRef = await addDoc(collection(db, 'doubts'), {
      ...doubt,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return docRef.id;
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
