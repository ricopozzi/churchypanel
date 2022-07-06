import { useContext } from "react";
import { authContext } from "../hooks/authHook";
import { IoIosExit } from "react-icons/io";

export function Logout() {
  const { signOutUser } = useContext(authContext);

  return (
    <>
      <div
        className='w-32 lg:w-40 h-9 bg-yellow-600 flex justify-center items-center rounded-md tracking-wide text-gray-300 font-bold text-xl cursor-pointer gap-x-2'
        onClick={signOutUser}
      >
        Sair
        <IoIosExit size={24} color='#fafafa' />
      </div>
    </>
  );
}
