import { motion } from "framer-motion";

const Contact = () => {
    return (
      <div id="contact" className="pt-6 pb-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Email me</h2>
        <p className="text-gray-300 mb-6">
          Want to collaborate or chat about an opportunity? Let's connect.
        </p>
        <a
          href="mailto:tanner.galambas@gmail.com"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-200"
        >
          Say Hello
        </a>
      </div>
    );
  };
  
  export default Contact;