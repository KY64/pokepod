interface IndexedDB {
  error: any;
  onblocked: any;
  onerror: any;
  onsuccess: any;
  onupgradeneeded: any;
  result: any;
}

interface IndexedDBEvent {
  currentTarget: any;
  target: IndexedDB;
}

interface ObjectStore {
  name: string;
  keyPath: string;
}

export const initDB = (
  name: string,
  version: number,
  objectStore: ObjectStore
) => {
  const idb: IndexedDB = window.indexedDB.open(name, version);
  idb.onerror = (event: IndexedDBEvent) => {
    console.error("Failed to initialize DB", event.target.error);
    return 0;
  };
  idb.onsuccess = (event: any) => {
    const db = event.target.result;
    db.createObjectStore(objectStore.name, { keyPath: objectStore.keyPath });

    return 1;
  };
  idb.onupgradeneeded = (event: any) => {
    const db = event.target.result;
    db.createObjectStore(objectStore.name, { keyPath: objectStore.keyPath });

    return 1;
  };
};

export const createIndex = (idb: IndexedDB) => {
  idb.onsuccess = (event: IndexedDBEvent) => {
    const db = event.target.result;
    const objectStore = db.createObjectStore;
  };
};
