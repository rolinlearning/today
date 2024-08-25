import { useEffect } from 'react';

export function useIndexedDB() {
  const dbName = 'taskDatabase';
  const storeName = 'tasks';

  // Inicializar la base de datos
  useEffect(() => {
    const initDB = () => {
      const request = indexedDB.open(dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(storeName)) {
          const objectStore = db.createObjectStore(storeName, {
            keyPath: 'id',
            autoIncrement: true,
          });
          objectStore.createIndex('title', 'title', { unique: false });
          objectStore.createIndex('category', 'category', { unique: false });
          objectStore.createIndex('completed', 'completed', { unique: false });
          objectStore.createIndex('created_at', 'created_at', {
            unique: false,
          });
        }
      };

      request.onsuccess = () => {
        console.log('Base de datos abierta exitosamente');
      };

      request.onerror = (event) => {
        console.error(
          'Error al abrir la base de datos:',
          event.target.errorCode
        );
      };
    };

    initDB(); // Se ejecuta al montar el componente
  }, []);

  // Función para agregar una tarea
  const addTask = (task) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);

        const addRequest = objectStore.add(task);

        addRequest.onsuccess = () => {
          console.log('Tarea agregada con éxito:', task);
          resolve(task);
        };

        addRequest.onerror = (event) => {
          console.error('Error al agregar la tarea:', event.target.error);
          reject(event.target.error);
        };
      };
    });
  };

  // Función para obtener todas las tareas
  const getTasks = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], 'readonly');
        const objectStore = transaction.objectStore(storeName);
        const tasksRequest = objectStore.getAll();

        tasksRequest.onsuccess = () => {
          const tasks = tasksRequest.result;
          resolve(tasks);
        };

        tasksRequest.onerror = () => {
          reject(tasksRequest.error);
        };
      };
    });
  };

  // Función para eliminar una tarea por ID
  const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);

        const deleteRequest = objectStore.delete(id);

        deleteRequest.onsuccess = () => {
          console.log('Tarea eliminada con éxito, ID:', id);
          resolve(id);
        };

        deleteRequest.onerror = (event) => {
          console.error('Error al eliminar la tarea:', event.target.errorCode);
          reject(event.target.errorCode);
        };
      };
    });
  };

  // Función para actualizar una tarea existente
  const updateTask = (updatedTask) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);

        const updateRequest = objectStore.put(updatedTask);

        updateRequest.onsuccess = () => {
          console.log('Tarea actualizada con éxito:', updatedTask);
          resolve(updatedTask);
        };

        updateRequest.onerror = (event) => {
          console.error('Error al actualizar la tarea:', event.target.error);
          reject(event.target.error);
        };
      };
    });
  };

  return { addTask, getTasks, deleteTask, updateTask };
}
