import config from '../config';

const dbName = config.dbName;
export default {
  // indexedDB兼容
  indexedDB: window.indexedDB,
  openDB: (callback: (arg0: IDBDatabase) => void): void => {
    const request = indexedDB.open(dbName);
    request.onsuccess = () => {
      const db = request.result;
      if (callback && typeof callback === 'function') {
        callback(db);
      }
    };
    request.onerror = function () {
      console.log('IndexedDB数据库打开错误');
    };
    request.onupgradeneeded = function () {
      const stores = ['userinfo'];

      const db = request.result;
      stores.forEach((storename) => {
        if (!db.objectStoreNames.contains(storename)) {
          db.createObjectStore(storename, {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      });
    };
  },
  addData: (
    db: IDBDatabase,
    storename: string,
    data: any,
    callback?: () => void
  ): void => {
    const store = db.transaction(storename, 'readwrite').objectStore(storename);
    const request = store.add(data);
    request.onerror = function () {
      console.error('ADD添加数据报错');
    };
    request.onsuccess = function () {
      if (callback && typeof callback === 'function') {
        callback();
      }
    };
  },
};
