import { Header } from "../components/Header";
import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { v4 as uuidV4 } from "uuid";

export default function Post() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});
  const [post, setPost] = useState<any>();
  const [image1, setImage1] = useState<File>();
  const [image2, setImage2] = useState<File>();
  const [image3, setImage3] = useState<File>();
  const [image4, setImage4] = useState<File>();
  const [image5, setImage5] = useState<File>();

  useEffect(() => {
    (async () => {
      const { data }: any = await supabase
        .from("worship")
        .select("pictures, title, mainText");

      console.log(data[0].pictures);
      setPost(data[0]);
    })();
  }, []);

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
          //@ts-ignore
          .from(splittedArray[0])
          //@ts-ignore

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
          //@ts-ignore

          .from(splittedArray[0])
          //@ts-ignore

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
          //@ts-ignore

          .from(splittedArray[0])
          //@ts-ignore

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
          //@ts-ignore

          .from(splittedArray[0])
          //@ts-ignore

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
          //@ts-ignore

          .from(splittedArray[0])
          //@ts-ignore

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
      <main className='w-screen min-h-[70vh] md:w-2/5 mx-auto flex pt-10 items-center flex-col '>
        <Header />
        <Link href={"/home"}>
          <FaArrowLeft
            size={34}
            color={"white"}
            className='absolute left-4 lg:left-10 top-14 cursos-pointer'
          />
        </Link>

        <section className='min-h-[30vh] w-full '>
          <div className='w-full min-h-20 flex mt-10 justify-center gap-x-3 border-b pb-4 flex-wrap'>
            {post?.pictures.map((item: string) => (
              <>
                <img
                  className='h-full rounded-md object-cover w-1/5'
                  src={item}
                />
              </>
            ))}
          </div>
          <div className='pb-4 border-b text-xl text-gray-100 mt-4 px-2'>
            {post?.title}
          </div>
          <div className='pb-4 border-b px-2 text-base text-gray-100 mt-4 text-justify'>
            {post?.mainText}
          </div>
        </section>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-5/6 min-h-3/4 mt-10 flex flex-col items-center justify-center pb-10'
        >
          <h1 className='text-xl mb-4 font-semibold text-gray-200'>Alterar</h1>

          <div className='flex flex-col mr-auto'>
            <span className='font-semibold text-md text-gray-200'>Foto 1</span>
            <input
              type='file'
              className='h-10 mt-4 text-gray-200'
              //@ts-ignore
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </div>
          <div className='flex flex-col mr-auto'>
            <span className='font-semibold text-md text-gray-200'>Foto 2</span>
            <input
              type='file'
              className='h-10 mt-4 text-gray-300'
              accept='.png,.jpeg,.jpg,.JPG,.JPEG'
              //@ts-ignore
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </div>
          <div className='flex flex-col mr-auto'>
            <span className='font-semibold text-md text-gray-200'>Foto 3</span>
            <input
              type='file'
              className='h-10 mt-4 text-gray-300'
              accept='.png,.jpeg,.jpg,.JPG,.JPEG'
              //@ts-ignore
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </div>
          <div className='flex flex-col mr-auto'>
            <span className='font-semibold text-md text-gray-200'>Foto 4</span>
            <input
              type='file'
              className='h-10 mt-4 text-gray-300'
              accept='.png,.jpeg,.jpg,.JPG,.JPEG'
              //@ts-ignore
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </div>
          <div className='flex flex-col mr-auto'>
            <span className='font-semibold text-md text-gray-200'>Foto 5</span>
            <input
              type='file'
              className='h-10 mt-4 text-gray-300'
              accept='.png,.jpeg,.jpg,.JPG,.JPEG'
              //@ts-ignore
              onChange={(e) => setImage5(e.target.files[0])}
            />
          </div>
          <div className='w-full text-red-300 flex flex-col '>
            <p className='font-semibold text-md text-gray-300'>T??tulo</p>
            <input
              type='text'
              className='mt-2 w-3/4 rounded-md h-8 text-slate-800 border-2 border-slate-800'
              {...register("title", { required: true, maxLength: 24 })}
            />
            {errors.title && "Esse campo ?? obrigat??rio (max: 24 carateres)"}
          </div>
          <div className='w-full text-red-300 flex flex-col mt-4 '>
            <p className='font-semibold text-md text-gray-200'>
              Texto Principal
            </p>
            <textarea
              className='mt-2 w-full rounded-md h-80 text-slate-800 border-2 border-slate-800 p-2'
              {...register("mainText", { required: true })}
            />
            {errors.mainText?.type === "required" && "Esse campo ?? obrigat??rio"}
          </div>

          <button
            className='bg-yellow-600 text-slate-50 w-1/2 mx-auto rounded-md mt-10 h-12 cursor-pointer font-semibold text-xl'
            type='submit'
          >
            Enviar
          </button>
        </form>
      </main>
    </>
  );
}
