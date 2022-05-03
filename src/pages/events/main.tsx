import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabase";
import { useDebugValue, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import { v4 as uuidV4 } from "uuid";

interface DefaultEventProps {
  title: string;
  shortDescription: string;
  imageurl: string;
  description: string;
}

export default function Events() {
  const [image, setImage] = useState<File>();
  const [defaultEvent, setDefaultEvent] = useState<DefaultEventProps>({
    title: "XXXX",
    shortDescription: "XXXX",
    imageurl:
      "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
    description: "xxx",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("events")
        .select("title, shortDescription, imageurl, description")
        .match({ id: "41fca09e-08fe-4e44-a542-143cf2b4c3bb" });
      //@ts-ignore
      setDefaultEvent(data[0]);
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
      })
      .match({ id: "41fca09e-08fe-4e44-a542-143cf2b4c3bb" });
  };

  return (
    <>
      <main className='w-screen min-h-screen md:w-2/5 mx-auto bg-[#fafafa] flex pt-10 items-center flex-col'>
        <Header />
        <Link href='/events'>
          <FaArrowLeft
            size={24}
            color={"black"}
            className='absolute left-4 top-14'
          />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=' w-11/12 min-h-40 pt-16 pb-4 px-3'
        >
          <div>
            <p className='text-slate-800 text-md font-bold'>Imagem de fundo</p>

            <input
              type='file'
              className='text-slate-800 mt-2'
              accept='.png,.jpeg,.jpg,.JPG,.JPEG'
              //@ts-ignore
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className='mt-5 flex flex-col'>
            <p className='text-slate-800 text-md font-bold'>Título</p>
            <input
              type='text'
              className='mt-2 w-5/6 h-8 rounded-md px-2 text-sm text-slate-800 border-2 border-slate-800'
              {...register("title", { required: true, maxLength: 24 })}
            />
            <p className='text-red-600'>
              {errors.title && "É necessário um título"}
            </p>
          </div>
          <div className='mt-5 flex flex-col'>
            <p className='text-slate-800 text-sm font-bold'>
              Descrição curta (max: 60 caracteres)
            </p>
            <textarea
              className='mt-2 w-5/6 h-16 rounded-md px-2 text-sm text-slate-800 border-2 border-slate-800'
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
          <button
            type='submit'
            className='w-5/6 h-9 bg-slate-800 rounded-md mt-5 flex items-center justify-center text-md text-slate-50 font-medium '
          >
            Editar
          </button>
        </form>

        <section className='w-11/12 min-h-72 pt-3 px-3 text-lg mb-6 text-slate-800 antialised '>
          <h1 className='mb-3 font-black text-xl'>Evento Atual</h1>

          <div className='border-b border-slate-400 mb-3 pb-2'>
            {defaultEvent.title}
          </div>
          <div className='border-b border-slate-400 mb-3 pb-2'>
            {defaultEvent.shortDescription}
          </div>
          <div>{defaultEvent.description}</div>
          <img
            className='w-2/3 h-4/5 mt-5 rounded-xl'
            src={defaultEvent.imageurl}
          />
        </section>
      </main>
    </>
  );
}
