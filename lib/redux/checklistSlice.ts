import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Checklist, Item } from "../constants";

const reduceData = <T extends Record<string, any>>(
  data: T[],
  key: keyof T = "id"
): T[] => {
  const reducedData = Object.values(
    data.reduce((acc, obj) => {
      acc[obj[key]] = obj;
      return acc;
    }, {} as Record<string, T>)
  );
  return reducedData;
};

const initialState: {
  checklists: Checklist[];
} = {
  checklists: [],
};

const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    addChecklistsRedux: (state, action: PayloadAction<Checklist[]>) => {
      let data = reduceData([...state.checklists, ...action.payload]);
      state.checklists = data;
    },
    deleteChecklistRedux: (state, action: PayloadAction<number>) => {
      state.checklists = state.checklists.filter(
        (item) => item.id !== action.payload
      );
    },
    addItemRedux: (
      state,
      action: PayloadAction<{ item: Item; checklistId: number }>
    ) => {
      const { item, checklistId } = action.payload;
      let checklist = state.checklists.find(
        (item) => item.id == checklistId
      ) as Checklist;
      if (checklist.items == null) {
        checklist.items = [item];
      } else {
        checklist.items = [...checklist.items, item];
      }
      addChecklistsRedux([checklist]);
    },
    deleteItemRedux: (
      state,
      action: PayloadAction<{ itemId: number; checklistId: number }>
    ) => {
      const { itemId, checklistId } = action.payload;
      let checklist = state.checklists.find(
        (item) => item.id == checklistId
      ) as Checklist;

      checklist.items = checklist.items.filter((item) => item.id !== itemId);

      addChecklistsRedux([checklist]);
    },
    updateItemRedux: (
      state,
      action: PayloadAction<{ item: Item; checklistId: number }>
    ) => {
      const { item, checklistId } = action.payload;
      let checklist = state.checklists.find(
        (item) => item.id == checklistId
      ) as Checklist;

      checklist.items = reduceData([...checklist.items, item]);

      addChecklistsRedux([checklist]);
    },
  },
});

export const {
  addChecklistsRedux,
  deleteChecklistRedux,
  addItemRedux,
  deleteItemRedux,
  updateItemRedux,
} = checklistSlice.actions;

export default checklistSlice.reducer;
