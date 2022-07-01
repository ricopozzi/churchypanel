import { Header } from "../components/Header";
import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Quotes() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("quotes")
      .update({ author: data.author, text: data.quote })
      .match({ id: 1 });

    if (error) {
      throw error;
    }

    return console.log(data);
  };

  return (
    <>
      <main className='w-screen md:w-2/5 mx-auto h-screen bg-[#fafafa] flex pt-10 items-center flex-col'>
        <Header />
        <Link href={"/home"}>
          <FaArrowLeft
            size={24}
            color={"black"}
            className='absolute left-4 top-14'
          />
        </Link>
        <form
          className=' w-11/12 min-h-full px-10 py-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col'>
            <p className='font-semibold'>Autor:</p>
            <input
              type='text'
              className='focus:outline-none border border-slate-800 rounded px-4 h-7'
              {...register("author", {
                required: true,
                maxLength: 18,
              })}
            />
            {errors?.autor && (
              <p className='text-red-500 mt-3'>
                Esse campo é obrigatório(max 18 caracteres)
              </p>
            )}
          </div>
          <div className='flex flex-col mt-10'>
            <p className='font-semibold'>Frase:</p>
            <textarea
              className='focus:outline-none border mt-3 border-slate-800 rounded px-4 h-24 resize-none'
              {...register("quote", {
                required: true,
                maxLength: 90,
              })}
            />
            {errors?.quote && (
              <p className='text-red-500 mt-3'>
                Esse campo é obrigatório(max 90 caracteres)
              </p>
            )}
          </div>

          <button
            type='submit'
            className='bg-slate-800 text-slate-50 h-8 w-32 rounded mr-auto mt-7'
          >
            Enviar
          </button>
        </form>
      </main>
    </>
  );
}
