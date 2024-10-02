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
import { addItem, checkItem, deleteItem } from "@/lib/action";

const ListDialog = ({
  checklist,
  setChecklists,
}: {
  checklist: Checklist;
  setChecklists: React.Dispatch<React.SetStateAction<Checklist[]>>;
}) => {
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState<Todo[]>(checklist.items);

  const handleClick = async () => {
    try {
      if (!itemName) throw new Error("Tolong lengkapi");

      const result = await addItem(itemName, checklist.id);

      const newItems = [...items, result];

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
      await deleteItem(id, checklist.id);

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
      const result = await checkItem(id, checklist.id);

      const newItems = reduceData([...items, result]) as Todo[];

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
