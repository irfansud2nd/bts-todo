import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Todo, baseUrl } from "@/lib/constants";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { reduceData } from "@/lib/functions";

const EditItemDialog = ({
  item,
  checklistId,
  setItems,
}: {
  item: Todo;
  checklistId: number;
  setItems: React.Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const token = sessionStorage.getItem("token");

  const [itemName, setItemName] = useState(item.name);
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    try {
      if (!itemName) throw new Error("Tolong lengkapi");
      const response = await fetch(
        `${baseUrl}/checklist/${checklistId}/item/rename/${item.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemName }),
        }
      );

      const result = await response.json();

      console.log(result);

      setItems((prev) => reduceData([...prev, result.data]) as Todo[]);
      setOpen(false);
      setItemName("");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={"sm"} variant={"outline"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Tambahkan item baru"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button onClick={handleClick} variant={"secondary"}>
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EditItemDialog;
