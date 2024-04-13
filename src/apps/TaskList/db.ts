import Dexie from 'dexie';
import { Task } from './types';

// Define a custom interface extending Dexie's interface
interface MyIndexedDB extends Dexie {
  tasks: Dexie.Table<Task, number>;
}

let db: MyIndexedDB;

export const setupDB = async () => {
  db = new Dexie('MyIndexedDB') as MyIndexedDB;

  // Define the structure of your database
  db.version(1).stores({
    tasks: '++id, name, description',
  });
};

// Define a class that extends Dexie to represent your IndexedDB database

export const getTasks = async () => {
  const tasks = await db.tasks.toArray();
  return tasks;
};

export const deleteTask = async (id: number) => {
  await db.tasks.delete(id);
};

export const addTask = async (name: string, description: string) => {
  await db.tasks.add({ name, description });
};
