import "../styles/globals.css";
import type { AppProps } from "next/app";
import { supabase } from "../lib/supabase";
import { useEffect, useState, useContext } from "react";
import { AuthContext, authContext } from "../hooks/authHook";
import Home from "./index";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      {/*@ts-ignore*/}
      <Component {...pageProps} />
    </AuthContext>
  );
}

export default MyApp;
