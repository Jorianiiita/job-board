import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

import './index.css';

type BaseTabsProp = JSX.IntrinsicElements['div'] & {
  children: ReactNode;
};

type TabsProp = BaseTabsProp & {
  defaultValue: string;
};

type ContextType = {
  activeTab: string;
  setActiveTab: Dispatch<string>;
};

const TabContext = createContext<ContextType>({} as ContextType);

function Tabs({ defaultValue, children, ...props }: TabsProp) {
  const [activeTab, setActiveTab] = useState<string>(defaultValue);

  const { className, ...restProps } = props;

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`tabs-container ${className ?? ''}`} {...restProps}>
        {children}
      </div>
    </TabContext.Provider>
  );
}

function List({ children, ...props }: BaseTabsProp) {
  const { className, ...restProps } = props;
  return (
    <div className={`trigger-list ${className ?? ''}`} {...restProps}>
      {children}
    </div>
  );
}

type TriggerProp = BaseTabsProp & {
  value: string;
};

function Trigger({ children, value }: TriggerProp) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  return (
    <button
      className={`trigger${activeTab === value ? ' active' : ''}`}
      onClick={() => {
        setActiveTab(value);
      }}
    >
      {children}
    </button>
  );
}

type ContentProp = BaseTabsProp & {
  value: string;
};

function Content({ children, value }: ContentProp) {
  const { activeTab } = useContext(TabContext);
  return (
    <div className={`content${activeTab === value ? ' active' : ''}`}>
      {activeTab === value ? children : null}
    </div>
  );
}

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;
export default Tabs;

/**
 * <Tabs>
 *    <Tab.List>
 *    <Tab.Trigger id="1"></Tab.Trigger>
 *    <Tab.Trigger id="2"></Tab.Trigger>
 *    <Tab.Trigger id="3"></Tab.Trigger>
 *    </Tab.List>
 *    <Tab.Content id="1"></Tab.Content>
 *    <Tab.Content id="2"></Tab.Content>
 *    <Tab.Content id="3"></Tab.Content>
 * </Tabs>
 *
 */
