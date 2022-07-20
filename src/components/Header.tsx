import Image from "next/image";
import Link from "next/link";
import { Logout } from "./Logout";
import rhema from "../../public/rhema.png";
import { useRouter } from "next/router";

export function Header({ ...rest }) {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/home")}>
      <Image src={rhema} width={220} height={50} className='cursor-pointer' />
    </div>
  );
}
