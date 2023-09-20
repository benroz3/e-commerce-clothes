import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageTransition: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            x: 100,
          },
          pageAnimate: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.5,
            },
          },
          pageExit: {
            opacity: 0,
            x: -100,
            transition: {
              duration: 0.5,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
    // fade animation
        // <motion.div
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   exit={{ opacity: 0 }}
        //   transition={{ duration: 0.3 }}
        // >
        //   {children}
        // </motion.div>
  );
};

export default PageTransition;
