import React, { useRef, useState, useEffect } from "react";
import FlipCard from "./FlipCard";
import { Clock, MapPin, Mail, Phone, MapPin as LocationIcon, Send, Apple } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";


// Add global styles for the 3D card effects
const globalStyles = `
  .card-wrap {
    transform-style: preserve-3d;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    will-change: transform; /* Performance optimization */
  }
  
  .card {
    position: relative;
    transform-style: preserve-3d;
    border-radius: 16px;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    will-change: transform, box-shadow; /* Performance optimization */
    backface-visibility: hidden; /* Prevents flickering */
  }
  
  .parallax-bg {
    transform-style: preserve-3d;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    will-change: transform; /* Performance optimization */
    backface-visibility: hidden; /* Prevents flickering */
  }
  
  .content {
    transform-style: preserve-3d;
    will-change: transform; /* Performance optimization */
  }
  
  /* Enhanced depth layers with smoother transitions */
  .depth-1 { 
    transform: translateZ(20px);
    transition: transform 0.3s ease;
  }
  .depth-2 { 
    transform: translateZ(40px);
    transition: transform 0.3s ease;
  }
  .depth-3 { 
    transform: translateZ(60px);
    transition: transform 0.3s ease;
  }
  .depth-4 { 
    transform: translateZ(80px);
    transition: transform 0.3s ease;
  }
  .depth-5 { 
    transform: translateZ(100px);
    transition: transform 0.3s ease;
  }
  .depth-6 { 
    transform: translateZ(120px);
    transition: transform 0.3s ease;
  }


  .depth-rotate-1{
     transform: translateZ(20px) rotate(12deg);
     transition: transform 0.3s ease;
  }
 .depth-rotate-2{
    transform: translateZ(20px) rotate(-24deg);
    transition: transform 0.3s ease;
  }
  
  /* Enhanced parallax with different movement rates */
  .parallax-slow { transform: translateZ(-10px); }
  .parallax-medium { transform: translateZ(-20px); }
  .parallax-fast { transform: translateZ(-30px); }
  
  /* Hardware acceleration for smoother animations */
  .card-wrap, .card, .parallax-bg, .content, [class^="depth-"] {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-perspective: 1000px;
    perspective: 1000px;
  }
`;



function FollowCardWithFlip() {
    // State to track which app screen should be active initially
    const [activeAppIndex, setActiveAppIndex] = useState(0);
    
    // Images for the app screens
    const appScreens = [
      {
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Simulator%20Screenshot%20-%20iPhone%2016%20Plus%20-%202025-03-24%20at%2023.03.41-8tVWKuWU6bglTPa32JhlUZiGqCm3hf.png",
        alt: "Map view",
        title: "Find meeting points"
      },
      {
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Simulator%20Screenshot%20-%20iPhone%2016%20Plus%20-%202025-03-24%20at%2023.02.59-WPEMLI0GQCZcs6NFZ7TxCkgDPfrO6o.png",
        alt: "Location setting",
        title: "Set your location"
      }
    ];
    
    // Auto-swap views every 5 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveAppIndex((prev) => (prev === 0 ? 1 : 0));
      }, 5000);
      
      return () => clearInterval(interval);
    }, []);
    
    // Create parallax background elements
    const ParallaxBg = () => (
      <>
        <div className="absolute top-10 left-10 text-blue-400 text-3xl parallax-fast depth-1">✦</div>
        <div className="absolute bottom-10 right-10 text-green-400 text-2xl parallax-medium depth-2">✦</div>
        <div className="absolute top-1/2 right-20 text-purple-400 text-xl parallax-slow depth-3">✦</div>
      </>
    );
    
    // Create animated label for the card
    const AnimatedLabel = ({ title, isActive }) => (
      <motion.div 
        className="absolute -bottom-12 left-0 right-0 text-center text-white font-medium"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isActive ? 1 : 0.6, 
          y: isActive ? 0 : -5,
          scale: isActive ? 1 : 0.95
        }}
        transition={{ duration: 0.4 }}
      >
        {title}
      </motion.div>
    );
    
    // Create the front view
    const FrontView = () => (
      <div className="relative w-full h-full overflow-hidden">
        <ParallaxBg />
        <AppScreen 
          image={appScreens[0].image}
          alt={appScreens[0].alt}
          className="w-full h-full"
          isActive={true}
        />
        <AnimatedLabel title={appScreens[0].title} isActive={activeAppIndex === 0} />
      </div>
    );
    
    // Create the back view
    const BackView = () => (
      <div className="relative w-full h-full overflow-hidden">
        <ParallaxBg />
        <AppScreen 
          image={appScreens[1].image}
          alt={appScreens[1].alt}
          className="w-full h-full"
          isActive={true}
        />
        <AnimatedLabel title={appScreens[1].title} isActive={activeAppIndex === 1} />
      </div>
    );
    
    return (
      <FollowCard className="w-80 h-[600px]">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-[85%] relative">
            <FlipCard
              front={<FrontView />}
              back={<BackView />}
              depth={5}
            />
          </div>
        </div>
      </FollowCard>
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
  
    // Enhanced spring configuration for ultra-smooth parallax
    const springConfig = { 
      type: "spring",
      damping: 20, 
      stiffness: 120,
      mass: 0.8,
      restSpeed: 0.001,
      restDelta: 0.001
    };
    
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);
  
    // Optimized rotation range for smoother effect
    const rotateX = useTransform(mouseY, [-height/2, height/2], [10, -10]);
    const rotateY = useTransform(mouseX, [-width/2, width/2], [-10, 10]);
    
    // Enhanced parallax effect for background elements with improved smoothness
    const translateX = useTransform(mouseX, [-width/2, width/2], [-15, 15]);
    const translateY = useTransform(mouseY, [-height/2, height/2], [-15, 15]);
    
    // Secondary parallax layers with different movement rates
    const translateXSlow = useTransform(mouseX, [-width/2, width/2], [-8, 8]);
    const translateYSlow = useTransform(mouseY, [-height/2, height/2], [-8, 8]);
    
    const translateXFast = useTransform(mouseX, [-width/2, width/2], [-25, 25]);
    const translateYFast = useTransform(mouseY, [-height/2, height/2], [-25, 25]);
    
    React.useEffect(() => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
      }
      
      // Debounced resize handler for better performance
      let resizeTimer;
      function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (ref.current) {
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
          }
        }, 100);
      }
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimer);
      }
    }, []);
  
    // Optimized mouse tracking with rate limiting
    function handleMouseMove(e) {
      if (!ref.current) return;
      
      requestAnimationFrame(() => {
        const rect = ref.current.getBoundingClientRect();
        
        // Calculate mouse position relative to card center
        const newX = e.clientX - rect.left - width/2;
        const newY = e.clientY - rect.top - height/2;
        
        // Apply smoothing to mouse input itself
        x.set(newX);
        y.set(newY);
      });
    }
  
    // Enhanced transition timing for smoother exit
    function handleMouseLeave() {
      // Smoother transition out with a gentle easing curve
      x.set(0, {
        type: "spring",
        damping: 25,
        stiffness: 200,
      });
      
      y.set(0, {
        type: "spring",
        damping: 25,
        stiffness: 200,
      });
      
      setHovered(false);
    }
  
    return (
      <motion.div
        ref={ref}
        className={`w-1/2 card-wrap ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000, // Increased perspective for more pronounced effect
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
            transition: hovered 
              ? "none" 
              : "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)", // Enhanced bezier curve for better easing
          }}
        >
          {/* Multiple background elements with different parallax depths */}
          <motion.div
            className="parallax-bg parallax-slow"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              pointerEvents: "none",
              translateX: hovered ? translateXSlow : 0,
              translateY: hovered ? translateYSlow : 0,
              transition: hovered ? "none" : "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
            }}
          />
          
          <motion.div
            className="parallax-bg parallax-medium"
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
              transition: hovered ? "none" : "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
            }}
          />
          
          <motion.div
            className="parallax-bg parallax-fast"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              pointerEvents: "none",
              translateX: hovered ? translateXFast : 0,
              translateY: hovered ? translateYFast : 0,
              transition: hovered ? "none" : "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
            }}
          />
          
          {/* Content with enhanced transition */}
          <motion.div 
            className="content" 
            style={{ 
              position: "relative", 
              zIndex: 1,
              transformStyle: "preserve-3d",
              transition: hovered ? "none" : "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

// Apple Icon Component
function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
      <path d="M17.0405 12.0141C16.9967 9.37384 19.0405 8.05429 19.1357 7.99407C17.6967 5.84384 15.4733 5.56862 14.6967 5.55384C12.8421 5.37362 11.0499 6.65895 10.1063 6.65895C9.14267 6.65895 7.68001 5.56862 6.10801 5.60296C4.10001 5.63729 2.23201 6.72763 1.21201 8.42208C-0.891994 11.8797 0.693341 17.0109 2.70834 19.6168C3.70701 20.8939 4.87267 22.327 6.36168 22.2582C7.80901 22.1808 8.36568 21.2905 10.1063 21.2905C11.8297 21.2905 12.353 22.2582 13.8733 22.2152C15.435 22.1808 16.4423 20.9208 17.4067 19.6383C18.5467 18.1566 19.0147 16.6976 19.0405 16.6203C19.0061 16.6073 17.0893 15.8834 17.0405 12.0141Z" fill="currentColor" />
      <path d="M14.4124 3.38302C15.2384 2.37024 15.7924 1.00268 15.6494 -0.373535C14.4901 -0.264891 13.059 0.481823 12.1975 1.46815C11.4357 2.34391 10.7715 3.76169 10.9329 5.08124C12.2311 5.24147 13.5562 4.38935 14.4124 3.38302Z" fill="currentColor" />
    </svg>
  );
}


// Venue Card Component
const VenueCard = ({ image, name, time, type, emojiImage, className = "" }) => {
    // State for 3D and hover effects
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    
    // Effect to get card dimensions
    useEffect(() => {
      if (cardRef.current) {
        setWidth(cardRef.current.offsetWidth);
        setHeight(cardRef.current.offsetHeight);
      }
      
      // Handle window resize
      const handleResize = () => {
        if (cardRef.current) {
          setWidth(cardRef.current.offsetWidth);
          setHeight(cardRef.current.offsetHeight);
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Mouse event handlers
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to card center
      const x = e.clientX - rect.left - width/2;
      const y = e.clientY - rect.top - height/2;
      
      setMouseX(x);
      setMouseY(y);
    };
    
    // Calculate card rotation and shadows based on mouse position
    const rotateY = isHovered ? mouseX / (width/2) * 10 : 0;
    const rotateX = isHovered ? -mouseY / (height/2) * 10 : 0;
    const translateZ = isHovered ? 20 : 0;
    
    // Shadow intensity based on mouse position
    const shadowBlur = isHovered ? 25 : 10;
    const shadowOffset = isHovered ? 15 : 5;
    
    return (
      <div 
        ref={cardRef}
        className={`${className} relative transform transition-all duration-300`}
        style={{
          perspective: "800px",
          transformStyle: "preserve-3d"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMouseX(0);
          setMouseY(0);
        }}
        onMouseMove={handleMouseMove}
      >

        {/* Floating emoji indicator */}
        {emojiImage && (
            <div 
                style={{
                transform: isHovered ? `translateZ(30px) translateX(${mouseX * 0.05}px) translateY(${mouseY * 0.05}px)` : "translateZ(0)",
                transformStyle: "preserve-3d"
                }}
                className={`absolute  z-10 transform transition-all duration-300 ${
                type === "Park" ? "left-2 -top-2" : 
                type === "Bar" ? "right-6 top-4" : 
                type === "Restaurant" ? "right-8 -top-4" : "right-6 -top-4"
                }`}
            >
                <img 
                src={emojiImage}
                alt="Venue type"
                width={40}
                height={40}
                className={`filter drop-shadow-lg ${
                    type === "Park" ? "depth-rotate-1" : 
                    type === "Bar" ? "depth-rotate-1" : 
                    type === "Restaurant" ? "depth-rotate-2" : "depth-rotate-2"
                }`}
                />
            </div>
        )}

        {/* Card container with 3D transforms */}
        <div
          className="bg-black rounded-2xl overflow-hidden shadow-xl border border-gray-700 transform transition-all duration-300 relative"
          style={{
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
            boxShadow: isHovered 
              ? `rgba(0, 0, 0, 0.3) 0px ${shadowOffset}px ${shadowBlur}px 0px, rgba(0, 0, 0, 0.2) 0px 1px 3px 0px` 
              : "rgba(0, 0, 0, 0.2) 0px 4px 12px",
            transformStyle: "preserve-3d",
            transition: "all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95)",
            height: "180px",
            width:"150px"
          }}
        >

          
          {/* Main image that fills the card */}
          <div
            className="w-full h-full transition-all duration-300 absolute top-0 left-0"
            style={{
              transformStyle: "preserve-3d"
            }}
          >
            <img
              src={image || "/api/placeholder/400/320"}
              alt={name}
              className="w-full h-full object-cover"
              style={{
                filter: "brightness(0.8)"
              }}
            />
            
            {/* Gradient overlay to make text readable */}
            <div 
              className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent opacity-90"
              style={{
                transformStyle: "preserve-3d"
              }}
            />
          </div>
          
          {/* Text content positioned at the bottom of the card */}
          <div
            className="absolute bottom-0 left-0 w-full p-4 text-center text-white z-10 depth-4"
            style={{
              transform: isHovered ? `translateZ(30px) translateX(${mouseX * 0.05}px) translateY(${mouseY * 0.05}px)` : "translateZ(0)",
              transformStyle: "preserve-3d",
              transition: "all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95)"
            }}
          >
            <h3 className="font-bold text-md text-white drop-shadow-lg ">{name}</h3>
            <div className=" items-center text-center text-gray-200 mt-1 text-sm ">
              <span>{time} min away</span>
            </div>
          </div>
          
        </div>
      </div>
    );
  };


// QR Code Component
function QRCodeCard({ className = "" }) {
    return (
      <div className={`${className}  items-center justify-center bottom-0  gap-3 bg-white rounded-[0.5vw] p-2 shadow-xl`}>
        <div className="w-12 h-12 flex-shrink-0">
          {/* QR code image */}
          <img 
            src={"http://framerusercontent.com/images/otCBeY8GyF7tDbVESacgSucg.png?scale-down-to=512"} 
            alt="QR code to download Meep app" 
            className="w-full h-auto" 
          />
        </div>
        <div>
          <p className="font-medium text-black text-sm/7">Get the app now</p>
        </div>
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

// Enhanced AppScreen Component with Toggle Functionality
function AppScreen({ image, alt, className = "", width = "auto", isActive = false }) {
    return (
      <motion.div 
        className={`${className} overflow-hidden rounded-3xl shadow-2xl transition-all duration-500`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.9,
          y: isActive ? 0 : 20,
          visibility: isActive ? "visible" : "hidden"
        }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 150, 
          mass: 0.8,
          duration: 0.5 
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <img 
          src={image} 
          alt={alt} 
          width={width} 
          className="w-full h-auto" 
        />
      </motion.div>
    );
  }
  

// Input Component for Contact Form
function Input({ label, type = "text", placeholder, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-white mb-2 text-sm">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// Textarea Component for Contact Form
function Textarea({ label, placeholder, rows = 4, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-white mb-2 text-sm">{label}</label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
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
    
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Main Hero Section */}
        <main className="py-20 px-8 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center gap-16">
              {/* Left Content - Text */}
              <div className="lg:w-1/2">
                <h1 className="text-6xl font-bold leading-tight tracking-tight mb-6">
                  Smarter meeting points
              
                  <span className=" realtive bg-gradient-to-r  pl-4 from-green-500 to-teal-400 text-transparent bg-clip-text">
                     start here.
                  </span>
                </h1>
  
                <p className="text-xl text-gray-300 mb-10 max-w-md">
                  Find the ideal location between you and your friends, no guesswork needed.
                </p>
  
                <div className="flex gap-4">
                  {/*<Button>Join the Waitlist</Button>*/}
            <a href="https://apps.apple.com/us/app/meep-meet-people-places/id6743687284" target="_blank" rel="noopener noreferrer">
              <Button icon={<AppleIcon />}>Download App</Button> 
            </a>
                  {/* <Button variant="secondary">Advertise on Meep</Button> */}
                </div>
              </div>
  
              {/* Right Content - Phone Screenshots and Cards */}
              <div className="lg:w-1/2  flex items-center justify-center relative h-[600px]">
                {/* Main App Screen - Set Location */}
                <FollowCard>

                  <div className="content">

                  {/* Parallax background elements */}
                  <div className="parallax-bg">
                    <div className="absolute top-10 -right-20 text-blue-400 text-2xl parallax-reverse depth-4">✦</div>
                    <div className="absolute top-40 -left-20 text-green-400 text-2xl parallax-reverse depth-4">✦</div>
                    <div className="absolute -bottom-96  left-10 text-purple-400 text-2xl parallax-reverse depth-4">✦</div>
                  </div>
                      {/* App Screen - Location Setting */}
                    <AppScreen 
                      image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Simulator%20Screenshot%20-%20iPhone%2016%20Plus%20-%202025-03-24%20at%2023.02.59-WPEMLI0GQCZcs6NFZ7TxCkgDPfrO6o.png"
                      alt="Set meeting point interface"
                      className="absolute right-0 -top-16  w-72 transform  depth-5"
                      isActive={activeScreen === 'location'}
                    />
  
                    {/* App Screen - Map View */}
                    <AppScreen 
                      image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Simulator%20Screenshot%20-%20iPhone%2016%20Plus%20-%202025-03-24%20at%2023.03.41-8tVWKuWU6bglTPa32JhlUZiGqCm3hf.png"
                      alt="Map view with meeting points"
                      className="absolute right-0 -top-16 w-72 transform depth-5"
                      isActive={activeScreen === 'map'}
                    />


  
                    {/* Additional floating emoji indicators using custom images */}
  
                    {/* Washington Square Park */}
                    <VenueCard 
                      image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Washington_Square_Arch-Isabella%20%281%29.jpg-Tk9HrgJpEQSaSg5H4DvC6LYKByQW7B.jpeg"
                      name="Washington Square Park"
                      time="16"
                      type="Park"
                      emojiImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2q7TGSGt47nkaouGs0DwB9h0gg6eix.png"
                      className="absolute top-48 right-20   w-48 transform z-30 depth-2"
                    />
  
                    {/* Odd Sister */}
                    <VenueCard
                      image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-POwskuVhjC49iep7kfVJ6mqcBpAh6U.png" 
                      name="Odd Sister"
                      time="12"
                      type="Bar"
                      emojiImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JBbuSJn72ovTW1nABeBSEWfsNKbEB0.png"
                      className="absolute left-72 -top-40 w-40 transform z-30 depth-2"
                    />
  
                    {/* The Butcher's Daughter */}
                    <VenueCard
                      image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-vlada-karpovich-4451741.jpg-iUKohW0D7zeSipXgDaE1jHRG9ZmF2J.jpeg"
                      name="The Butcher's Daughter"
                      time="8"
                      type="Restaurant"
                      emojiImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ECW9CxGaV0gga9kZmcNIX4qqPkvPtg.png"
                      className="absolute left-72 bottom-6 w-40 transform z-30 depth-2"
                    />
                  </div>
                </FollowCard>
              </div>
            </div>
          </div>
  
          {/* QR Code at bottom left */}
          {/* <QRCodeCard className="fixed bottom-24  flex z-40" /> */}
        </main>
      </div>
    );
  }

// Contact Page Component
function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 tracking-tight">Advertise on Meep</h1>
          <p className="text-xl text-gray-300 mb-12">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
              <form>
                <Input label="Name" placeholder="Your name" />
                <Input label="Email" type="email" placeholder="Your email address" />
                <Input label="Subject" placeholder="What's this about?" />
                <Textarea label="Message" placeholder="Tell us what you need help with" rows={6} />
                <Button className="mt-4 px-6 py-3">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-gray-300">hello@meep.earth</p>
                    <p className="text-gray-300">support@meep.earth</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <LocationIcon className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <p className="text-gray-300">123 Meeting Point Ave</p>
                    <p className="text-gray-300">New York, NY 10001</p>
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="font-medium mb-3">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function MeepEarth() {
  const [currentPage, setCurrentPage] = useState('home');

  // Navigation handler
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        :root {
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Segoe UI', 'Helvetica Neue', sans-serif;
        }
        
        body {
          font-family: var(--font-sans);
          letter-spacing: -0.015em;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-sans);
          letter-spacing: -0.025em;
        }
      `}</style>

            {/* Add global styles */}
            <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      {/* Header */}
      <header className="py-6 px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigateTo('home')}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-CTSh56ETSnD9ussJzfSa5Vm8JHsceV.png"
              alt="Meep logo"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="font-medium text-xl">Meep</span>
          </div>

          <div className="flex items-center gap-8">
            {/* <a href="#" className="hover:text-gray-300 transition-colors">Jobs</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Blog</a>
            <a href="#" className="hover:text-gray-300 transition-colors">About</a> */}
            {/* <a 
              href="#" 
              className="hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
              }}
            >
              Advertise on Meep
            </a> */}
            <a href="https://apps.apple.com/us/app/meep-meet-people-places/id6743687284" target="_blank" rel="noopener noreferrer">
              <Button icon={<AppleIcon />}>Download App</Button> 
            </a>
            {/* <Button icon={<AppleIcon />}>Download App</Button>    <Button>Join the Waitlist</Button*/}
            
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {currentPage === 'home' ? <HomePage /> : <ContactPage />}

      {/* Footer */}
      <footer className=" fixed  bottom-0  w-full py-6 px-8 border-t border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            {/* <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">What's New</a>*/}
            <a href="https://tally.so/r/wagLMB" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm">Help</a>
            <a href="#privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a> 
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Meep
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MeepEarth;