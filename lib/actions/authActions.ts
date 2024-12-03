"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../session";
import axios from "axios";
import { apiUrl } from "../constants";

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

    const result = await axios.post(`${apiUrl}/${url}`, body);

    const token = result.data.data.token;

    await createSession(username, token);
    redirect("/");
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await deleteSession();
  redirect("/login");
};
