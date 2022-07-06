import Link from "next/link";
import { useRouter } from "next/router";
import ContentLoader, { Code, BulletList, List } from "react-content-loader";
import { Header } from "../components/Header";
import { Logout } from "../components/Logout";
import { SectionCard } from "../components/SectionCard";
import { Form } from "../components/form";
import { Rhema } from "../components/rhema";
import { NotificationLoader } from "../components/notificationLoader";
import { BiRightArrowAlt } from "react-icons/bi";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <main className='w-screen min-h-screen flex pt-10 items-center flex-col'>
        <div className='flex gap-x-6 items-center'>
          <Header />
          <Logout />
        </div>
        <section className='w-full lg:w-[75%] min-h-[40vh] mt-10 flex flex-wrap gap-x-8 gap-y-4 justify-center items-center'>
          <SectionCard
            title='Eventos'
            description='Edite a aba "Eventos" do app '
            asset={
              <ContentLoader viewBox='0 0 245 60' backgroundColor='#fed7aa'>
                <circle cx='10' cy='20' r='8' />
                <rect x='25' y='15' rx='5' ry='5' width='180' height='10' />
                <circle cx='10' cy='50' r='8' />
                <rect x='25' y='45' rx='5' ry='5' width='180' height='10' />
              </ContentLoader>
            }
            navigate={() => router.push("/events")}
            delay={2}
          />
          <SectionCard
            title='Post Inicial'
            description='Edite a postagem da página inicial do aplicativo'
            navigate={() => router.push("/post")}
            asset={<Form backgroundColor='#fed7aa ' />}
          />
          <SectionCard
            title='Palavras'
            description='Edite a Palavra diária e o devocional'
            navigate={() => router.push("/words")}
            asset={<Rhema backgroundColor='#fed7aa' />}
            delay={1.5}
          />
        </section>
        <div
          onClick={() => router.push("/notifications")}
          className='w-[90%] lg:w-[60%] mt-6 mb-10 bg-[#202024] rounded-xl min-h-[30vh] flex flex-col lg:flex-row justify-center p-5 cursor-pointer duration-200 hover:scale-105 '
        >
          <aside className='h-full w-1/3 mx-auto flex items-center jusitfy-center'>
            <NotificationLoader backgroundColor='#fed7aa' />
          </aside>
          <div className='flex flex-col lg:justify-evenly'>
            <h1 className='text-gray-100 text-xl text-center font-semibold'>
              Notificações e Mural de avisos
            </h1>
            <p className='text-gray-100 mt-4 lg:mt-0 text-lg text-center font-normal'>
              Envie notificações e cheque o mural de avisos
            </p>
          </div>
          <BiRightArrowAlt size={40} color='#fff' className='my-auto ml-auto' />
        </div>
      </main>
    </>
  );
}
