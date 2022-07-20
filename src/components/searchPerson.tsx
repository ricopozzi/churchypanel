import { IoMdSearch } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useForm } from "react-hook-form";

interface SearchProps {
  database: string;
  refetch: any;
}

export const SearchPerson = ({ database, refetch }: SearchProps) => {
  const [profiles, setProfiles] = useState<any>();
  const { register, handleSubmit } = useForm();

  const uploadProfile = async (profile: any, database: string) => {
    const { data } = await supabase.from(database).select("name, profile_id");

    const profileAlreadyADeacon = data?.some(
      (item) => profile.id === item.profile_id
    );

    if (profileAlreadyADeacon === false) {
      const { status } = await supabase.from(database).insert([
        {
          name: profile.display_name,
          pushtoken: profile.pushtokens,
          profile_id: profile.id,
          email: profile.email,
        },
      ]);

      return refetch();
    } else {
      return alert("Esse perfil já é um diácono");
    }

    return;
  };

  const supabaseFetch = async (text: any) => {
    console.log(text.search);
    const { data, error } = await supabase
      .from("profile")
      .select()
      .textSearch("display_name", `${text.search}`);

    setProfiles(data);
  };

  return (
    <main className='w-full min-h-[30vh] flex flex-col p-4 items-center'>
      <h1 className='text-center mt-6 font-bold text-gray-200 text-xl'>
        Quem mais vai receber esses avisos ?
      </h1>
      <form
        onSubmit={handleSubmit(supabaseFetch)}
        className='w-11/12 lg:w-3/4 mt-6 h-10 bg-gray-100 pl-1 lg:pl-4 flex items-center rounded-md'
      >
        <input
          {...register("search", { required: true })}
          type='text'
          className='h-full w-full focus-within:outline-none'
        />
        <div className='w-16 flex justify-center items-center h-full bg-orange-300 rounded-r-md'>
          <input
            type={"submit"}
            value=''
            className='w-full h-full cursor-pointer'
          />
          <IoMdSearch size={28} color='white' className='absolute' />
        </div>
      </form>

      <section className='w-full min-h-20 mt-4 gap-y-1 flex flex-col'>
        {profiles?.map((item: any, index: any) => (
          <div
            key={`key-${index}`}
            onClick={() => uploadProfile(item, database)}
            className='w-full h-10 bg-gray-600 rounded-sm cursor-pointer hover:bg-emerald-600 flex px-4 justify-between items-center'
          >
            <p className='w-full text-center text-sm text-gray-200 font-semibold'>
              {item.display_name} | {item.email}
            </p>
            <BsCheck size={28} color='white' />
          </div>
        ))}
      </section>
    </main>
  );
};
