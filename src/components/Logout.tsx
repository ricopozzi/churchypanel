import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import { useContext } from "react";
import { authContext } from "../hooks/authHook";

export function Logout() {
  const router = useRouter();

  const { signOutUser } = useContext(authContext);

  return (
    <>
      <div
        className='bg-red-400 bg-opacity-40 absolute right-2 top-2 w-1/6 rounded-md
      h-7 mx-auto flex justify-center items-center font-semibold antialiased text-red-300'
        onClick={signOutUser}
      >
        sair
      </div>
    </>
  );
}
