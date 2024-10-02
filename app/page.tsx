import IsLoggedIn from "@/components/IsLoggedIn";
import Container from "@/components/Container";

export default function Home() {
  return (
    <div className="p-2">
      <div className="w-full p-3 py-5 flex justify-center items-center border-black border-b-2 mb-2">
        <h1 className="font-bold text-3xl">Todo App</h1>
      </div>
      <IsLoggedIn>
        <Container />
      </IsLoggedIn>
    </div>
  );
}
