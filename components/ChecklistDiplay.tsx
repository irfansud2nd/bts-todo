import { Checklist, apiUrl } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import ListDialog from "./ListDialog";
import { Checkbox } from "./ui/checkbox";
import { deleteChecklist } from "@/lib/actions/checklistActions";
import { useDispatch } from "react-redux";
import { deleteChecklistRedux } from "@/lib/redux/checklistSlice";

const ChecklistDiplay = ({ checklist }: { checklist: Checklist }) => {
  const dispatch = useDispatch();

  const deleteList = async () => {
    try {
      const isConfirmed = confirm("Apakah anda yakin?");

      if (!isConfirmed) return;

      await deleteChecklist(checklist.id);

      dispatch(deleteChecklistRedux(checklist.id));
    } catch (error) {
      alert(error);
    }
  };

  const generateData = () => {
    let result = {
      total: 0,
      finished: 0,
      unfinished: 0,
    };

    if (checklist.items) {
      result.total = checklist.items.length;
      result.finished = checklist.items.filter(
        (item) => item.itemCompletionStatus
      ).length;
      result.unfinished = result.total - result.finished;
    }

    return result;
  };

  const { total, finished, unfinished } = generateData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{checklist.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <p>
            Total : <b>{total}</b>
          </p>
          <p>
            Selesai : <b>{finished}</b>
          </p>
          <p>
            Belum Selesai : <b>{unfinished}</b>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-1 items-center">
        <ListDialog checklist={checklist} />
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={deleteList}
          className="ml-auto"
        >
          Hapus
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ChecklistDiplay;
