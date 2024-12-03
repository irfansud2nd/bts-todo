"use server";

import axiosInstance from "../axiosInstance";
import { Item } from "../constants";

export const addItem = async (name: string, checklistId: number) => {
  try {
    const result = await axiosInstance.post(`/checklist/${checklistId}/item`, {
      itemName: name,
    });

    return result.data.data as Item;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (id: number, checklistId: number) => {
  try {
    await axiosInstance.delete(`/checklist/${checklistId}/item/${id}`);
  } catch (error) {
    throw error;
  }
};

export const checkItem = async (id: number, checklistId: number) => {
  try {
    const result = await axiosInstance.put(
      `/checklist/${checklistId}/item/${id}`
    );

    return result.data.data as Item;
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (
  name: string,
  id: number,
  checklistId: number
) => {
  try {
    const result = await axiosInstance.put(
      `/checklist/${checklistId}/item/rename/${id}`,
      { itemName: name }
    );

    return result.data.data as Item;
  } catch (error) {
    throw error;
  }
};
