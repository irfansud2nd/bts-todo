import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Item, apiUrl } from "@/lib/constants";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { reduceData } from "@/lib/functions";
import { useDispatch } from "react-redux";
import { updateItem } from "@/lib/actions/itemActions";
import { updateItemRedux } from "@/lib/redux/checklistSlice";

const EditItemDialog = ({
  item,
  checklistId,
}: {
  item: Item;
  checklistId: number;
}) => {
  const [itemName, setItemName] = useState(item.name);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      if (!itemName) throw new Error("Tolong lengkapi");

      const result = await updateItem(itemName, item.id, checklistId);

      // setItems((prev) => reduceData([...prev, result]) as Item[]);

      dispatch(updateItemRedux({ item: result, checklistId: checklistId }));
      setOpen(false);
      setItemName("");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex items-center gap-2"
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
      </DialogContent>
    </Dialog>
  );
};
export default EditItemDialog;
