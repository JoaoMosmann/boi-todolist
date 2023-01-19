import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectItems } from "./todoSlice";

export function TodoCounter() {
  const items = useAppSelector(selectItems);
  const howManyIncomplete = useMemo(
    () => items.reduce((p, c) => p + (c.isDone ? 0 : 1), 0),
    [items]
  );

  if (items.length === 0) return <></>;
  if (howManyIncomplete === 0)
    return (
      <big>
        <strong>Congrats!</strong> You finish all your tasks! 🎉
      </big>
    );

  return <small>You have {howManyIncomplete} incomplete items</small>;
}
