import User from "./User";

const Navbar = () => {
  return (
    <nav className="w-full shadow-md p-2 mb-3">
      <div className="xl:container xl:mx-auto flex justify-between items-center">
        <h1 className="font-bold text-2xl">Todo App</h1>
        <User />
      </div>
    </nav>
  );
};
export default Navbar;
