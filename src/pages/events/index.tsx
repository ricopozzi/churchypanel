import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";

export default function Events() {
  return (
    <>
      <main className='w-screen min-h-screen bg-[#fafafa] flex pt-10 items-center flex-col'>
        <Header />
        <Link href='/home'>
          <FaArrowLeft
            size={24}
            color={"black"}
            className='absolute left-4 top-14'
          />
        </Link>
        <Link href='/events/main'>
          <button>
            <div className='bg-[#F6C056] w-80 h-20 mt-12 rounded-lg flex justify-center items-center text-slate-50 font-semibold text-xl '>
              Evento Destaque
              <AiOutlineEdit
                size={28}
                className='absolute right-20 md:relative md:right-auto'
              />
            </div>
          </button>
        </Link>
        <Link href='/events/simpleevents'>
          <button>
            <div className='bg-[#F6C056] w-80 h-20 mt-12 rounded-lg  flex justify-center items-center text-slate-50 font-semibold text-md '>
              Programação Semanal
              <AiOutlineEdit
                size={28}
                className='absolute right-20 md:relative md:right-auto'
              />
            </div>
          </button>
        </Link>
      </main>
    </>
  );
}
