import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";

function FlipCard({ front, back, className = "", depth = 6 }) {
  // Track whether the card is flipped
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Animation controls for more complex animations
  const controls = useAnimation();
  
  // Values for subtle hover effects
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  
  // Configure smoother springs for subtle movements
  const springConfig = { 
    type: "spring",
    damping: 20, 
    stiffness: 300,
    mass: 0.5
  };
  
  // Smooth values with springs
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);
  
  // Handle mouse movements for subtle 3D effect
  const handleMouseMove = (e) => {
    if (isFlipped) return; // Disable tilt effect while flipping
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate center point
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    
    // Calculate mouse position relative to center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Set rotation values (limit to small range for subtle effect)
    x.set(mouseX / 30);
    y.set(mouseY / 30);
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovering(false);
  };
  
  // Handle card flip
  const handleFlip = () => {
    // Reset any tilt before flipping
    x.set(0);
    y.set(0);
    
    // Play flip animation
    setIsFlipped(!isFlipped);
    
    // Add subtle float animation when flipped
    if (!isFlipped) {
      controls.start({
        y: [0, -10, 0],
        transition: { duration: 0.8, ease: "easeInOut" }
      });
    }
  };
  
  // Visual indicator animation (pulsing glow)
  useEffect(() => {
    if (isHovering && !isFlipped) {
      controls.start({
        boxShadow: [
          "0px 0px 0px rgba(255, 255, 255, 0.3)",
          "0px 0px 20px rgba(255, 255, 255, 0.5)",
          "0px 0px 0px rgba(255, 255, 255, 0.3)"
        ],
        transition: { 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    } else {
      controls.stop();
      controls.set({ boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)" });
    }
  }, [isHovering, isFlipped, controls]);

  return (
    <div 
      className={`relative w-full h-full ${className}`} 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Flip indicator icon that appears on hover */}
      {isHovering && !isFlipped && (
        <div className="absolute top-4 right-4 z-50 animate-pulse">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/80 drop-shadow-lg"
          >
            <path 
              d="M7 8L3 12L7 16M17 8L21 12L17 16" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      
      <motion.div
        className="perspective-1000 w-full h-full relative cursor-pointer"
        style={{ 
          perspective: 1200,
          transformStyle: "preserve-3d",
        }}
        onClick={handleFlip}
        animate={controls}
      >
        {/* The card container with 3D rotation */}
        <motion.div
          className="w-full h-full relative"
          style={{
            transformStyle: "preserve-3d",
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 180 : rotateY,
          }}
          animate={{ 
            rotateY: isFlipped ? 180 : 0,
            z: isFlipped ? depth * 5 : 0, // Float up when flipped
          }}
          transition={{ 
            type: "spring", 
            damping: 15, 
            stiffness: 120, 
            mass: 1,
            duration: 0.6
          }}
        >
          {/* Front side */}
          <motion.div
            className="absolute w-full h-full rounded-3xl overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              zIndex: isFlipped ? 0 : 1
            }}
          >
            <div className={`w-full h-full depth-${depth}`}>
              {front}
            </div>
          </motion.div>

          {/* Back side */}
          <motion.div
            className="absolute w-full h-full rounded-3xl overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              rotateY: 180,
              zIndex: isFlipped ? 1 : 0
            }}
          >
            <div className={`w-full h-full depth-${depth}`}>
              {back}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default FlipCard;