import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checklist, Todo, baseUrl } from "@/lib/constants";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { reduceData } from "@/lib/functions";
import EditItemDialog from "./EditItemDialog";

const ListDialog = ({
  checklist,
  setChecklists,
}: {
  checklist: Checklist;
  setChecklists: React.Dispatch<React.SetStateAction<Checklist[]>>;
}) => {
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState<Todo[]>(checklist.items);

  const token = sessionStorage.getItem("token");

  const handleClick = async () => {
    try {
      if (!itemName) throw new Error("Tolong lengkapi");
      const response = await fetch(
        `${baseUrl}/checklist/${checklist.id}/item`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemName }),
        }
      );

      const result = await response.json();

      const newItems = [...items, result.data];

      setItems(newItems);
      setChecklists(
        (prev) =>
          reduceData([
            ...prev,
            {
              ...checklist,
              items: newItems,
            },
          ]) as Checklist[]
      );
      setItemName("");
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${baseUrl}/checklist/${checklist.id}/item/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newItems = items.filter((item) => item.id != id);

      setItems(newItems);
      setChecklists(
        (prev) =>
          reduceData([
            ...prev,
            {
              ...checklist,
              items: newItems,
            },
          ]) as Checklist[]
      );
    } catch (error) {
      alert(error);
    }
  };

  const handleCheck = async (id: number) => {
    try {
      const response = await fetch(
        `${baseUrl}/checklist/${checklist.id}/item/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      const newItems = reduceData([...items, result.data]) as Todo[];

      setItems(newItems);
      setChecklists(
        (prev) =>
          reduceData([
            ...prev,
            {
              ...checklist,
              items: newItems,
            },
          ]) as Checklist[]
      );
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={"sm"}>Detail</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{checklist.name}</DialogTitle>
        </DialogHeader>
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
        <div className="flex flex-col gap-1">
          {items ? (
            items.map((item) => (
              <div
                className="border rounded p-1 flex items-center gap-1"
                key={item.id.toString()}
              >
                <Checkbox
                  checked={item.itemCompletionStatus}
                  onClick={(e) => handleCheck(item.id)}
                />
                <p className="mr-auto">{item.name}</p>
                {/* <Button variant={"outline"}>Edit</Button> */}
                <EditItemDialog
                  item={item}
                  checklistId={checklist.id}
                  setItems={setItems}
                />
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            ))
          ) : (
            <p>Tidak ada item.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ListDialog;
