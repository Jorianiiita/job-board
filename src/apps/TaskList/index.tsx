import { SetStateAction, useEffect, useState } from 'react';
import './index.css';
import { addTask, getTasks, deleteTask, setupDB } from './db';
import { Task } from './types';

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function loadDB() {
      await setupDB();
    }
    loadDB();
    loadTasks();
  }, []);

  async function loadTasks() {
    let tasksFromDb: SetStateAction<Task[]>;
    try {
      tasksFromDb = await getTasks();
    } catch (error) {
      console.error(error);
      tasksFromDb = [];
    }
    setTasks(tasksFromDb);
  }

  async function handleSubmit(e: {
    currentTarget: HTMLFormElement | undefined;
  }) {
    const formData = new FormData(e.currentTarget);
    if (formData.has('name') && formData.has('description')) {
      await addTask(
        formData.get('name') as string,
        formData.get('description') as string,
      );
      loadTasks();
    }
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
            <button
              onClick={async () => {
                await deleteTask(task.id as number);
                loadTasks();
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
