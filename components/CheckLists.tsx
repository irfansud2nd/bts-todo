"use client";

import { Checklist, baseUrl } from "@/lib/constants";
import { useEffect, useState } from "react";
import List from "./List";

const Checklists = ({
  checklists,
  setChecklists,
}: {
  checklists: Checklist[];
  setChecklists: React.Dispatch<React.SetStateAction<Checklist[]>>;
}) => {
  if (!checklists.length) return <p>Tidak ada checklist.</p>;

  return (
    <div className="flex justify-around py-4">
      {checklists.map((checklist) => (
        <List
          checklist={checklist}
          setChecklists={setChecklists}
          key={checklist.id}
        />
      ))}
    </div>
  );
};
export default Checklists;
