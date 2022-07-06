import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { MdEventNote } from "react-icons/md";
import Link from "next/link";
import { SectionCard } from "../../components/SectionCard";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

export default function Events() {
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
              title='Evento Principal'
              asset={<MdEventNote size={100} color='#fed7aa' />}
              description='Edite o Evento principal do app'
              navigate={() => router.push("/events/main")}
              delay={1}
            />
            <SectionCard
              title='Agenda Semanal'
              asset={<Image src='/svglist.svg' width={200} height={100} />}
              description='Edite os eventos semanais do app'
              navigate={() => router.push("/events/simpleevents")}
              delay={2}
            />
          </>
        </section>
      </main>
    </>
  );
}
