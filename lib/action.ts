"use server";
import { cookies } from "next/headers";
import { Checklist, Todo, baseUrl } from "./constants";

export const loginAndRegister = async (
  username: string,
  password: string,
  email?: string,
  register?: boolean
) => {
  try {
    if (!username || !password) {
      throw new Error("Tolong lengkapi data yang diperlukan");
    }

    let url = "login";

    let body: Record<string, string> = {
      username,
      password,
    };

    if (register) {
      if (!email) throw new Error("Tolong lengkapi data yang diperlukan");

      url = "register";
      body.email = email;
    }

    const response = await fetch(`${baseUrl}/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    cookies().set("token", result.data.token);
  } catch (error) {
    throw error;
  }
};

export const getToken = async () => {
  let result = cookies().get("token");
  return result?.value || "";
};

export const getAllChecklists = async () => {
  const token = await getToken();

  try {
    const response = await fetch(`${baseUrl}/checklist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return (result.data || []) as Checklist[];
  } catch (error) {
    throw error;
  }
};

export const createChecklist = async (name: string) => {
  try {
    const token = await getToken();

    const response = await fetch(`${baseUrl}/checklist`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const result = await response.json();

    return result.data as Checklist;
  } catch (error) {
    throw error;
  }
};

export const deleteChecklist = async (id: number) => {
  try {
    const token = await getToken();

    await fetch(`${baseUrl}/checklist/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const addItem = async (name: string, checklistId: number) => {
  try {
    const token = await getToken();

    const response = await fetch(`${baseUrl}/checklist/${checklistId}/item`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemName: name }),
    });

    const result = await response.json();

    return result.data as Todo;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (id: number, checklistId: number) => {
  try {
    const token = await getToken();

    await fetch(`${baseUrl}/checklist/${checklistId}/item/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const checkItem = async (id: number, checklistId: number) => {
  try {
    const token = await getToken();

    const response = await fetch(
      `${baseUrl}/checklist/${checklistId}/item/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    return result.data as Todo[];
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
    const token = await getToken();

    const response = await fetch(
      `${baseUrl}/checklist/${checklistId}/item/rename/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: name }),
      }
    );

    const result = await response.json();

    return result.data as Todo[];
  } catch (error) {
    throw error;
  }
};
