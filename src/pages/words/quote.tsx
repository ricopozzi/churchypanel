import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

interface IQuote {
  author: string;
  text: string;
}

export default function Quotes() {
  const [quote, setQuote] = useState<IQuote>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const { data }: any = await supabase
        .from("quotes")
        .select("author, text")
        .match({ id: 1 });

      setQuote(data[0]);
    })();
  }, []);

  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("quotes")
      .update({ author: data.author, text: data.quote })
      .match({ id: 1 });

    if (error) {
      throw error;
    }

    return;
  };

  return (
    <>
      <main className='w-screen md:w-2/5 mx-auto h-screen flex pt-10 items-center flex-col'>
        <Header />
        <Link href={"/words"}>
          <FaArrowLeft
            size={34}
            color={"white"}
            className='absolute left-4 lg:left-10 cursor-pointer top-14'
          />
        </Link>

        <div className='mt-10 mb-5 flex flex-col min-h-10 w-10/12'>
          <h1 className='text-gray-200 text-xl font-bold'>Palavra atual:</h1>

          <div className='text-xl text-gray-400 mt-3'>{quote?.author}</div>
          <div className='text-lg text-gray-200 mt-5 break-words min-h-4'>
            {quote?.text}
          </div>
        </div>

        <form
          className=' w-11/12 min-h-full px-10 py-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-200'>Autor:</p>
            <input
              type='text'
              className='focus:outline-none border border-slate-800 rounded px-4 h-8 mt-2'
              {...register("author", {
                required: true,
                maxLength: 18,
              })}
            />
            {errors?.author && (
              <p className='text-red-500 mt-3'>
                Esse campo é obrigatório (max 18 caracteres)
              </p>
            )}
          </div>
          <div className='flex flex-col mt-10'>
            <p className='font-semibold text-gray-200'>Frase:</p>
            <textarea
              className='focus:outline-none border mt-3 border-slate-800 rounded px-4 h-24 resize-none'
              {...register("quote", {
                required: true,
                maxLength: 90,
              })}
            />
            {errors?.quote && (
              <p className='text-red-500 mt-3'>
                Esse campo é obrigatório (max 90 caracteres)
              </p>
            )}
          </div>

          <button
            type='submit'
            className='bg-yellow-600 text-slate-50 h-12 w-40 rounded mr-auto mt-7'
          >
            Enviar
          </button>
        </form>
      </main>
    </>
  );
}
