import React, { useEffect, useState } from 'react';
import Dexie from 'dexie';
import './index.css';

// Define a TypeScript interface to represent the structure of your data
export interface Task {
  id?: number;
  name: string;
  description: string;
}

// Define a custom interface extending Dexie's interface
interface MyIndexedDB extends Dexie {
  tasks: Dexie.Table<Task, number>;
}

// Define a class that extends Dexie to represent your IndexedDB database
const db = new Dexie('MyIndexedDB') as MyIndexedDB;

// Define the structure of your database
db.version(1).stores({
  tasks: '++id, name, description',
});

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const tasksFromDb = await db.tasks.toArray();
    setTasks(tasksFromDb);
  }

  async function addTask(name: string, description: string) {
    await db.tasks.add({ name, description });
    loadTasks();
  }

  async function deleteTask(id: number) {
    await db.tasks.delete(id);
    loadTasks();
  }

  async function handleSubmit(e: {
    currentTarget: HTMLFormElement | undefined;
  }) {
    const formData = new FormData(e.currentTarget);
    // const formDataObj = Object.fromEntries(formData);
    if (formData.has('name') && formData.has('description'))
      await addTask(
        formData.get('name') as string,
        formData.get('description') as string,
      );
  }

  return (
    <div className="task-app">
      <h1>Task List</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name-input">Name: </label>
          <input id="name-input" type="text" name="name" required />
        </div>
        <div className="input-group">
          <label htmlFor="desciption-input">Description: </label>
          <textarea
            id="desciption-input"
            rows={3}
            name="description"
            required
          />
        </div>
        <button>Add task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.name} </span>
            <button onClick={() => deleteTask(task.id as number)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
