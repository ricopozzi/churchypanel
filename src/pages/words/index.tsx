import { useRouter } from "next/router";
import { Header } from "../../components/Header";
import { SectionCard } from "../../components/SectionCard";
import { BsBlockquoteLeft } from "react-icons/bs";
import { VscNote } from "react-icons/vsc";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Words() {
  const router = useRouter();

  return (
    <main className='min-h-screen max-w-screen flex flex-col items-center pt-20 pb-10'>
      <Header />
      <Link href={"/home"}>
        <FaArrowLeft
          size={34}
          color={"white"}
          className='absolute left-4 lg:left-10 cursor-pointer top-14'
        />
      </Link>
      <section className='w-full lg:w-1/2 min-h-[30vh] mt-20 flex flex-col items-center lg:flex-row gap-y-11 lg:gap-x-11 justify-center'>
        <SectionCard
          title='Palavra do dia'
          description='Edite a palavra do dia no app!'
          navigate={() => router.push("/words/quote")}
          asset={<BsBlockquoteLeft size={80} color='#fed7aa' />}
        />
        <SectionCard
          title='Devocional'
          description='Edite o devocional do app'
          navigate={() => router.push("/words/devotional")}
          asset={<VscNote size={80} color='#fed7aa' />}
          delay={1.5}
        />
      </section>
    </main>
  );
}
