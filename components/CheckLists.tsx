"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import ChecklistDiplay from "./ChecklistDiplay";

const Checklists = () => {
  const checklists = useSelector(
    (state: RootState) => state.checklist.checklists
  );

  if (!checklists.length) return <p>Tidak ada checklist.</p>;

  return (
    <div className="flex justify-around py-4">
      {checklists.map((checklist) => (
        <ChecklistDiplay checklist={checklist} key={checklist.id} />
      ))}
    </div>
  );
};
export default Checklists;
