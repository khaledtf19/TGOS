import classes from "./Layout.module.css";
import { Navbar } from "../navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const Layout = ({ children, router }) => {
  return (
    <>
      <Navbar />
      <main>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className=""
            key={router.route}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classes.page__container}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
};
