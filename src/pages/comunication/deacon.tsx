import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import { MemberCard } from "../../components/MemberCard";
import { SearchPerson } from "../../components/searchPerson";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Loading } from "../../components/Loading";

export default function Deacon() {
  const [refetch, setRefetch] = useState<any>();
  const [deacons, setDeacons] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      let tokens: any = [];

      //@ts-ignore
      deacons.map((item) => tokens.push(item.pushtoken));

      const {} = await axios.post("/api/notify", {
        data: {
          to: tokens,
          title: data.title,
          body: data.body,
        },
      });
    } catch (error) {
      setLoading(false);

      return alert("Não há diáconos cadastrados");
    }
  };

  const fetchDeacons = async () => {
    const { data }: any = await supabase
      .from("deacons")
      .select("name, pushtoken, profile_id");

    setDeacons(data);
  };

  const dropDeacon = async (id: string) => {
    const { error, status } = await supabase.from("deacons").delete().match({
      profile_id: id,
    });

    return setRefetch(Math.random());
  };

  useEffect(() => {
    fetchDeacons();
  }, [refetch]);

  return (
    <>
      <main className='w-screen min-h-screen md:w-2/5 mx-auto flex py-10 items-center flex-col'>
        <Header />
        <FaArrowLeft
          size={34}
          color={"white"}
          className='absolute left-5 lg:left-10 top-14 cursor-pointer'
          onClick={() => router.push("/comunication")}
        />
        <section className='w-full p-4 min-h-[10vh] mt-10 flex flex-col'>
          <h1 className='font-semibold text-2xl mb-4 lg:mb-10 text-gray-200'>
            O aviso será enviado para:
          </h1>
          <div className='h-full my-4 flex gap-4 flex-wrap justify-center'>
            {deacons?.map((item: any, index) => (
              <MemberCard
                key={`key-${index}`}
                member={item}
                database='deaconnotification'
                dropMember={() => dropDeacon(item.profile_id)}
              />
            ))}
          </div>
        </section>

        {loading ? (
          <div className='h-48 flex items-center'>
            <Loading />
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col mt-10 w-full'
            >
              <div className='flex flex-row p-4 py-2 w-full min-h-24 justify-start items-center '>
                <div className='flex flex-col w-full'>
                  <h1 className='text-gray-200 text-xl font-semibold'>
                    Título
                  </h1>
                  <input
                    className='bg-gray-100 appearance-none border-b border-slate-900 focus:outline-none h-10 px-2 rounded-md text-slate-900 mt-2 font-semibold checked:border-none w-full '
                    type='text'
                    {...register("title", {
                      required: true,
                      maxLength: 30,
                    })}
                  />
                  <p className='text-red-400 text-sm'>
                    {errors.title
                      ? "Campo Obrigatório (max: 30 caracteres)"
                      : ""}
                  </p>

                  <h1 className='text-gray-200 font-semibold text-xl my-2'>
                    Descrição
                  </h1>
                  <textarea
                    className='mt-2 rounded-md h-32 p-2 border-b focus:outline-none border-slate-900 font-normal resize-none '
                    {...register("body", {
                      required: true,
                    })}
                  />
                  <p className='text-red-400 text-sm'>
                    {errors.body ? "Campo Obrigatório" : ""}
                  </p>
                </div>
              </div>

              <button className='bg-orange-300 w-40 h-12 mt-10 rounded-lg flex items-center justify-center mb-10 text-slate-100 text-lg font-semibold tracking-wide antialiased cursor-pointer'>
                Enviar aviso
              </button>
            </form>
          </>
        )}

        <SearchPerson
          database='deacons'
          refetch={() => setRefetch(Math.random())}
        />
      </main>
    </>
  );
}
