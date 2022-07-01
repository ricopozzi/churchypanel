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
      return setTokens([...new Set(tokensArray)]);
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
      <main className='w-screen h-screen bg-[#fafafa] flex pt-10 items-center flex-col'>
        <Link href={"/home"}>
          <FaArrowLeft
            size={24}
            color={"black"}
            className='absolute left-4 top-14'
          />
        </Link>
        <Header className='mx-auto' />

        <div className='mt-24 md:w-1/5 text-center font-bold '>
          Essas notificações serão enviadas para todos os dispositivos e ficarão
          disponíveis no mural de avisos
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
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
                className='flex flex-col mt-10'
              >
                <div className='flex flex-row p-4 py-2 w-96 h-24 justify-start items-center bg-gray-300 shadow-md shadow-gray-600 drop-shadow-lg rounded-2xl '>
                  <div className=' w-16 h-14 rounded-lg mr-4 bg-zinc-600 shadow-md flex justify-center items-center'>
                    <img src='/rhemaburger.png' className='scale-75' alt='' />
                  </div>
                  <div className='flex flex-col ml-4'>
                    <input
                      className='bg-transparent appearance-none border-b border-slate-900 focus:outline-none text-slate-900 font-semibold checked:border-none '
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

                    <input
                      className='bg-transparent border-b focus:outline-none border-slate-900 font-normal '
                      type='text'
                      {...register("body", {
                        required: true,
                        maxLength: 38,
                      })}
                    />
                    <p className='text-red-400 text-sm'>
                      {errors.body
                        ? "Campo Obrigatório (max: 38 caracteres)"
                        : ""}
                    </p>
                  </div>
                </div>

                <button className='bg-red-500 w-32 h-9 mt-10 rounded flex items-center justify-center text-slate-100 font-semibold antialiased cursor-pointer'>
                  Enviar push
                </button>
              </form>
            )}
          </div>
        )}
      </main>
    </>
  );
}
