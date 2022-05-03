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
        className='bg-red-500  absolute right-2 md:right-20 top-2 w-1/6 md:w-24 rounded-sm
      h-7 mx-auto flex justify-center items-center font-semibold antialiased text-slate-50'
        onClick={signOutUser}
      >
        sair
      </div>
    </>
  );
}
