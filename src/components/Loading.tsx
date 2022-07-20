import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0.7, opacity: 0.3 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.8,
        }}
        className='w-12 h-12 rounded-full bg-yellow-400'
      ></motion.div>
    </>
  );
};
