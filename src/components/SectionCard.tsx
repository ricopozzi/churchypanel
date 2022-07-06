import { motion } from "framer-motion";
import { BsBlockquoteLeft } from "react-icons/bs";
import { BiRightArrowAlt } from "react-icons/bi";
import { Code } from "react-content-loader";
import { Router } from "next/router";

interface CardProps {
  navigate: any;
  title: string;
  description: string;
  asset: any;
  delay?: number;
}

export const SectionCard = ({
  navigate,
  title,
  description,
  asset,
  delay = 1,
}: CardProps) => {
  return (
    <div className='hover:-translate-y-4 duration-300 rounded-xl w-[90%] md:w-[85%] lg:w-96 h-96 '>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay * 0.5 }}
        onClick={navigate}
        className=' h-full bg-[#202024] rounded-xl p-10 flex flex-col justify-center items-center cursor-pointer'
      >
        <h1 className='text-gray-100 font-semibold text-xl'>{title}</h1>
        <div className='w-full mt-8 flex h-[110px] justify-center'>{asset}</div>
        <p className='text-gray-100 text-center text-xl mt-8'>{description}</p>
        <BiRightArrowAlt size={40} color='#fff' className='mt-auto ml-auto' />
      </motion.div>
    </div>
  );
};
