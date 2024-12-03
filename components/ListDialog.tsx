import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checklist, Item, apiUrl } from "@/lib/constants";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { reduceData } from "@/lib/functions";
import EditItemDialog from "./EditItemDialog";
import { addItem, checkItem, deleteItem } from "@/lib/actions/itemActions";
import { useDispatch } from "react-redux";
import {
  addItemRedux,
  deleteItemRedux,
  updateItemRedux,
} from "@/lib/redux/checklistSlice";

const ListDialog = ({ checklist }: { checklist: Checklist }) => {
  const [itemName, setItemName] = useState("");
  // const [items, setItems] = useState<Item[]>(checklist.items);

  const dispatch = useDispatch();

  const handleAdd = async () => {
    try {
      if (!itemName) throw new Error("Tolong lengkapi");

      const result = await addItem(itemName, checklist.id);

      // const newItems = [...items, result];

      // setItems(newItems);

      dispatch(addItemRedux({ item: result, checklistId: checklist.id }));

      setItemName("");
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteItem(id, checklist.id);

      // const newItems = items.filter((item) => item.id != id);

      // setItems(newItems);
      dispatch(deleteItemRedux({ itemId: id, checklistId: checklist.id }));
    } catch (error) {
      alert(error);
    }
  };

  const handleCheck = async (id: number) => {
    try {
      const result = await checkItem(id, checklist.id);

      // const newItems = reduceData([...items, result]) as Item[];

      // setItems(newItems);

      dispatch(updateItemRedux({ item: result, checklistId: checklist.id }));
    } catch (error) {
      alert(error);
    }
  };

  console.log(checklist);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Detail</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{checklist.name}</DialogTitle>
        </DialogHeader>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <Input
            type="text"
            placeholder="Tambahkan item baru"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button type="submit" variant={"secondary"}>
            Simpan
          </Button>
        </form>
        <div className="flex flex-col gap-1">
          {checklist.items?.length ? (
            checklist.items.map((item) => (
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
                <EditItemDialog item={item} checklistId={checklist.id} />
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
