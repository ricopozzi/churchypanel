import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabase";
import { useDebugValue, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import { v4 as uuidV4 } from "uuid";
import { Loading } from "../../components/Loading";

interface DefaultEventProps {
  title?: string;
  shortDescription?: string;
  imageurl?: string;
  description?: string;
  adress?: string;
  date?: string;
  time?: string;
}

export default function Events() {
  const [image, setImage] = useState<File>();
  const [defaultEvent, setDefaultEvent] = useState<DefaultEventProps>({});

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select(
          "title, shortDescription, imageurl, description, adress, date, time"
        )
        .match({ id: "41fca09e-08fe-4e44-a542-143cf2b4c3bb" });
      //@ts-ignore
      setDefaultEvent(data[0]);
      setLoading(false);
    })();
  }, []);

  const onSubmit = async (data: any) => {
    if (image) {
      //@ts-ignore
      const {} = await supabase.storage.emptyBucket("mainevent");

      //utilizei var para essas variávies ficarem disponíveis fora do escopo do IF
      var { data: uploadData, error } = await supabase.storage
        .from("mainevent")
        .upload(`public/${uuidV4()}`, image);

      if (error) {
        setLoading(false);
        throw error;
      }
    }
    const splittedArray = uploadData?.Key.split("/");

    const { publicURL } = supabase.storage
      //@ts-ignore
      .from(splittedArray[0])
      //@ts-ignore
      .getPublicUrl(`${splittedArray[1]}/${splittedArray[2]}`);

    const { data: updateTable, error: updateTableError } = await supabase
      .from("events")
      .update({
        imageurl: publicURL,
        bucketurl: uploadData?.Key,
        title: data.title,
        shortDescription: data.shortDescription,
        description: data.description,
        adress: data.adress,
        time: data.time,
        date: data.date,
      })
      .match({ id: "41fca09e-08fe-4e44-a542-143cf2b4c3bb" });
  };

  return (
    <>
      <main className='w-screen min-h-screen md:w-2/5 mx-auto flex pt-10 items-center flex-col'>
        <Header />
        <Link href='/events'>
          <FaArrowLeft
            size={34}
            color={"white"}
            className='absolute left-5 lg:left-10 top-14'
          />
        </Link>

        {loading ? null : (
          <>
            <section className='w-11/12 min-h-72 pt-3 px-3 text-lg mt-10 mb-6 text-gray-100 antialised '>
              <h1 className='mb-3  font-black text-xl'>Evento Atual</h1>

              <div className='border-b border-gray-600 mb-3 pb-2'>
                {defaultEvent.title}
              </div>
              <div className='border-b border-gray-600 mb-3 pb-2'>
                {defaultEvent.shortDescription}
              </div>
              <div className='border-b border-gray-600  mb-3 pb-2'>
                {defaultEvent.description}
              </div>
              <div className='border-b border-gray-600 mb-3 pb-2'>
                {defaultEvent.adress}
              </div>
              <div className='border-b border-gray-600 mb-3 pb-2'>
                {/**@ts-ignore */}
                {new Date(defaultEvent.date).toLocaleDateString()}
              </div>
              <div className='border-b border-gray-600 mb-3 pb-2'>
                {defaultEvent.time}
              </div>
              <img
                className='lg:w-[30rem] h-[30vh] mt-5 rounded-xl border-4 border-gray-100/40 object-contain'
                src={defaultEvent.imageurl}
              />
            </section>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=' w-full min-h-40 pt-16 pb-10 px-3'
            >
              <div>
                <p className='text-gray-200 text-md font-bold'>
                  Imagem de fundo
                </p>

                <input
                  type='file'
                  className='text-gray-200 mt-2'
                  accept='.png,.jpeg,.jpg,.JPG,.JPEG'
                  //@ts-ignore
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className='mt-5 flex flex-col'>
                <p className='text-gray-200 text-md font-bold'>Título</p>
                <input
                  type='text'
                  className='mt-2 w-5/6 h-8 rounded-md px-2 text-sm text-gray-800 border-2 border-gray-200'
                  {...register("title", { required: true, maxLength: 24 })}
                />
                <p className='text-red-600'>
                  {errors.title && "É necessário um título"}
                </p>
              </div>
              <div className='mt-5 flex flex-col'>
                <p className='text-gray-200 text-sm font-bold'>
                  Descrição curta (max: 60 caracteres)
                </p>
                <textarea
                  className='mt-2 w-5/6 h-16 rounded-md px-2 text-sm text-gray-00 border-2 border-gray-200'
                  {...register("shortDescription", {
                    maxLength: 60,
                    required: true,
                  })}
                />
                <p className='text-red-600'>
                  {errors.shortDescription &&
                    "A descrição é necessária (máx: 60 caracteres) "}
                </p>
              </div>
              <div className='mt-5 flex flex-col'>
                <p className='text-gray-200 text-sm font-bold'>
                  Descrição (max: 120 caracteres)
                </p>
                <textarea
                  className='mt-2 w-5/6 h-32 rounded-md px-2 text-sm text-gray-800 border-2 border-gray-200'
                  {...register("description", {
                    maxLength: 120,
                    required: true,
                  })}
                />
                <p className='text-red-600'>
                  {errors.description &&
                    "A descrição é necessária (máx: 120 caracteres) "}
                </p>
              </div>
              <div className='mt-5 flex flex-col'>
                <p className='text-gray-200 text-md font-bold'>Endereço</p>
                <input
                  type='text'
                  className='mt-2 w-5/6 h-8 rounded-md px-2 text-sm text-gray-800 border-2 border-gray-200'
                  {...register("adress", { maxLength: 45 })}
                />
                <p className='text-red-600'>
                  {errors.adress && "máx: 45 caracteres"}
                </p>
              </div>
              <div className='mt-5 flex flex-col'>
                <p className='text-gray-200 text-md font-bold'>Data</p>
                <input
                  type='date'
                  className='mt-2 w-5/6 h-8 rounded-md px-2 text-sm text-gray-800 border-2 border-gray-200'
                  {...register("date")}
                />
              </div>
              <div className='mt-5 flex flex-col'>
                <p className='text-gray-200 text-md font-bold'>Hora</p>
                <input
                  type='time'
                  className='mt-2 w-5/6 h-8 rounded-md px-2 text-sm text-gray-800 border-2 border-gray-200'
                  {...register("time")}
                />
              </div>
              <button
                type='submit'
                className='w-5/6 h-12 bg-orange-300 rounded-md text-xl mt-5 flex items-center justify-center text-md text-gray-100 font-medium '
              >
                Editar
              </button>
            </form>
          </>
        )}
      </main>
    </>
  );
}
