import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Snapshot, Aroma, Quiz, Profile } from '@aroma/shared-types';

interface AromaDB extends DBSchema {
  aromas: {
    key: string;
    value: Aroma;
  };
  quizzes: {
    key: string;
    value: Quiz;
  };
  profiles: {
    key: string;
    value: Profile;
  };
  metadata: {
    key: string;
    value: {
      key: string;
      value: any;
    };
  };
}

const DB_NAME = 'aroma-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<AromaDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<AromaDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<AromaDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create object stores
      if (!db.objectStoreNames.contains('aromas')) {
        db.createObjectStore('aromas', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('quizzes')) {
        db.createObjectStore('quizzes', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('profiles')) {
        db.createObjectStore('profiles', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('metadata')) {
        db.createObjectStore('metadata', { keyPath: 'key' });
      }
    },
  });

  return dbInstance;
}

// Aromas
export async function saveAromas(aromas: Aroma[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('aromas', 'readwrite');
  await Promise.all(aromas.map(aroma => tx.store.put(aroma)));
  await tx.done;
}

export async function getAromas(): Promise<Aroma[]> {
  const db = await getDB();
  return db.getAll('aromas');
}

// Quizzes
export async function saveQuizzes(quizzes: Quiz[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('quizzes', 'readwrite');
  await Promise.all(quizzes.map(quiz => tx.store.put(quiz)));
  await tx.done;
}

export async function getQuizzes(): Promise<Quiz[]> {
  const db = await getDB();
  return db.getAll('quizzes');
}

// Profiles
export async function saveProfiles(profiles: Profile[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('profiles', 'readwrite');
  await Promise.all(profiles.map(profile => tx.store.put(profile)));
  await tx.done;
}

export async function getProfiles(): Promise<Profile[]> {
  const db = await getDB();
  return db.getAll('profiles');
}

// Metadata
export async function saveMetadata(key: string, value: any): Promise<void> {
  const db = await getDB();
  await db.put('metadata', { key, value });
}

export async function getMetadata(key: string): Promise<any> {
  const db = await getDB();
  const result = await db.get('metadata', key);
  return result?.value;
}

// Snapshot
export async function saveSnapshot(snapshot: Snapshot): Promise<void> {
  await saveAromas(snapshot.aromas);
  await saveQuizzes(snapshot.quizzes);
  await saveProfiles(snapshot.profiles);
  await saveMetadata('lastSync', snapshot.timestamp);
}

export async function getSnapshot(): Promise<Snapshot | null> {
  const aromas = await getAromas();
  const quizzes = await getQuizzes();
  const profiles = await getProfiles();
  const timestamp = await getMetadata('lastSync');

  if (aromas.length === 0 || quizzes.length === 0 || profiles.length === 0) {
    return null;
  }

  return {
    aromas,
    quizzes,
    profiles,
    timestamp: timestamp || Date.now(),
  };
}

// Check if data is synced
export async function isDataSynced(): Promise<boolean> {
  const snapshot = await getSnapshot();
  return snapshot !== null;
}
