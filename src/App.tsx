import './App.css';
import Flyout from './apps/Flyout';
import JobBoard from './apps/JobBoard';
import NormalTabs from './apps/Tabs/NormalTabs';
import VerticalTabs from './apps/Tabs/VerticalTabs';
import TaskList from './apps/TaskList';
import TicTacToe from './apps/TicTacToe';
import TreeView from './apps/TreeView';
import Wordle from './apps/Wordle';
import AtlassianApp from './atlassian/app';
// import './coding';
import './atlassian/coding';

function App() {
  // return <AtlassianApp />;
  // return <Flyout />;
  // return <TreeView />;

  // return <TaskList />;

  return (
    <>
      <JobBoard />
    </>
  );
  return (
    <>
      <NormalTabs />
      <VerticalTabs />
    </>
  );
  return <TicTacToe n={5} />;
  return <Wordle />;
}

export default App;
