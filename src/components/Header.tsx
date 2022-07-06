import Image from "next/image";
import Link from "next/link";
import { Logout } from "./Logout";

export function Header({ ...rest }) {
  return (
    <div>
      <Link href='/home'>
        <Image
          src='/rhema.png'
          width={220}
          height={50}
          className='cursor-pointer'
        />
      </Link>
    </div>
  );
}
