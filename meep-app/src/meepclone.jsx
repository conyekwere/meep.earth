import React, { useRef, useState, useEffect } from "react";
import { Clock, MapPin, Apple } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Add global styles for the 3D card effects
const globalStyles = `
  .card-wrap {
    transform-style: preserve-3d;
    transition: all 0.5s ease;
  }
  
  .card {
    position: relative;
    transform-style: preserve-3d;
    border-radius: 16px;
    transition: all 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
  
  .parallax-bg {
    transform-style: preserve-3d;
    transition: all 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
  
  .content {
    transform-style: preserve-3d;
  }
  
  /* Add depth to elements */
  .depth-1 { transform: translateZ(20px); }
  .depth-2 { transform: translateZ(40px); }
  .depth-3 { transform: translateZ(60px); }
  .depth-4 { transform: translateZ(80px); }
  
  /* Add reverse parallax effect */
  .parallax-reverse { transform: translateZ(-20px); }
`;

// Apple Icon Component
function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
      <path d="M17.0405 12.0141C16.9967 9.37384 19.0405 8.05429 19.1357 7.99407C17.6967 5.84384 15.4733 5.56862 14.6967 5.55384C12.8421 5.37362 11.0499 6.65895 10.1063 6.65895C9.14267 6.65895 7.68001 5.56862 6.10801 5.60296C4.10001 5.63729 2.23201 6.72763 1.21201 8.42208C-0.891994 11.8797 0.693341 17.0109 2.70834 19.6168C3.70701 20.8939 4.87267 22.327 6.36168 22.2582C7.80901 22.1808 8.36568 21.2905 10.1063 21.2905C11.8297 21.2905 12.353 22.2582 13.8733 22.2152C15.435 22.1808 16.4423 20.9208 17.4067 19.6383C18.5467 18.1566 19.0147 16.6976 19.0405 16.6203C19.0061 16.6073 17.0893 15.8834 17.0405 12.0141Z" fill="currentColor" />
      <path d="M14.4124 3.38302C15.2384 2.37024 15.7924 1.00268 15.6494 -0.373535C14.4901 -0.264891 13.059 0.481823 12.1975 1.46815C11.4357 2.34391 10.7715 3.76169 10.9329 5.08124C12.2311 5.24147 13.5562 4.38935 14.4124 3.38302Z" fill="currentColor" />
    </svg>
  );
}

// Enhanced FollowCard component with 3D effect and parallax
function FollowCard({ children, className = "" }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Use cubic-bezier for more natural easing
  const springConfig = { 
    type: "spring",
    damping: 15, 
    stiffness: 150,
    mass: 0.5
  };
  
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Increase rotation range for more dramatic effect
  const rotateX = useTransform(mouseY, [-height/2, height/2], [15, -15]);
  const rotateY = useTransform(mouseX, [-width/2, width/2], [-15, 15]);
  
  // Add parallax effect for background elements
  const translateX = useTransform(mouseX, [-width/2, width/2], [-20, 20]);
  const translateY = useTransform(mouseY, [-height/2, height/2], [-20, 20]);
  
  React.useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }
    
    // Handle window resize
    function handleResize() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
      }
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    x.set(e.clientX - rect.left - width/2);
    y.set(e.clientY - rect.top - height/2);
  }

  function handleMouseLeave() {
    // Add delay and smoother transition
    const delay = setTimeout(() => {
      x.set(0);
      y.set(0);
      setHovered(false);
    }, 100);
    
    return () => clearTimeout(delay);
  }

  return (
    <motion.div
      ref={ref}
      className={`card-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
        cursor: "pointer",
      }}
    >
      <motion.div
        className="card"
        style={{
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          transition: hovered ? "none" : "all 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)",
          boxShadow: hovered 
            ? "rgba(255, 255, 255, 0.2) 0 0 40px 5px, rgba(255, 255, 255, 1) 0 0 0 1px, rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset white 0 0 0 6px"
            : "rgba(0, 0, 0, 0.3) 0 10px 30px 0"
        }}
      >
        {/* Background elements with parallax effect */}
        <motion.div
          className="parallax-bg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            pointerEvents: "none",
            translateX: hovered ? translateX : 0,
            translateY: hovered ? translateY : 0,
            transition: hovered ? "none" : "all 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)"
          }}
        />
        
        {/* Content */}
        <motion.div 
          className="content" 
          style={{ 
            position: "relative", 
            zIndex: 1,
            transformStyle: "preserve-3d"
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Custom EmojiIndicator Component using provided image assets
function EmojiIndicator({ imageUrl, position = "top-right", isHovered = false, size = 44 }) {
  // Define positions for the emoji indicator
  const positions = {
    "top-right": "top-0 right-0 translate-x-1/3 -translate-y-1/3",
    "top-left": "top-0 left-0 -translate-x-1/3 -translate-y-1/3",
    "bottom-right": "bottom-0 right-0 translate-x-1/3 translate-y-1/3",
    "bottom-left": "bottom-0 left-0 -translate-x-1/3 translate-y-1/3"
  };
  
  return (
    <motion.div 
      className={`absolute ${positions[position]} bg-white rounded-full p-1 shadow-lg z-40 depth-4`}
      initial={{ scale: 0.8, opacity: 0.8 }}
      animate={{ 
        scale: isHovered ? 1.1 : 1,
        opacity: 1,
        y: isHovered ? -5 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      <img 
        src={imageUrl} 
        alt="Venue type indicator" 
        width={size} 
        height={size} 
        className="w-auto h-auto"
      />
    </motion.div>
  );
}

// Venue Card Component
function VenueCard({ image, name, time, type, emojiImage, className = "" }) {
  // Add state for card hover
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`${className} bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 transform transition-all duration-300 relative`}
      style={{
        boxShadow: isHovered 
          ? "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
          : "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        transform: isHovered 
          ? "translateY(-5px)" 
          : "translateY(0px)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Add emoji indicator if emojiImage is provided */}
      {emojiImage && <EmojiIndicator imageUrl={emojiImage} position="top-right" isHovered={isHovered} />}
      
      <div className="p-4">
        <div className="flex gap-3">
          <img
            src={image || "/api/placeholder/40/40"}
            alt={name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-bold text-base text-black">{name}</h3>
            <div className="flex items-center text-gray-500 mt-1 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              <span>{time} min away</span>
            </div>
            {type && (
              <div className="mt-1 inline-flex items-center text-xs text-gray-600">
                {type}
              </div>
            )}
          </div>
        </div>
      </div>
      <div 
        className={`bg-black text-white p-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer`}
        style={{
          background: isHovered ? "linear-gradient(to right, #1a1a1a, #333)" : "black"
        }}
      >
        <MapPin className="w-4 h-4" />
        <span className="text-sm font-medium">Get Directions</span>
      </div>
    </div>
  );
}

// Let's Meet Card
function LetsMeetCard({ className = "" }) {
  return (
    <div className={`${className} bg-white rounded-2xl overflow-hidden shadow-xl p-4 text-black transform rotate-[5deg]`}>
      <p className="font-bold text-lg mb-2">Let's meet</p>
      <div className="bg-black text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 text-sm">
        <MapPin className="w-4 h-4" />
        <span>6min away</span>
      </div>
    </div>
  );
}

// App Screen Component
function AppScreen({ image, alt, className = "" }) {
  return (
    <div className={`${className} overflow-hidden rounded-3xl shadow-2xl`}>
      <img 
        src={image || "/api/placeholder/400/800"} 
        alt={alt} 
        className="w-full h-auto" 
      />
    </div>
  );
}

// Main Button Component
function Button({ children, variant = "primary", className = "", icon = null }) {
  const styles = {
    primary: "bg-white hover:bg-gray-100 text-black font-medium",
    secondary: "bg-transparent border border-white hover:bg-white/10 text-white font-medium",
  };

  return (
    <button className={`${styles[variant]} px-8 py-4 rounded-full flex items-center justify-center ${className}`}>
      {icon}
      {children}
    </button>
  );
}

// QR Code Component
function QRCodeCard({ className = "" }) {
  return (
    <div className={`${className} flex items-center gap-3 bg-white rounded-2xl p-3 shadow-xl`}>
      <div className="w-12 h-12 flex-shrink-0">
        <img 
          src="/api/placeholder/48/48" 
          alt="QR code to download Meep app" 
          className="w-full h-auto" 
        />
      </div>
      <div>
        <p className="font-medium text-black text-sm">Get the app now</p>
      </div>
    </div>
  );
}

// Home Page Component
function HomePage() {
  // State for active app screen
  const [activeScreen, setActiveScreen] = useState('map'); // 'map' or 'location'
  
  // Function to toggle between screens
  const toggleScreen = () => {
    setActiveScreen(activeScreen === 'map' ? 'location' : 'map');
  };
  
  // Auto-toggle screens every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      toggleScreen();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeScreen]);
  
  return (
    <div className="bg-black text-white">
      {/* Main Hero Section */}
      <main className="py-20 px-8 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-16">
            {/* Left Content - Text */}
            <div className="lg:w-1/2">
              <h1 className="text-6xl font-bold leading-tight tracking-tight mb-6">
                Smarter
                <br />
                meeting points
                <br />
                <span className="bg-gradient-to-r from-green-500 to-teal-400 text-transparent bg-clip-text">
                  start here.
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 max-w-md">
                Find the ideal location between you and your friends, no guesswork needed.
              </p>

              <div className="flex gap-4">
                <Button icon={<AppleIcon />}>Download App</Button>
                <Button variant="secondary">Advertise on Meep</Button>
              </div>
            </div>

            {/* Right Content - Phone Screenshots and Cards */}
            <div className="lg:w-1/2 relative h-[600px]">
              {/* Main content with 3D effect */}
              <FollowCard className="w-full h-full">
                {/* Parallax background elements */}
                <div className="parallax-bg">
                  <div className="absolute top-10 right-0 text-blue-400 text-2xl parallax-reverse">✦</div>
                  <div className="absolute top-40 left-40 text-green-400 text-2xl parallax-reverse">✦</div>
                  <div className="absolute bottom-20 right-20 text-purple-400 text-2xl parallax-reverse">✦</div>
                </div>
                
                <div className="content">
                  {/* App Screen - Location Setting */}
                  <AppScreen 
                    image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Simulator%20Screenshot%20-%20iPhone%2016%20Plus%20-%202025-03-24%20at%2023.02.59-WPEMLI0GQCZcs6NFZ7TxCkgDPfrO6o.png"
                    alt="Set meeting point interface"
                    className="absolute right-20 top-0 w-64 transform rotate-[2deg] depth-2"
                    isActive={activeScreen === 'location'}
                  />

                  {/* App Screen - Map View */}
                  <AppScreen 
                    image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Simulator%20Screenshot%20-%20iPhone%2016%20Plus%20-%202025-03-24%20at%2023.03.41-8tVWKuWU6bglTPa32JhlUZiGqCm3hf.png"
                    alt="Map view with meeting points"
                    className="absolute right-20 top-0 w-64 depth-2"
                    isActive={activeScreen === 'map'}
                  />

                  {/* Additional floating emoji indicators using custom images */}
                  <motion.div 
                    className="absolute left-24 top-8 z-50 bg-white rounded-full p-1 shadow-lg depth-4"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ECW9CxGaV0gga9kZmcNIX4qqPkvPtg.png" 
                      alt="Food emoji" 
                      width={15} 
                      height={15} 
                      className="w-auto h-auto"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute right-36 top-32 z-50 bg-white rounded-full p-1 shadow-lg depth-4"
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2q7TGSGt47nkaouGs0DwB9h0gg6eix.png" 
                      alt="Coffee emoji" 
                      width={15} 
                      height={44}
                      className="w-auto h-auto" 
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute left-64 bottom-40 z-50 bg-white rounded-full p-1 shadow-lg depth-4"
                    animate={{ 
                      y: [0, -7, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JBbuSJn72ovTW1nABeBSEWfsNKbEB0.png" 
                      alt="Beer emoji" 
                      width={15} 
                      height={15}
                      className="w-auto h-auto" 
                    />
                  </motion.div>

                  {/* Venue Card - Washington Square */}
                  <VenueCard
                    image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2q7TGSGt47nkaouGs0DwB9h0gg6eix.png"
                    name="Washington Square Park"
                    time="22"
                    type="Park"
                    emojiImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2q7TGSGt47nkaouGs0DwB9h0gg6eix.png"
                    className="absolute left-0 top-20 w-64 z-30 rotate-[-5deg] depth-3"
                  />

                  {/* Venue Card - Grand Street */}
                  <VenueCard
                    image="/api/placeholder/40/40"
                    name="Grand Street"
                    time="17"
                    type="Metro"
                    emojiImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JBbuSJn72ovTW1nABeBSEWfsNKbEB0.png"
                    className="absolute left-40 top-40 w-64 transform rotate-[3deg] z-30 depth-2"
                  />

                  {/* Venue Card - Izakaya */}
                  <VenueCard
                    image="/api/placeholder/40/40"
                    name="Izakaya Toribar"
                    time="22"
                    type="Restaurants"
                    emojiImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ECW9CxGaV0gga9kZmcNIX4qqPkvPtg.png"
                    className="absolute right-0 top-40 w-64 transform rotate-[8deg] z-30 depth-4"
                  />

                  {/* Let's Meet Card */}
                  <LetsMeetCard 
                    className="absolute left-20 bottom-0 w-48 z-30 depth-3"
                  />
                </div>
              </FollowCard>
            </div>
          </div>
        </div>

        {/* QR Code at bottom */}
        <QRCodeCard className="absolute bottom-16 left-8 z-40" />
      </main>
    </div>
  );
}

// Main App Component (simplified to show just the homepage)
function MeepHomepage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Add global styles */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      {/* Header */}
      <header className="py-6 px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="/api/placeholder/30/30"
              alt="Meep logo"
              className="rounded-full"
            />
            <span className="font-medium text-xl">Meep</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-gray-300 transition-colors">Jobs</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Blog</a>
            <a href="#" className="hover:text-gray-300 transition-colors">About</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
            <Button icon={<AppleIcon />}>Download App</Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <HomePage />

      {/* Footer */}
      <footer className="py-6 px-8 border-t border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">What's New</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 Meep
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MeepHomepage;