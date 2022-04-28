import Link from "next/link";
import { Header } from "../components/Header";
import { Logout } from "../components/Logout";

export default function HomePage() {
  return (
    <>
      <main className='w-screen h-screen bg-[#17161D] flex pt-10 items-center flex-col'>
        <Header />
        <Logout />
        <section className='w-5/6 h-3/4 mt-20 flex flex-col items-center justify-start py-10'>
          <Link href='/post'>
            <div className='w-5/6 h-24 mx-auto bg-[#E38019] rounded-lg bg-opacity-30 flex justify-center items-center active:bg-opacity-40 cursor-pointer'>
              <span className='opacity-100 text-[#E38019] text-2xl font-semibold '>
                Post Inicial
              </span>
            </div>
          </Link>
          <Link href='/events'>
            <div className='w-5/6 h-24 mt-10 mx-auto bg-[#E38019] rounded-lg bg-opacity-30 flex justify-center items-center active:bg-opacity-40 cursor-pointer'>
              <span className='opacity-100 text-[#E38019] text-2xl font-semibold '>
                Eventos
              </span>
            </div>
          </Link>
          <Link href='/notifications'>
            <div className='w-5/6 h-24 mt-10 mx-auto bg-[#E38019] rounded-lg bg-opacity-30 flex justify-center items-center active:bg-opacity-40 cursor-pointer'>
              <span className='opacity-100 text-[#E38019] text-2xl font-semibold '>
                Notificações
              </span>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
