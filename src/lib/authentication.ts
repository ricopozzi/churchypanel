import { useContext } from "react";
import { authContext } from "../hooks/authHook";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { supabase } from "./supabase";

export async function requireAuthentication(gssp:GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const session = supabase.auth.session()
        if (!session) {
            // Redirect to login page
            return {
                redirect: {
                    destination: '/',
                    statusCode: 302,
                }
            };
        }

        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }
}