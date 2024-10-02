export const baseUrl = "http://94.74.86.174:8080/api";

export type Todo = {
  id: number;
  name: string;
  itemCompletionStatus: boolean;
};

export type Checklist = {
  id: number;
  items: Todo[];
  name: string;
  checklistCompletionStatus: boolean;
};
