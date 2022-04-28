import { Header } from "../components/Header";
import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { v4 as uuidV4 } from "uuid";

export default function Post() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});
  const [image1, setImage1] = useState<File>();
  const [image2, setImage2] = useState<File>();
  const [image3, setImage3] = useState<File>();
  const [image4, setImage4] = useState<File>();
  const [image5, setImage5] = useState<File>();

  //@ts-ignore
  async function onSubmit(values: any) {
    const picturesArray = [];

    const { data: worshipData, error: worshipError } = await supabase
      .from("worship")
      .select("pictures")
      .match({ id: "8112e321-3dde-42af-aec2-076d102c00f8" });

    const { error: emptyError } = await supabase.storage.emptyBucket("posts");

    try {
      if (image1) {
        const { data: uploadData, error } = await supabase.storage
          .from("posts")
          //@ts-ignore
          .upload(`public/${uuidV4()}`, image1);

        const splittedArray = uploadData?.Key.split("/");

        //@ts-ignore
        const { publicURL } = supabase.storage
          .from(splittedArray[0])
          .getPublicUrl(`${splittedArray[1]}/${splittedArray[2]}`);

        picturesArray.push(publicURL);

        if (error) {
          throw error;
        }
      }
      if (image2) {
        const { data: uploadData, error } = await supabase.storage
          .from("posts")
          //@ts-ignore
          .upload(`public/${uuidV4()}`, image2);

        const splittedArray = uploadData?.Key.split("/");

        const { publicURL } = supabase.storage
          .from(splittedArray[0])
          .getPublicUrl(`${splittedArray[1]}/${splittedArray[2]}`);

        picturesArray.push(publicURL);
        if (error) {
          throw error;
        }
      }
      if (image3) {
        const { data: uploadData, error } = await supabase.storage
          .from("posts")
          //@ts-ignore
          .upload(`public/${uuidV4()}`, image3);

        const splittedArray = uploadData?.Key.split("/");

        const { publicURL } = supabase.storage
          .from(splittedArray[0])
          .getPublicUrl(`${splittedArray[1]}/${splittedArray[2]}`);

        picturesArray.push(publicURL);
        if (error) {
          throw error;
        }
      }
      if (image4) {
        const { data: uploadData, error } = await supabase.storage
          .from("posts")
          //@ts-ignore
          .upload(`public/${uuidV4()}`, image4);

        const splittedArray = uploadData?.Key.split("/");

        const { publicURL } = supabase.storage
          .from(splittedArray[0])
          .getPublicUrl(`${splittedArray[1]}/${splittedArray[2]}`);

        picturesArray.push(publicURL);

        if (error) {
          throw error;
        }
      }
      if (image5) {
        const { data: uploadData, error } = await supabase.storage
          .from("posts")
          //@ts-ignore
          .upload(`public/${uuidV4()}`, image5);

        const splittedArray = uploadData?.Key.split("/");

        const { publicURL } = supabase.storage
          .from(splittedArray[0])
          .getPublicUrl(`${splittedArray[1]}/${splittedArray[2]}`);

        picturesArray.push(publicURL);

        if (error) {
          throw error;
        }
      }

      const { data: updateData, error: updateError } = await supabase
        .from("worship")
        .update([
          {
            pictures: picturesArray,
            title: values.title,
            mainText: values.mainText,
            likes: [],
          },
        ])
        .match({ id: "8112e321-3dde-42af-aec2-076d102c00f8" });
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <main className='w-screen min-h-screen bg-[#17161D] flex pt-10 items-center flex-col'>
        <Header />
        <Link href={"/home"}>
          <FaArrowLeft
            size={24}
            color={"#fafafa"}
            className='absolute left-4 top-14'
          />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-5/6 min-h-3/4 mt-10 flex flex-col items-center justify-center py-10'
        >
          <div>
            <span className='font-semibold text-md text-slate-50'>Foto 1</span>
            <input
              type='file'
              className='h-10 mt-4 text-slate-50'
              //@ts-ignore
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </div>
          <div>
            <span className='font-semibold text-md text-slate-50'>Foto 2</span>
            <input
              type='file'
              className='h-10 mt-4 text-slate-50'
              accept='.png,.jpeg,.jpg,.JPG,.JPEG'
              //@ts-ignore
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </div>
          <div>
            <span className='font-semibold text-md text-slate-50'>Foto 3</span>
            <input
              type='file'
              className='h-10 mt-4 text-slate-50'
              accept='.png,.jpeg,.jpg,.JPG,.JPEG'
              //@ts-ignore
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </div>
          <div>
            <span className='font-semibold text-md text-slate-50'>Foto 4</span>
            <input
              type='file'
              className='h-10 mt-4 text-slate-50'
              accept='.png,.jpeg,.jpg,.JPG,.JPEG'
              //@ts-ignore
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </div>
          <div>
            <span className='font-semibold text-md text-slate-50'>Foto 5</span>
            <input
              type='file'
              className='h-10 mt-4 text-slate-50'
              accept='.png,.jpeg,.jpg,.JPG,.JPEG'
              //@ts-ignore
              onChange={(e) => setImage5(e.target.files[0])}
            />
          </div>
          <div className='w-full text-red-300 flex flex-col '>
            <p className='font-semibold text-md text-slate-50'>Título</p>
            <input
              type='text'
              className='mt-2 w-3/4 rounded-md h-8 text-slate-800'
              {...register("title", { required: true, maxLength: 18 })}
            />
            {errors.title?.type === "required" && "Esse campo é obrigatório"}
          </div>
          <div className='w-full text-red-300 flex flex-col mt-4 '>
            <p className='font-semibold text-md text-slate-50'>
              Texto Principal
            </p>
            <textarea
              className='mt-2 w-full rounded-md h-80 text-slate-800 '
              {...register("mainText", { required: true })}
            />
            {errors.mainText?.type === "required" && "Esse campo é obrigatório"}
          </div>

          <button
            className='bg-slate-50 w-1/2 mx-auto rounded-md mt-10 h-12 cursor-pointer '
            type='submit'
          >
            Enviar
          </button>
        </form>
      </main>
    </>
  );
}
