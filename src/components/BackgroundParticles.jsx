import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const BackgroundParticles = () => {
  const [particles, setParticles] = useState([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const total = reduceMotion ? 12 : 36;
      for (let i = 0; i < total; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: reduceMotion ? Math.random() * 3 + 1 : Math.random() * 4 + 2,
          animationDelay: Math.random() * 4,
          duration: reduceMotion ? Math.random() * 2 + 4 : Math.random() * 3 + 2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [reduceMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={
            reduceMotion
              ? { opacity: 0.15 }
              : {
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.animationDelay,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;
