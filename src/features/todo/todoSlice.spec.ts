import { RootState } from "../../app/store";
import todoReducer, {
  TodoState,
  addItem,
  updateItem,
  removeItem,
  toggleDone,
  selectItems,
} from "./todoSlice";

describe("todo reducer", () => {
  const initialState: TodoState = {
    items: [],
  };
  it("should handle initial state", () => {
    expect(todoReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
    });
  });

  it("should be able to add a new item", () => {
    const sample = "Example text";
    const actual = todoReducer(initialState, addItem(sample));
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0].text).toEqual(sample);
  });

  it("should be able update an item", () => {
    const initialValue = "Initial Text";
    const updatedValue = "Updated Text";
    let actual = todoReducer(initialState, addItem(initialValue));
    expect(actual.items[0].text).toEqual(initialValue);
    actual = todoReducer(actual, updateItem({ index: 0, value: updatedValue }));
    expect(actual.items[0].text).toEqual(updatedValue);
  });

  it("should be able to toggle items between done and incomplete", () => {
    let actual = todoReducer(initialState, addItem("Sample 1"));
    actual = todoReducer(actual, addItem("Sample 2"));
    actual = todoReducer(actual, toggleDone(1));

    const items = selectItems({ todo: actual } as RootState);
    expect(items.length).toEqual(2);
    expect(items[1].isDone).toEqual(true);
  });

  it("should be able to delete an item", () => {
    let actual = todoReducer(initialState, addItem("Sample 1"));
    expect(actual.items.length).toEqual(1);
    actual = todoReducer(actual, removeItem(0));
    expect(actual.items.length).toEqual(0);
  });
});
