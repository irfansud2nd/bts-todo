"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checklist } from "@/lib/constants";
import { useDispatch } from "react-redux";
import { addChecklistsRedux } from "@/lib/redux/checklistSlice";
import { createChecklist } from "@/lib/actions/checklistActions";

const AddList = ({ checklists }: { checklists: Checklist[] }) => {
  const dispatch = useDispatch();

  const [listName, setListName] = useState("");

  useEffect(() => {
    dispatch(addChecklistsRedux(checklists));
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await createChecklist(listName);

      dispatch(addChecklistsRedux([result]));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex gap-1"
    >
      <Input
        type="text"
        placeholder="Tambahkan list baru"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <Button type="submit">Tambah</Button>
    </form>
  );
};
export default AddList;
