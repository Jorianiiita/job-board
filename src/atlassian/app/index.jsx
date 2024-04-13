import { useEffect, useState } from 'react';
import { getIssue, statuses, getSubtasks } from './jira-issue-view/task';
import './index.css';

const arrow = {
  down: '▼',
  right: '▶',
};

function AtlassianApp() {
  // Refactor to use useReducer
  const [data, setData] = useState({});
  const [showToolTip, setShowToolTip] = useState(false);
  const [showSubTask, setShowSubTask] = useState(false);
  const [subtasks, setSubTasks] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await getIssue();
      console.log(res);
      setData(res);
    }
    getData();
  }, []);

  return (
    <div class="app">
      <div class="main-top">
        <h1>{data?.title}</h1>
        <DropDown selectedStatus={data?.status} />
      </div>
      <div
        onClick={async () => {
          const res = await getSubtasks();
          setSubTasks(res);
          setShowSubTask(!showSubTask);
        }}
      >
        <span>{showSubTask ? arrow.down : arrow.right}</span>
        <span
          className="show-subtask"
          title="5 subtask"
          onMouseEnter={() => {
            setShowToolTip(true);
          }}
          onMouseLeave={() => {
            setShowToolTip(false);
          }}
        >
          Show subtasks
        </span>
        {showToolTip && <span className="tool-tip">5 subtask</span>}
      </div>
      {showSubTask && (
        <div className="tasks-list">
          {subtasks.map((subtask) => {
            return (
              <div key={subtask.id} className="subtask-row">
                <div>{subtask.title}</div>
                <div>{subtask.status}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DropDown({ selectedStatus }) {
  return (
    <select className="dropdown" onChange={(e) => {}}>
      {statuses.map((status) => {
        return (
          <option
            value={status}
            selected={selectedStatus === status ? true : false}
          >
            {status}
          </option>
        );
      })}
    </select>
  );
}

export default AtlassianApp;
