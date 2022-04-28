import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import { useContext } from "react";
import { authContext } from "../hooks/authHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .required("Esse campo é obrigatório")
    .email("É necessário um email válido"),
  password: yup.string().required("Esse campo é obrigatório"),
});

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { loginUser, session, loginError } = useContext(authContext);

  const onSubmit = async (data: any) => {
    return loginUser({ email: data.email, password: data.password });
  };

  return (
    <>
      <Head key='_login'>
        <title>Churchy | Login</title>
      </Head>
      <main className='w-screen h-screen bg-[#17161D] flex flex-col justify-center items-center px-2'>
        <Header className='fixed top-16' />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full h-3/6 flex justify-center items-center flex-col rounded-md '
        >
          {loginError != "" ? (
            <p className='mb-4 text-red-400 font-semibold'>{loginError}</p>
          ) : (
            <p></p>
          )}
          <div className='flex flex-col w-4/6 '>
            <label className='text-slate-300 font-semibold'>Email :</label>
            <input
              className='placeholder:italic placeholder:text-slate-400 block bg-inherit w-full border border-orange-500
              rounded py-2 pl-5 pr-3 shadow-sm focus:outline-none   text-slate-50
              focus:ring-1 sm:text-md mt-2   duration-200'
              type='text'
              {...register("email")}
            />
            <p className='text-red-500'>{errors.email?.message}</p>
          </div>
          <div className='mt-6 flex flex-col w-4/6'>
            <label className='text-slate-300 font-semibold'>Senha :</label>
            <input
              className='placeholder:italic placeholder:text-slate-400 block bg-inherit w-full border border-orange-500
                   rounded py-2 pl-5 pr-3 shadow-sm focus:outline-none   text-slate-50
                   focus:ring-1 sm:text-md mt-2   duration-200'
              type='password'
              {...register("password")}
            />
            <p className='text-red-500'>{errors.password?.message}</p>
          </div>
          <button
            type='submit'
            className='border-2 border-orange-600 w-36 h-10 mt-10 rounded text-slate-50 font-semibold hover:border-indigo-900 duration-200
              hover:cursor-pointer'
          >
            Entrar
          </button>
        </form>
      </main>
    </>
  );
};

export default Home;
