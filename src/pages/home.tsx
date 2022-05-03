import Link from "next/link";
import { Header } from "../components/Header";
import { Logout } from "../components/Logout";

export default function HomePage() {
  return (
    <>
      <main className='w-screen md:w-2/5 mx-auto h-screen bg-[#fafafa] flex pt-10 items-center flex-col'>
        <Header />
        <Logout />
        <section className='w-5/6 h-3/4 mt-20 flex flex-col items-center justify-start py-10'>
          <Link href='/post'>
            <div className='w-4/6 h-20 bg-[#F6C056] rounded-lg flex justify-center items-center active:bg-opacity-40 cursor-pointer'>
              <span className='opacity-100 text-[#fafafa] text-2xl font-semibold '>
                Post Inicial
              </span>
            </div>
          </Link>
          <Link href='/events'>
            <div className='w-4/6 h-20 mt-8 bg-[#F6C056] rounded-lg flex justify-center items-center active:bg-opacity-40 cursor-pointer'>
              <span className='opacity-100 text-[#fafafa] text-2xl font-semibold '>
                Eventos
              </span>
            </div>
          </Link>
          <Link href='/notifications'>
            <div className='w-4/6 h-20  mt-8 bg-[#F6C056] rounded-lg flex justify-center items-center active:bg-opacity-40 cursor-pointer'>
              <span className='opacity-100 text-[#fafafa] text-2xl font-semibold '>
                Notificações
              </span>
            </div>
          </Link>
          <Link href='/devotional'>
            <div className='w-4/6 h-20  mt-8 bg-[#F6C056] rounded-lg flex justify-center items-center active:bg-opacity-40 cursor-pointer'>
              <span className='opacity-100 text-[#fafafa] text-2xl font-semibold '>
                Devocional
              </span>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
