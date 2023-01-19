import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectItems, addItem } from "./todoSlice";
import styles from "./TodoList.module.css";
import { TodoItem } from "./TodoItem";
import { TodoCounter } from "./TodoCounter";

export function TodoList() {
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Todo List</h1>

      <TodoCounter />

      <ul className={styles.list}>
        {items.map((item, index) => (
          <TodoItem
            key={index}
            index={index}
            isDone={item.isDone}
            text={item.text}
          />
        ))}
      </ul>

      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => dispatch(addItem(`Item ${items.length + 1}`))}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}
