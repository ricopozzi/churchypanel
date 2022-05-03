import Link from "next/link";
import { Header } from "../components/Header";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";

export default function Devocional() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = (data: any) => {
    return console.log(data);
  };

  return (
    <>
      <main className='w-screen h-screen bg-[#fafafa] flex pt-10 items-center flex-col'>
        <Header />
        <Link href={"/home"}>
          <FaArrowLeft
            size={24}
            color={"black"}
            className='absolute left-4 md:left-14  top-14'
          />
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='pl-4 w-11/12 md:w-2/5 min-h-3/4 mt-20 flex flex-col items-center justify-start py-10'
        >
          <div className='w-full'>
            <p className='text-slate-800 font-semibold'>Título: </p>
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
            <p className='text-slate-800 font-semibold'>
              Capítulo ( ex: Lucas 24:1-12 ):{" "}
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
            <p className='text-slate-800 font-semibold'>Texto: </p>
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
            className='bg-slate-800 text-slate-50 h-8 w-32 rounded mr-auto mt-7'
          >
            Enviar
          </button>
        </form>
      </main>
    </>
  );
}
