import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0.3, opacity: 1 }}
        animate={{ scale: 0.8, opacity: 0.2 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.8,
        }}
        className='w-16 h-16 bg-orange-300 rounded-full'
      ></motion.div>
      <motion.div
        initial={{ scale: 0.3, opacity: 1 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.8,
          delay: 0.9,
        }}
        className='w-12 h-12 bg-orange-200 rounded-full absolute'
      ></motion.div>
    </>
  );
};
