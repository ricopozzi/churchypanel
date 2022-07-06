import { Header } from "../components/Header";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Loading } from "../components/Loading";

export default function Notifications() {
  const [notificationSent, setNotificationSent] = useState(false);
  const [tokens, setTokens] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [board, setBoard] = useState<any>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    //@ts-ignore
    await sendNotification(data.title, data.body);
    return setNotificationSent(true);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("pushtokens");
      //@ts-ignore
      const tokensArray = [];

      const mapy = data?.map((item) => {
        if (item.pushtokens !== null) {
          tokensArray.push(item.pushtokens);
        }
      });

      //@ts-ignore
      setTokens([...new Set(tokensArray)]);

      const { data: notificationsData, error: notificationsError } =
        await supabase
          .from("notifications")
          .select("title, description, id, created_at")
          .order("id", { ascending: false })
          .limit(10);

      setBoard(notificationsData);
    })();
  }, []);

  const sendNotification = async (pushTitle: string, pushBody: string) => {
    setIsLoading(true);
    const { data: notificatonData, status } = await axios.post("/api/notify", {
      data: {
        to: tokens,
        title: pushTitle,
        body: pushBody,
      },
    });

    const {} = await supabase
      .from("notifications")
      .insert([{ title: pushTitle, description: pushBody }]);

    setIsLoading(false);

    return notificatonData;
  };

  return (
    <>
      <main className='max-w-screen min-h-screen flex pt-10 items-center flex-col'>
        <Link href={"/home"}>
          <FaArrowLeft
            size={34}
            color={"white"}
            className='absolute left-4 lg:left-10 top-14 cursor-pointer'
          />
        </Link>
        <Header className='mx-auto' />

        <section className='mt-24 w-[90%] lg:w-1/4 bg-[#202024] min-h-[20rem] p-10 flex flex-col rounded-lg'>
          <h1 className='text-center text-xl text-gray-100 font-bold'>
            Mural de Avisos
          </h1>
          <div className='min-h-10 w-full'>
            {board?.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className='px-2 border-b mt-5 border-gray-600 min-h-10 '
                >
                  <h1 className='text-lg text-gray-200 font-semibold'>
                    {item.title}
                  </h1>
                  <div className='w-full h-full break-words my-2'>
                    <p className='text-gray-200 text-sm w-full'>
                      {item.description}
                    </p>
                    <p className='my-1 text-gray-100 font-normal'>
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className='mt-24 md:w-1/5 text-center font-bold text-gray-200 '>
          Essas notificações serão enviadas para todos os dispositivos e ficarão
          disponíveis no mural de avisos
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className='w-full lg:w-1/4 px-4 min-h-10'>
            {notificationSent ? (
              <div className='text-lg text-yellow-400 font-semibold mt-20'>
                Notificação enviada com sucesso
                <button
                  onClick={() => setNotificationSent(false)}
                  className='mt-7 bg-yellow-400 text-slate-700 flex justify-center items-center w-11/12 h-10 rounded font-semibold'
                >
                  Enviar nova notificação
                </button>
              </div>
            ) : (
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
            )}
          </div>
        )}
      </main>
    </>
  );
}
