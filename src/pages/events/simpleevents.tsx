import { Header } from "../../components/Header";
import Link from "next/link";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import ReactSelect from "react-select";
import { supabase } from "../../lib/supabase";
import { v4 as uuidV4 } from "uuid";
import Image from "next/image";
import { isObject } from "util";

interface EventsProps {
  title: string;
  shortdescription: string;
  imageurl: string;
  dayoftheweek: string;
  id: string;
  bucketurl: string;
  time: any;
}

interface EventsImageProps {
  id: string;
  imageUrl: string;
}

export default function SimpleEvents() {
  const [newEventOpened, setNewEventOpened] = useState(false);
  const [events, setEvents] = useState<EventsProps[]>();
  const [image, setImage] = useState<File>();
  const [uploaded, setUploaded] = useState(false);
  const [dropped, setDropped] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("smallevents")
        .select(
          "dayoftheweek, shortdescription, imageurl, title, id, bucketurl, time"
        );

      //@ts-ignore
      return setEvents(data);
    })();
  }, [uploaded, dropped]);

  const onNewEventSubmit = async (data: any) => {
    if (image) {
      //utilizei var para essas variávies ficarem disponíveis fora do escopo do IF
      var { data: uploadData, error } = await supabase.storage
        .from("smallevents")
        .upload(`public/${uuidV4()}`, image);
      if (error) {
        throw error;
      }
    }

    const splittedArray = uploadData?.Key.split("/");

    const { publicURL } = await supabase.storage
      //@ts-ignore
      .from(splittedArray[0])
      //@ts-ignore
      .getPublicUrl(`${splittedArray[1]}/${splittedArray[2]}`);

    let selectedDayNumber = 1;

    if (data.ReactSelect.value == "Segunda-Feira") {
      selectedDayNumber = 1;
    }
    if (data.ReactSelect.value == "Terça-Feira") {
      selectedDayNumber = 2;
    }
    if (data.ReactSelect.value == "Quarta-Feira") {
      selectedDayNumber = 3;
    }
    if (data.ReactSelect.value == "Quinta-Feira") {
      selectedDayNumber = 4;
    }
    if (data.ReactSelect.value == "Sexta-Feira") {
      selectedDayNumber = 5;
    }
    if (data.ReactSelect.value == "Sábado") {
      selectedDayNumber = 6;
    }
    if (data.ReactSelect.value == "Domingo") {
      selectedDayNumber = 7;
    }

    const { data: addTable, error: addTableError } = await supabase
      .from("smallevents")
      .insert([
        {
          imageurl: publicURL,
          bucketurl: uploadData?.Key,
          title: data.title,
          shortdescription: data.shortDescription,
          dayoftheweek: data.ReactSelect.value,
          dayasnumber: selectedDayNumber,
          adress: data.adress,
          time: data.time,
        },
      ]);

    setUploaded(!uploaded);
    setNewEventOpened(false);
  };

  const dropEvent = async (itemId: any, theUrl: string) => {
    const { data, error } = await supabase
      .from("smallevents")
      .delete()
      .match({ id: itemId });

    const splittedArray = theUrl.split("/");

    const { error: DropStorageErr } = await supabase.storage
      .from("smallevents")
      .remove([`${splittedArray[1]}/${splittedArray[2]}`]);

    //for useEffect re-render
    return setDropped(!dropped);
  };

  return (
    <>
      <main className='w-screen min-h-screen md:w-2/5 mx-auto flex pt-10 items-center flex-col'>
        <Header />
        <Link href='/events'>
          <FaArrowLeft
            size={34}
            color={"white"}
            className='absolute left-4 lg:left-10 top-14 cursor-pointer'
          />
        </Link>
        {events ? (
          events.map((item, index) => (
            <div
              key={item.id}
              className='text-gray-200 w-11/12 min-h-32 mt-14 lg:mt-20 gap-y-10 flex flex-col lg:flex-row justify-between items-center'
            >
              <Image
                width={200}
                height={140}
                src={item.imageurl}
                objectFit='contain'
                className='w-1/3 h-full rounded-xl'
              />

              <div className='antialiased w-full h-full flex flex-col items-center justify-center'>
                <p className='font-bold'>{item.title}</p>
                <p className='font-normal'>{item.dayoftheweek}</p>

                <p className='font-normal'>{item.time}</p>
                <p className='w-auto text-left font-extralight text-xs'>
                  {item.shortdescription}
                </p>
              </div>

              <button
                onClick={() => dropEvent(item.id, item.bucketurl)}
                className='bg-red-500 w-40 h-9 flex items-center justify-center rounded-md  text-slate-100 font-semibold tracking-wide'
              >
                Deletar
              </button>
            </div>
          ))
        ) : (
          <p></p>
        )}

        <button
          onClick={() => setNewEventOpened(!newEventOpened)}
          className='w-1/2 h-12 bg-yellow-600 font-semibold text-gray-200 mt-10 rounded-lg flex justify-center
           items-center'
        >
          Novo Evento <FaPlus className='ml-2' />
        </button>
        {newEventOpened ? (
          <>
            <form
              onSubmit={handleSubmit(onNewEventSubmit)}
              className=' w-full min-h-48 py-16 px-3'
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
                  className='mt-2 w-5/6 h-8 rounded-md px-2 text-sm border-2 border-slate-800'
                  {...register("title", { required: true, maxLength: 24 })}
                />
                <p className='text-red-600'>
                  {errors.title && "É necessário um título"}
                </p>
              </div>
              <div className='mt-5 flex flex-col'>
                <p className='text-gray-200 mb-2 text-md font-bold'>
                  Dia da Semana
                </p>
                <Controller
                  name='ReactSelect'
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      isClearable
                      {...field}
                      placeholder='Selecione o dia da semana'
                      options={[
                        { value: "Segunda-Feira", label: "Segunda-Feira" },
                        { value: "Terça-Feira", label: "Terça-Feira" },
                        { value: "Quarta-Feira", label: "Quarta-Feira" },
                        { value: "Quinta-Feira", label: " Quinta-Feira" },
                        { value: "Sexta-Feira", label: "Sexta-Feira" },
                        { value: "Sábado", label: "Sábado" },
                        { value: "Domingo", label: "Domingo" },
                      ]}
                    />
                  )}
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
                  className='mt-2 w-5/6 h-16 rounded-md px-2 text-sm border-2 border-slate-800'
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
                <p className='text-gray-200 text-md font-bold'>Endereço</p>
                <input
                  type='text'
                  className='mt-2 w-5/6 h-8 rounded-md px-2 text-sm border-2 border-slate-800'
                  {...register("adress", { required: true })}
                />
                <p className='text-red-600'>
                  {errors.adress && "É necessário um endereço"}
                </p>
              </div>
              <div className='mt-5 flex flex-col'>
                <p className='text-gray-200 text-md font-bold'>Hora</p>
                <input
                  type='time'
                  className='mt-2 w-5/6 h-8 rounded-md px-2 text-sm border-2 border-slate-800'
                  {...register("time", { required: true })}
                />
                <p className='text-red-600'>
                  {errors.time && "É necessário um horário"}
                </p>
              </div>
              <button
                type='submit'
                className='w-5/6 h-12 bg-yellow-600 text-slate-100 rounded-md mt-5 flex items-center justify-center text-lg font-medium '
              >
                Enviar
              </button>
            </form>
          </>
        ) : (
          <p></p>
        )}
        <div className=' w-11/12 min-h-screen py-16 px-3'></div>
      </main>
    </>
  );
}
