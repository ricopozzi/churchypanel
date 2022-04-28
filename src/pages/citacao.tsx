import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

interface formData {
  author: string;
  quote: string;
  image: string;
}

export default function Citacao() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: formData) => {
    console.log(data);

    const response = await axios.put("http://localhost:1337/api/citacoes/1", {
      data: {
        author: data.author,
        mainText: data.quote,
        imageUrl: data.image,
      },
    });

    return response.data;
  };

  return (
    <>
      <main className='min-w-screen h-screen bg-[#17161D] flex justify-center items-center flex-col'>
        <Link href='/home'>
          <div className='w-full text-center text-slate-50 font-bold text-4xl fixed top-5 hover:cursor-pointer'>
            Churchy
          </div>
        </Link>
        <form
          //@ts-ignore
          onSubmit={handleSubmit(onSubmit)}
          className='bg-[#202024] w-[95%] h-5/6 md:w-2/6 md:h-4/6 rounded-xl flex items-center justify-center flex-col'
        >
          <div className='flex flex-col w-4/6 h-1/4  justify-center'>
            <label className='text-slate-300 font-semibold text-lg'>
              Autor da Citação :
            </label>
            <input
              className='placeholder:italic placeholder:text-slate-100 block bg-[#17161D] w-full border-2 border-[#17161D]
                   rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-pink-500  text-slate-300 
                   focus:ring-1 sm:text-md mt-2 hover:border-pink-500 duration-200'
              {...register("author")}
            />
          </div>
          <div className='flex flex-col w-4/6 h-1/4  justify-center'>
            <label className='text-slate-300 font-semibold text-lg'>
              Citação :
            </label>
            <textarea
              className='placeholder:italic placeholder:text-slate-100 block bg-[#17161D] w-full border-2 border-[#17161D]
                   rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-pink-500  text-slate-300 
                   focus:ring-1 sm:text-md mt-2 hover:border-pink-500 duration-200 resize-none h-80 md:h-52'
              {...register("quote")}
            />
          </div>
          <div className='flex flex-col w-full md:w-4/6 h-1/4 mt-4 '>
            <label className='text-slate-300 font-semibold text-lg pl-16 md:pl-0'>
              Imagem de Fundo :
            </label>
            <div className='flex w-full h-36 flex-row justify-evenly mt-4'>
              <div className='w-1/5 h-full justify-center'>
                <img
                  src='/1.jpg'
                  alt=''
                  className=' object-cover rounded-lg h-32 w-full'
                />
                <input
                  type='radio'
                  {...register("image")}
                  value='1'
                  className='w-3 h-3 ml-7'
                  defaultChecked
                />
              </div>
              <div className='w-1/5 h-full '>
                <img
                  src='/2.jpg'
                  alt=''
                  className='  object-cover rounded-lg h-32 w-full'
                />
                <input
                  type='radio'
                  {...register("image")}
                  value='2'
                  className='w-3 h-3 ml-7'
                />
              </div>
              <div className='w-1/5 h-full '>
                <img
                  src='/3.jpg'
                  alt=''
                  className=' object-cover rounded-lg h-32 w-full'
                />
                <input
                  type='radio'
                  {...register("image")}
                  value='3'
                  className='w-3 h-3 ml-7'
                />
              </div>
              <div className='w-1/5 h-full '>
                <img
                  src='/4.jpg'
                  alt=''
                  className=' object-cover rounded-lg h-32 w-full'
                />
                <input
                  type='radio'
                  {...register("image")}
                  value='4'
                  className='w-3 h-3 ml-7'
                />
              </div>
            </div>
          </div>
          <input
            type='submit'
            className='w-36 h-10 bg-pink-500 mt-16 rounded-lg hover:bg-pink-600 hover:cursor-pointer text-slate-100 font-semibold'
          />
        </form>
      </main>
    </>
  );
}
