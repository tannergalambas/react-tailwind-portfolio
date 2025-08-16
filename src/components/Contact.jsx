import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      className="py-16 px-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-semibold mb-4">Get In Touch</h2>
      <p className="text-gray-700 mb-6">
        Want to collaborate or chat about an opportunity? Let's connect.
      </p>
      <a
        href="mailto:tanner.galambas@gmail.com"
        className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
      >
        Say Hello
      </a>
    </motion.div>
  );
};

export default Contact;