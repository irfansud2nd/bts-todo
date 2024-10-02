"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checklist, Todo, baseUrl } from "@/lib/constants";
import { useRouter } from "next/navigation";

const AddList = ({
  setChecklists,
}: {
  setChecklists: React.Dispatch<React.SetStateAction<Checklist[]>>;
}) => {
  const [listName, setListName] = useState("");
  const token = sessionStorage.getItem("token");
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await fetch(`${baseUrl}/checklist`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: listName }),
      });

      const result = await response.json();

      setChecklists((prev) => [...prev, result.data]);
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
