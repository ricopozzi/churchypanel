import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import LoginPage from "../pages/index";
import cookies from "js-cookie";

interface AuthContextProps {
  loginUser: any;
  session?: any;
  user: boolean;
  loginError: string;
  signOutUser: any;
}

interface LoginUserProps {
  email: string;
  password: string;
}

//@ts-ignore
export const authContext = createContext<AuthContextProps>();

//@ts-ignore
export function AuthContext({ children }) {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const isAuthenticated = () => {
      const authCookie = cookies.get("auth");
      return authCookie ? setUser(true) : setUser(false);
    };

    isAuthenticated();
  }, []);

  async function loginUser({ email, password }: LoginUserProps) {
    const {
      data,
      error: profileError,
      status,
    } = await supabase.from("profile").select("admin").eq("email", email);

    console.log(profileError, data, status);

    //@ts-ignore
    if (!data[0]) {
      return setLoginError("Esse email não é cadastrado");
    }

    try {
      //@ts-ignore
      if (data[0].admin === true) {
        //@ts-ignore
        const { session, error } = await supabase.auth
          .signIn({
            email,
            password,
          })
          .then(() => {
            setUser(true);
            setAuthCookie(session?.accesToken || true);
            router.push("/home");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      //@ts-ignore
      if (data[0].admin === false) {
        setLoginError("Esse usuário não é administador");
      }
    } catch (error) {
      console.log(error);
    }

    return;
  }

  const setAuthCookie = (sexx: any) => {
    return cookies.set("auth", sexx, { expires: 7 });
  };

  async function signOutUser() {
    await supabase.auth.signOut();
    setUser(false);
    cookies.remove("auth");
    return router.push("/");
  }
  return (
    <authContext.Provider value={{ loginUser, user, loginError, signOutUser }}>
      {/*@ts-ignore */}
      {user ? children : <LoginPage />}
    </authContext.Provider>
  );
}
