export const apiUrl = "http://94.74.86.174:8080/api";

export type Item = {
  id: number;
  name: string;
  itemCompletionStatus: boolean;
};

export type Checklist = {
  id: number;
  items: Item[];
  name: string;
  checklistCompletionStatus: boolean;
};
