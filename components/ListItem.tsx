import { Todo } from "@/lib/constants";

const ListItem = ({ item }: { item: Todo }) => {
  return (
    <div className="flex gap-1 items-center">
      <p>{item.name}</p>
    </div>
  );
};
export default ListItem;
