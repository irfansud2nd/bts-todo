"use client";
import { Checklist, baseUrl } from "@/lib/constants";
import { useEffect, useState } from "react";
import AddList from "./AddList";
import Checklists from "./CheckLists";
import { getAllChecklists } from "@/lib/action";

const Container = () => {
  const [checklists, setChecklists] = useState<Checklist[]>([]);

  const getChecklists = async () => {
    try {
      const result = await getAllChecklists();

      setChecklists(result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getChecklists();
  }, []);
  return (
    <>
      <AddList setChecklists={setChecklists} />
      <Checklists checklists={checklists} setChecklists={setChecklists} />
    </>
  );
};
export default Container;
