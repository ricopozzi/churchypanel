import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { Header } from "../../components/Header";
import { SectionCard } from "../../components/SectionCard";

export default function Comunication() {
  const router = useRouter();
  return (
    <>
      <main className='w-screen min-h-screen flex pt-10 items-center flex-col '>
        <Header />
        <section className='min-h-[40vh] lg:w-[70%] pb-10 mt-20 flex flex-col lg:flex-row gap-y-10 justify-center items-center lg:justify-evenly'>
          <FaArrowLeft
            size={34}
            color={"white"}
            className='absolute left-5 lg:left-10 top-14 cursor-pointer'
            onClick={() => router.push("/home")}
          />
          <>
            <SectionCard
              title='Diáconos'
              asset={<MdEventNote size={100} color='#fed7aa' />}
              description='Gerencie a comunicação com os diáconos'
              navigate={() => router.push("/comunication/deacon")}
              delay={1}
            />
            <SectionCard
              title='Presbíteros'
              asset={<Image src='/svglist.svg' width={200} height={100} />}
              description='Gerencie a comunicação com os diáconos'
              navigate={() => router.push("/comunication/elder")}
              delay={2}
            />
          </>
        </section>
      </main>
    </>
  );
}
