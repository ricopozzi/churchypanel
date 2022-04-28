import Link from "next/link";

export default function Devocional() {
  return (
    <>
      <main className='max-w-screen h-full bg-[#17161D] flex justify-center items-center flex-col'>
        <Link href='/home'>
          <div className='w-full text-center text-slate-50 font-bold text-4xl  mt-10 mb-10 hover:cursor-pointer'>
            Churchy
          </div>
        </Link>

        <form
          className='bg-[#202024] w-[95%] min-h-5/6 md:w-2/6 md:min-h-4/6 rounded-xl flex items-center justify-center flex-col
        mt-6 md:mt-0
        '
        >
          <div className='flex flex-col w-4/6 h-1/4 mt-10 justify-center'>
            <label className='text-slate-300 font-semibold text-lg'>
              Passagem do devocional :
            </label>
            <input
              className='placeholder:italic placeholder:text-slate-100 block bg-[#17161D] w-full border-2 border-[#17161D]
                   rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-pink-500  text-slate-300 
                   focus:ring-1 sm:text-md mt-2 hover:border-pink-500 duration-200'
            />
          </div>
          <div className='flex flex-col w-4/6 h-1/4 mt-10 justify-center'>
            <label className='text-slate-300 font-semibold text-lg'>
              Título do Devocional :
            </label>
            <input
              className='placeholder:italic placeholder:text-slate-100 block bg-[#17161D] w-full border-2 border-[#17161D]
                   rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-pink-500  text-slate-300 
                   focus:ring-1 sm:text-md mt-2 hover:border-pink-500 duration-200'
            />
          </div>
          <div className='flex flex-col w-4/6 h-96 mb-10 mt-10  justify-center'>
            <label className='text-slate-300 font-semibold text-lg'>
              Citação :
            </label>
            <textarea
              className='placeholder:italic placeholder:text-slate-100 block bg-[#17161D] w-full border-2 border-[#17161D]
                   rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-pink-500  text-slate-300 
                   focus:ring-1 sm:text-md mt-2 hover:border-pink-500 duration-200 resize-none h-80 md:h-96'
            />
          </div>
          <input
            type='submit'
            className='w-36 h-14 bg-pink-500 mt-6 mb-10 rounded-lg hover:bg-pink-600 hover:cursor-pointer text-slate-100 font-semibold'
          />
        </form>
      </main>
    </>
  );
}
