import './styles.css';
import React, { useId, useState } from 'react';

function Checkbox({ checked, onChange, label }) {
  const id = useId();
  return (
    <div>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function ItemsList({ list, onChange }) {
  return (
    <div className="items">
      <ul>
        {Array.from(list.entries()).map(([label, checked], index) => (
          <li key={label}>
            <Checkbox
              checked={checked}
              label={label}
              onChange={() => {
                const newMap = new Map(list);
                newMap.set(label, !checked);
                onChange(newMap);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const DEFAULT_ITEMS_LEFT = ['HTML', 'JavaScript', 'CSS', 'TypeScript'];
const DEFAULT_ITEMS_RIGHT = ['React', 'Angular', 'Vue', 'Svelte'];

function generateItemsMap(items) {
  return new Map(items.map((item) => [item, false]));
}

function transferAllItems(itemsFrom, itemsTo, setItemsFrom, setItemsTo) {
  const newItemsTo = new Map(itemsTo);
  itemsFrom.forEach((value, key) => {
    newItemsTo.set(key, value);
  });
  setItemsTo(newItemsTo);
  setItemsFrom(new Map());
}

function transferSelectedItems(itemsFrom, itemsTo, setItemsFrom, setItemsTo) {
  const newItemsTo = new Map(itemsTo);
  const newItemsFrom = new Map(itemsFrom);

  itemsFrom.forEach((value, key) => {
    if (value) {
      newItemsTo.set(key, value);
      newItemsFrom.delete(key);
    }
  });

  setItemsTo(newItemsTo);
  setItemsFrom(newItemsFrom);
}

function anyItemChecked(items) {
  return Array.from(items.values()).some((value) => value);
}

export default function TransferList() {
  const [leftList, setLeftList] = useState(
    generateItemsMap(DEFAULT_ITEMS_LEFT),
  );
  const [rightList, setRightList] = useState(
    generateItemsMap(DEFAULT_ITEMS_RIGHT),
  );

  return (
    <>
      <div className="container">
        <ItemsList list={leftList} onChange={setLeftList} />
        <div className="actions">
          <button
            aria-label="Trasfer all items to the left list"
            disabled={rightList.size === 0}
            onClick={() => {
              transferAllItems(rightList, leftList, setRightList, setLeftList);
            }}
          >
            &lt;&lt;
          </button>
          <button
            aria-label="Trasfer selected items to the left list"
            disabled={!anyItemChecked(rightList)}
            onClick={() => {
              transferSelectedItems(
                rightList,
                leftList,
                setRightList,
                setLeftList,
              );
            }}
          >
            &lt;
          </button>
          <button
            aria-label="Trasfer selected items to the right list"
            disabled={!anyItemChecked(leftList)}
            onClick={() => {
              transferSelectedItems(
                leftList,
                rightList,
                setLeftList,
                setRightList,
              );
            }}
          >
            &gt;
          </button>
          <button
            aria-label="Trasfer all items to the right list"
            disabled={leftList.size === 0}
            onClick={() => {
              transferAllItems(leftList, rightList, setLeftList, setRightList);
            }}
          >
            &gt;&gt;
          </button>
        </div>
        <ItemsList list={rightList} onChange={setRightList} />
      </div>
    </>
  );
}
