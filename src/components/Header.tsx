import Image from "next/image";
import Link from "next/link";

export function Header({ ...rest }) {
  return (
    <div {...rest}>
      <Link href='/home'>
        <Image src='/rhema.png' width={250} height={60} />
      </Link>
    </div>
  );
}
