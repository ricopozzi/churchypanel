import Link from "next/link";
import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";

interface IDevotional {
  title: string;
  chapter: string;
  mainText: string;
}

export default function Devocional() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [devotional, setDevotional] = useState<IDevotional>();

  useEffect(() => {
    (async () => {
      const { data }: any = await supabase
        .from("devotional")
        .select("title, chapter, mainText")
        .match({ id: 1 });

      setDevotional(data[0]);
    })();
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { error } = await supabase
      .from("devotional")
      .update({
        title: data.title,
        chapter: data.verse,
        mainText: data.mainText,
      })
      .match({ id: 1 });

    if (error) {
      setLoading(false);
      throw error;
    }

    return setLoading(false);
  };

  return (
    <>
      <main className='max-w-screen h-screen flex pt-10 items-center flex-col'>
        <Header />
        <Link href={"/words"}>
          <FaArrowLeft
            size={34}
            color={"white"}
            className='absolute left-4 lg:left-10 cursor-pointer top-14'
          />
        </Link>
        {loading ? null : (
          <>
            <div className='w-[92%] lg:w-[38%] min-h-10 text-gray-200 mt-12 lg:px-16 flex flex-col justify-center items-center'>
              <h3 className='mb-3 font-black tracking-wide text-2xl'>
                Devocional Atual:
              </h3>
              <h1 className='font-semibold text-xl'>{devotional?.title}</h1>
              <h2 className='mt-1 font-normal'>{devotional?.chapter}</h2>
              <p className='mt-3 font-thin text-justify'>
                {devotional?.mainText}
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=' w-11/12 md:w-2/6 min-h-3/4 mt-20 flex flex-col items-center justify-start py-10'
            >
              <div className='w-full'>
                <p className='text-gray-200 font-semibold'>Título: </p>
                <input
                  type='text'
                  className='bg-white border-2 border-slate-400 rounded mt-1 w-4/5 focus:outline-none pl-2'
                  {...register("title", {
                    maxLength: 20,
                  })}
                />
                {errors?.title && (
                  <p className='text-red-400 font-semibold'>
                    No máximo 20 caracteres
                  </p>
                )}
              </div>
              <div className='w-full mt-7'>
                <p className='text-gray-200 font-semibold'>
                  Capítulo ( ex: Lucas 24:1-12 ):
                </p>
                <input
                  type='text'
                  className='bg-white border-2 border-slate-400 rounded mt-1 w-4/5 focus:outline-none pl-2'
                  {...register("verse", {
                    maxLength: 20,
                  })}
                />
                {errors?.title && (
                  <p className='text-red-400 font-semibold'>
                    No máximo 20 caracteres
                  </p>
                )}
              </div>
              <div className='w-full mt-10'>
                <p className='text-gray-200 font-semibold'>Texto: </p>
                <textarea
                  className='bg-white border-2 border-slate-400 rounded mt-1 w-4/5 h-80 focus:outline-none pl-2 resize-none'
                  {...register("mainText", {
                    required: true,
                  })}
                />
                {errors?.mainText && (
                  <p className='text-red-400 font-semibold'>
                    Esse campo é necessário
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
          </>
        )}
      </main>
    </>
  );
}
