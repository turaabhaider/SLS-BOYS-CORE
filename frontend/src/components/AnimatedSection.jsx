import { motion } from 'framer-motion';

const AnimatedSection = ({ children, delay = 0, float = true }) => {
  return (
    <motion.div
      // 1. Initial state: Invisible and slightly lower
      initial={{ opacity: 0, y: 30 }}
      
      // 2. Entrance: Slide up and fade in when the user scrolls to it
      whileInView={{ 
        opacity: 1, 
        y: 0 
      }}
      
      // 3. The Continuous Loop: Only starts AFTER entrance
      // We use a transition object to define the infinite loop
      animate={float ? {
        y: [0, -12, 0], // Subtle vertical drift
      } : {}}
      
      viewport={{ once: true, margin: "-50px" }} // Triggers slightly before reaching the element
      
      transition={{
        // Entrance settings
        opacity: { duration: 1, delay: delay },
        y: float ? {
          // This handles the infinite floating loop
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.8, // Start floating after entrance finishes
        } : { 
          // This handles standard entrance if floating is off
          duration: 0.8, 
          delay: delay, 
          ease: [0.16, 1, 0.3, 1] 
        }
      }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;