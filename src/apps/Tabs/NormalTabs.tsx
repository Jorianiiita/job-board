import Tabs from '.';

const NormalTabs: React.FC = () => {
  return (
    <Tabs defaultValue="tab-1">
      <Tabs.List>
        <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
        <Tabs.Trigger value="tab-4">Tab 4</Tabs.Trigger>
      </Tabs.List>
      {/* <div className="content-container"> */}
      <Tabs.Content value="tab-1">
        <div>
          <h1>Form</h1>
          <h2>Fill</h2>
          <input />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab-2">Content 2</Tabs.Content>
      <Tabs.Content value="tab-3">Content 3</Tabs.Content>
      <Tabs.Content value="tab-4">Content 4</Tabs.Content>
      {/* </div> */}
    </Tabs>
  );
};

export default NormalTabs;
