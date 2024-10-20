export default NotFound;
import { FaRegSadCry } from "react-icons/fa";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-primary">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.3, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
        className="text-8xl text-secondary drop-shadow-lg"
      >
        <FaRegSadCry />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "easeInOut" }}
        className="text-center mt-6"
      >
        <h1 className="text-6xl font-extrabold text-primary tracking-wide drop-shadow-lg font-poppins">
          404
        </h1>
        <p className="text-2xl text-primary mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
      </motion.div>

      <motion.a
        href="/"
        className="mt-10 px-6 py-3 bg-primary text-background font-semibold text-lg rounded-lg shadow-lg hover:bg-secondary transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Return to Home
      </motion.a>
    </div>
  );
}
