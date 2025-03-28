import React, { useRef, useState } from "react";
import { Clock, MapPin, Mail, Phone, MapPin as LocationIcon, Send, Apple } from "lucide-react";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Card component with follow effect
function FollowCard({ children, className = "" }) {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);
  
    const x = useMotionValue(0);
    const y = useMotionValue(0);
  
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  
    const rotateX = useTransform(mouseY, [-50, 50], [5, -5]);
    const rotateY = useTransform(mouseX, [-50, 50], [-5, 5]);
  
    function handleMouseMove(e) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
  
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    }
  
    function handleMouseLeave() {
      x.set(0);
      y.set(0);
      setHovered(false);
    }
    
    // This return statement was missing
    return (
      <motion.div
        ref={ref}
        className={`relative ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          style={{
            rotateX: hovered ? rotateX : 0,
            rotateY: hovered ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
        >
          {children}
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
function VenueCard({ image, name, time, type, emoji, className = "" }) {
  return (
    <div className={`${className} bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 transform`}>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-bold text-base text-black">{name}</h3>
            <div className="flex items-center text-gray-500 mt-1 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              <span>{time} min away</span>
            </div>
            {emoji && type && (
              <div className="mt-1 inline-flex items-center">
                <span className="mr-1">{emoji}</span> {type}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-black text-white p-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer">
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

// QR Code Component
function QRCodeCard({ className = "" }) {
    return (
      <div className={`${className} absolute bottom-16 right-8 z-40 flex items-center gap-3 bg-white rounded-2xl p-3 shadow-xl`}>
        <div className="w-12 h-12 flex-shrink-0">
          {/* QR code image */}
          <img 
            src={"http://framerusercontent.com/images/otCBeY8GyF7tDbVESacgSucg.png?scale-down-to=512"} 
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

// App Screen Component
function AppScreen({ image, alt, className = "", width = "auto" }) {
  return (
    
    <div className={`${className} overflow-hidden rounded-3xl shadow-2xl`}>
      <img 
        src={image} 
        alt={alt} 
        width={width} 
        className="w-full h-auto" 
      />
    </div>
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
  return (
    <div className="min-h-screen bg-black text-white">
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
              {/* Main App Screen - Set Location */}
              <FollowCard>
              <AppScreen 
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Simulator%20Screenshot%20-%20iPhone%2016%20Plus%20-%202025-03-24%20at%2023.02.59-WPEMLI0GQCZcs6NFZ7TxCkgDPfrO6o.png"
                alt="Set meeting point interface"
                className="absolute right-0 top-0 w-60 transform rotate-[2deg] z-20"
              />

              {/* Secondary App Screen - Map View */}
              <AppScreen 
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Simulator%20Screenshot%20-%20iPhone%2016%20Plus%20-%202025-03-24%20at%2023.03.41-8tVWKuWU6bglTPa32JhlUZiGqCm3hf.png"
                alt="Map view with meeting points"
                className="absolute right-32 bottom-0 w-72 z-10"
              />

              {/* Venue Card - Washington Square */}
              <VenueCard
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4-iutEQRGewfHs6hzJyGt0v6G7RTtnlL.png"
                name="Washington Square Park"
                time="22"
                type="Park"
                emoji="🌳"
                className="absolute left-0 top-20 w-64 z-30 rotate-[-5deg]"
              />

              {/* Venue Card - Grand Street */}
              <VenueCard
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3-DOeYjRPfqMC1BqBHFQnvWcrbleXgfb.png"
                name="Grand Street"
                time="17"
                type="Metro"
                emoji="🚇"
                className="absolute left-40 top-40 w-64 transform rotate-[3deg] z-30"
              />

              {/* Venue Card - Izakaya */}
              <VenueCard
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1-G6j41V3tdc1L3YMtrP8dgJ2KDFKO9n.png"
                name="Izakaya Toribar"
                time="22"
                type="Restaurants"
                emoji="🍽️"
                className="absolute right-0 bottom-80 w-64 transform rotate-[8deg] z-30"
              />

              {/* Let's Meet Card */}
              <LetsMeetCard 
                className="absolute left-20 bottom-0 w-48 z-30"
              />

              {/* Decorative Elements */}
              <div className="absolute top-10 right-0 text-blue-400 text-2xl">✦</div>
              <div className="absolute bottom-40 left-40 text-green-400 text-2xl">✦</div>

              </FollowCard>
            </div>
          </div>
        </div>

        {/* QR Code at bottom left */}
        <QRCodeCard className="absolute  z-40" />
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
          <h1 className="text-5xl font-bold mb-8 tracking-tight">Contact Us</h1>
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
            <a href="#" className="hover:text-gray-300 transition-colors">Jobs</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Blog</a>
            <a href="#" className="hover:text-gray-300 transition-colors">About</a>
            <a 
              href="#" 
              className="hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
              }}
            >
              Contact
            </a>
            <Button icon={<AppleIcon />}>Download App</Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {currentPage === 'home' ? <HomePage /> : <ContactPage />}

      {/* Footer */}
      <footer className="py-6 px-8 border-t border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">What's New</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
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