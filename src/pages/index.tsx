import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { authContext } from "../hooks/authHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loading } from "../components/Loading";

const schema = yup.object({
  email: yup
    .string()
    .required("Esse campo é obrigatório")
    .email("É necessário um email válido"),
  password: yup.string().required("Esse campo é obrigatório"),
});

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { loginUser, session, loginError } = useContext(authContext);

  const onSubmit = async (data: any) => {
    setLoading(true);
    await loginUser({ email: data.email, password: data.password });
    console.log(loginError);
    return setLoading(false);
  };

  return (
    <>
      <Head key='_login'>
        <title>Churchy | Login</title>
      </Head>
      <main className='bg-[#121214] w-screen h-screen flex flex-col lg:flex-row justify-center items-center gap-y-10 lg:gap-x-44'>
        <div className=''>
          <Image
            src='/rhema.png'
            objectFit='contain'
            width={300}
            height={100}
          />
          <h1 className='font-bold text-gray-200 text-4xl lg:text-5xl leading-[1.2]'>
            Faça login na <br />
            plataforma
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-[#202024] w-11/12 md:w-[60%] h-[50%] lg:w-[35rem] lg:h-[33rem] rounded-lg flex flex-col justify-center items-center gap-12 p-10 lg:p-20'
        >
          <div className='w-full'>
            {loginError !== "" ? (
              <p className='font-semibold text-base mb-4 text-orange-200 text-center '>
                {loginError}
              </p>
            ) : null}
            <input
              type='text'
              placeholder='E-mail'
              {...register("email")}
              className='w-full bg-black h-16 rounded-lg focus:outline-none focus:border border-yellow-700 delay-100 ease-in-out text-gray-100 font-semibold
                       p-3 md:text-xl placeholder:text-gray-100/40
            '
            />
            {errors?.email ? (
              <p className='font-semibold text-base mt-1 text-orange-200 text-center '>
                {errors?.email.message}
              </p>
            ) : null}
          </div>
          <div className='w-full'>
            <input
              type='password'
              placeholder='Senha'
              {...register("password")}
              className='w-full bg-black h-16 rounded-lg focus:outline-none focus:border border-yellow-700 delay-100 ease-in-out text-gray-100 font-semibold
                       p-3 md:text-xl placeholder:text-gray-100/40
            '
            />
            {errors?.password ? (
              <p className='font-semibold text-base mt-1 text-orange-200 text-center '>
                {errors?.password.message}
              </p>
            ) : null}
          </div>
          <button
            type='submit'
            className='w-full h-16 bg-yellow-600 rounded-lg flex justify-center items-center text-gray-100 font-bold text-2xl gap-x-4'
          >
            {!loading ? "Entrar" : <Loading />}
          </button>
        </form>
      </main>
    </>
  );
};

export default Home;
