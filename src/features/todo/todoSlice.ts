import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Item {
  text: string;
  isDone: boolean;
}

export interface TodoState {
  items: Item[];
}

const initialState: TodoState = {
  items: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push({
        text: action.payload,
        isDone: false,
      });
    },
    updateItem: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      const { index, value } = action.payload;
      const item = state.items[index];
      state.items[index] = {
        ...item,
        text: value,
      };
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);

      // Small bug fix
    },
    toggleDone: (state, action: PayloadAction<number>) => {
      const item = state.items[action.payload];
      item.isDone = !item.isDone;
    },
  },
});

export const { addItem, updateItem, removeItem, toggleDone } =
  todoSlice.actions;

export const selectItems = (state: RootState) => state.todo.items;

export default todoSlice.reducer;
