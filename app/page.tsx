import AddList from "@/components/AddList";
import Checklists from "@/components/CheckLists";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/ReduxProvider";
import { getAllChecklists } from "@/lib/actions/checklistActions";

export default async function Home() {
  const checklists = await getAllChecklists();

  return (
    <>
      <Navbar />
      <div className="p-2 xl:container xl:mx-auto">
        <ReduxProvider>
          <AddList checklists={checklists} />
          <Checklists />
        </ReduxProvider>
      </div>
    </>
  );
}
