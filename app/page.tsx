"use client";
import AddList from "@/components/AddList";
import Checklists from "@/components/CheckLists";
import { Checklist, Todo, baseUrl } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);

  const token = sessionStorage.getItem("token");

  const getChecklists = async () => {
    try {
      const response = await fetch(`${baseUrl}/checklist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      setChecklists(result.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getChecklists();
  }, []);

  return (
    <div className="p-2">
      <div className="w-full p-3 py-5 flex justify-center items-center border-black border-b-2 mb-2">
        <h1 className="font-bold text-3xl">Todo App</h1>
      </div>
      <AddList setChecklists={setChecklists} />
      <Checklists checklists={checklists} setChecklists={setChecklists} />
    </div>
  );
}
