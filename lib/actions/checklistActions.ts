"use server";

import axiosInstance from "../axiosInstance";
import { Checklist } from "../constants";

// READ
export const getAllChecklists = async () => {
  try {
    const result = await axiosInstance.get("/checklist");

    return (result.data.data || []) as Checklist[];
  } catch (error) {
    throw error;
  }
};

// CREATE
export const createChecklist = async (name: string) => {
  try {
    const result = await axiosInstance.post("/checklist", { name });

    return result.data.data as Checklist;
  } catch (error) {
    throw error;
  }
};

// DELETE
export const deleteChecklist = async (id: number) => {
  try {
    await axiosInstance.delete(`/checklist/${id}`);
  } catch (error) {
    throw error;
  }
};
