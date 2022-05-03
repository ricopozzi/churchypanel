import Image from "next/image";
import Link from "next/link";

export function Header({ ...rest }) {
  return (
    <div {...rest}>
      <Link href='/home'>
        <Image src='/rhemaPreto.png' width={220} height={50} />
      </Link>
    </div>
  );
}
