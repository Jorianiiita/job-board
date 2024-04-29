import './styles.css';
import React, { forwardRef, useEffect, useId, useRef, useState } from 'react';

// Checkbox component
const Checkbox = forwardRef(function Checkbox(
  { checked, onChange, label },
  ref,
) {
  const id = useId();
  return (
    <div>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
});

// ItemsList component
function ItemsList({ list, onChange, name }) {
  return (
    <div className="items" data-testid={`${name}-items`}>
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

// Helper functions
function generateItemsMap(items) {
  return new Map(items.map((item) => [item, false]));
}

function transferAllItems(itemsFrom, itemsTo) {
  const newItemsTo = new Map(itemsTo);
  itemsFrom.forEach((value, key) => {
    newItemsTo.set(key, value);
  });
  return newItemsTo;
}

function transferSelectedItems(itemsFrom, itemsTo) {
  const newItemsTo = new Map(itemsTo);
  const newItemsFrom = new Map(itemsFrom);

  itemsFrom.forEach((value, key) => {
    if (value) {
      newItemsTo.set(key, value);
      newItemsFrom.delete(key);
    }
  });

  return { newItemsTo, newItemsFrom };
}

function selectAllItemsInAList(list) {
  const newMap = new Map(list);
  const allItemCheckedValue = allItemChecked(list);
  list.forEach((value, key) => {
    newMap.set(key, !allItemCheckedValue);
  });
  return newMap;
}

function anyItemChecked(items) {
  return Array.from(items.values()).some((value) => value);
}

function allItemChecked(items) {
  return Array.from(items.values()).every((value) => value);
}

function addItemInTheList(list, item) {
  const newList = new Map(list);
  newList.set(item, false);
  return newList;
}

// Exported components and functions
export const ItemsColumn = ({ name, list, setList }) => {
  const countOfSelectedItems = Array.from(list).reduce((acc, [key, value]) => {
    if (value) {
      acc++;
    }
    return acc;
  }, 0);
  const ref = useRef();
  const id = useId();
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (ref.current)
      ref.current.indeterminate =
        countOfSelectedItems > 0 && countOfSelectedItems !== list.size;
  }, [list]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItemValue = newItem.trim();
    if (newItemValue === '') {
      return;
    }
    const newList = addItemInTheList(list, newItemValue);
    setList(newList);
    setNewItem('');
  };

  const handleSelectAllItems = () => {
    const newList = selectAllItemsInAList(list);
    setList(newList);
  };

  return (
    <div className={`${name} coloum`} data-testid="items-column">
      <form aria-label="input-form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Add new Item"
          aria-label="add new Item in the list"
          name={`${name}-input`}
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
      </form>
      <hr></hr>
      <Checkbox
        ref={ref}
        label={`${countOfSelectedItems} / ${list.size} Selected`}
        checked={list.size > 0 && countOfSelectedItems === list.size}
        onChange={handleSelectAllItems}
      />
      <hr></hr>
      <ItemsList list={list} onChange={setList} name={name} />
    </div>
  );
};

export function transferItems(itemsFrom, itemsTo, setItemsFrom, setItemsTo) {
  const { newItemsTo, newItemsFrom } = transferSelectedItems(
    itemsFrom,
    itemsTo,
  );
  setItemsTo(newItemsTo);
  setItemsFrom(newItemsFrom);
}

export default function TransferList() {
  const [leftList, setLeftList] = useState(
    generateItemsMap(['HTML', 'JavaScript', 'CSS', 'TypeScript']),
  );
  const [rightList, setRightList] = useState(
    generateItemsMap(['React', 'Angular', 'Vue', 'Svelte']),
  );

  const handleTransferAllItems = () => {
    const newLeftList = transferAllItems(rightList, leftList);
    setLeftList(newLeftList);
    setRightList(new Map());
  };

  const handleTransferSelectedItems = (
    fromList,
    toList,
    setFromList,
    setToList,
  ) => {
    transferItems(fromList, toList, setFromList, setToList);
  };

  return (
    <>
      <div className="container">
        <ItemsColumn name="left" list={leftList} setList={setLeftList} />
        <div className="actions">
          <button
            aria-label="Transfer all items to the left list"
            disabled={rightList.size === 0}
            onClick={handleTransferAllItems}
          >
            <span aria-hidden={true}>&lt;&lt;</span>
          </button>
          <button
            aria-label="Transfer selected items to the left list"
            disabled={!anyItemChecked(rightList)}
            onClick={() => {
              handleTransferSelectedItems(
                rightList,
                leftList,
                setRightList,
                setLeftList,
              );
            }}
          >
            <span aria-hidden={true}>&lt;</span>
          </button>
          <button
            aria-label="Transfer selected items to the right list"
            disabled={!anyItemChecked(leftList)}
            onClick={() => {
              handleTransferSelectedItems(
                leftList,
                rightList,
                setLeftList,
                setRightList,
              );
            }}
          >
            <span aria-hidden={true}>&gt;</span>
          </button>
          <button
            aria-label="Transfer all items to the right list"
            disabled={leftList.size === 0}
            onClick={() => {
              const newRightList = transferAllItems(leftList, rightList);
              setRightList(newRightList);
              setLeftList(new Map());
            }}
          >
            <span aria-hidden={true}>&gt;&gt;</span>
          </button>
        </div>
        <ItemsColumn name="right" list={rightList} setList={setRightList} />
      </div>
    </>
  );
}
