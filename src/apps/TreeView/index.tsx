import { Key, useEffect, useRef, useState } from 'react';
import { fetchData, MenuItemType } from './api';
import './index.css';
import clsx from 'clsx';

const TreeView = () => {
  const [data, setData] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchAPIData() {
      const res = (await fetchData()) as MenuItemType[];
      setData(res);
      setIsLoading(false);
    }

    setIsLoading(true);
    fetchAPIData();
  }, []);

  return (
    <menu>
      <MenuList data={data} />
      {isLoading ? 'Loading...' : null}
    </menu>
  );
};

function MenuList({ data }: { data: MenuItemType[] }) {
  if (!data?.length) return null;
  return (
    <ul>
      {data.map((item) => (
        <MenuItem key={item.id as Key} item={item} />
      ))}
    </ul>
  );
}

function MenuItem({ item }: { item: MenuItemType }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <li
      role="option"
      tabIndex={0}
      aria-selected={isExpanded}
      key={item.id as Key}
    >
      <span
        className={clsx({ 'has-childs': item.children?.length })}
        onClick={handleClick}
      >
        {item.children?.length && (
          <span className={clsx('arrow', { open: isExpanded })}>{'> '}</span>
        )}
        {item.name}
      </span>
      {isExpanded && <MenuList data={item.children} />}
    </li>
  );
}

export default TreeView;
