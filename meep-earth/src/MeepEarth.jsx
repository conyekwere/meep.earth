import React, { useRef, useState } from "react";
import { Clock, MapPin } from "lucide-react";
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

// Venue Card Component
function VenueCard({ image, name, time, type, emoji, className = "" }) {
  return (
    <FollowCard className={className}>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 w-full">
        <div className="flex p-3 gap-3">
          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base text-gray-900">{name}</h3>
            <div className="flex items-center text-gray-500 mt-1 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              <span>{time} min away</span>
            </div>
            <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100">
              <span className="mr-1">{emoji}</span> {type}
            </div>
          </div>
        </div>
        <div className="bg-black text-white p-2.5 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Get Directions</span>
        </div>
      </div>
    </FollowCard>
  );
}

// Button Component
function Button({ children, className = "", size = "md", variant = "default" }) {
  const sizeClasses = {
    md: "py-2 px-4",
    lg: "py-3 px-6 h-12",
  };
  
  const variantClasses = {
    default: "bg-black hover:bg-black/90 text-white",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
  };
  
  return (
    <button 
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

// Main App Component
function MeepEarth() {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-6 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-CTSh56ETSnD9ussJzfSa5Vm8JHsceV.png"
              alt="Meep logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-medium text-lg">Meep</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} 
            </div>
            <Button className="bg-black hover:bg-black/90 text-white">Download App</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-CTSh56ETSnD9ussJzfSa5Vm8JHsceV.png"
                  alt="Meep logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-black">
                Perfect
                <br />
                meeting points
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">
                  start here.
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-md">
                Find the ideal spot to meet your friends, halfway between your locations.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-black text-white hover:bg-black/90">
                  Download App
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              {/* Phone Mockup with Map */}
              <FollowCard className="z-10">
                <div className="relative">
                  <div className="rounded-[40px] overflow-hidden border-[12px] border-black shadow-xl">
                    <div className="relative bg-white pt-6 pb-2">
                      {/* Status bar */}
                      <div className="absolute top-0 left-0 right-0 h-6 bg-black flex items-center justify-between px-6">
                        <div className="text-white text-xs">11:03</div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </div>

                      {/* App content - Map */}
                      <div className="pt-4 px-2 relative">
                        {/* Header with back button */}
                        <div className="bg-white rounded-full shadow-md p-2 mb-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15 19L8 12L15 5"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="ml-2">
                              <div className="text-sm font-medium">25 Meeting Points</div>
                              <div className="text-xs text-gray-500">350 Park Ave S, New York, NY 10010</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4 6H20M4 12H20M4 18H20" stroke="black" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>

                        {/* Map */}
                        <div className="relative h-[500px] rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg?height=500&width=280"
                            alt="Map"
                            className="w-full h-full object-cover"
                            style={{ filter: "grayscale(0.2) brightness(1.05)" }}
                          />

                          {/* Filter tabs */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md p-1 flex items-center gap-1">
                            <div className="px-3 py-1 rounded-full bg-gray-200 text-xs font-medium">All</div>
                            <div className="px-3 py-1 rounded-full text-xs font-medium flex items-center">
                              <span className="mr-1">🍽️</span> Restaurant
                            </div>
                            <div className="px-3 py-1 rounded-full text-xs font-medium flex items-center">
                              <span className="mr-1">🍺</span> Bar
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Home indicator */}
                      <div className="w-1/3 h-1 bg-black rounded-full mx-auto mt-2"></div>
                    </div>
                  </div>
                </div>
              </FollowCard>

              {/* Floating Card 1 - Washington Square Park */}
              <VenueCard
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4-iutEQRGewfHs6hzJyGt0v6G7RTtnlL.png"
                name="Washington Square Park"
                time="22"
                type="Park"
                emoji="🌳"
                className="absolute top-20 -left-20 w-64 z-20"
              />

              {/* Floating Card 2 - Grand Street */}
              <VenueCard
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3-DOeYjRPfqMC1BqBHFQnvWcrbleXgfb.png"
                name="Grand Street"
                time="17"
                type="Metro"
                emoji="🚇"
                className="absolute top-20 -right-16 w-64 z-20"
              />

              {/* Floating Card 3 - Izakaya Toribar */}
              <VenueCard
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1-G6j41V3tdc1L3YMtrP8dgJ2KDFKO9n.png"
                name="Izakaya Toribar"
                time="22"
                type="Restaurants"
                emoji="🍽️"
                className="absolute bottom-40 -right-16 w-64 z-20"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MeepEarth;