import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { removeItem, toggleDone, updateItem } from "./todoSlice";
import styles from "./TodoList.module.css";

type TodoItemProps = {
  index: number;
  text: string;
  isDone: boolean;
};

export function TodoItem(props: TodoItemProps) {
  const { text, index, isDone } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!text) dispatch(removeItem(index));
  }, [text, index, dispatch]);
  return (
    <li className={styles.item}>
      <input
        type="text"
        value={text}
        disabled={isDone}
        autoFocus
        onChange={(evt) => {
          const { value } = evt.target;
          dispatch(updateItem({ index, value }));
        }}
      />
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => dispatch(toggleDone(index))}
      />
    </li>
  );
}
