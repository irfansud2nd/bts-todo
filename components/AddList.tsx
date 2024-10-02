"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checklist, Todo, baseUrl } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { createChecklist } from "@/lib/action";

const AddList = ({
  setChecklists,
}: {
  setChecklists: React.Dispatch<React.SetStateAction<Checklist[]>>;
}) => {
  const [listName, setListName] = useState("");

  const handleClick = async () => {
    try {
      const result = await createChecklist(listName);

      setChecklists((prev) => [...prev, result]);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex gap-1">
      <Input
        type="text"
        placeholder="Tambahkan list baru"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <Button onClick={handleClick}>Simpan</Button>
    </div>
  );
};
export default AddList;
