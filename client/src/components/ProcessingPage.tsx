import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useProcessingMessage } from "@/stores/selectors";

// Enhanced futuristic loading animation component
const FuturisticLoader: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [particles, setParticles] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * 45 * Math.PI) / 180,
      radius: 60 + Math.random() * 40,
      speed: 0.02 + Math.random() * 0.03,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 3) % 360);
      setPulsePhase((prev) => (prev + 0.08) % (Math.PI * 2));

      // Update particle positions
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          angle: particle.angle + particle.speed,
          radius:
            particle.radius + Math.sin(Date.now() * 0.001 + particle.id) * 2,
        }))
      );
    }, 16); // ~60fps for smooth animation
    return () => clearInterval(interval);
  }, []);

  const pulseScale = 1 + Math.sin(pulsePhase) * 0.15;
  const coreIntensity = 0.7 + Math.sin(pulsePhase * 2) * 0.3;

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Outer rotating rings with dynamic gradients */}
      <div
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          background: `
            conic-gradient(
              from ${rotation}deg,
              transparent 0deg,
              rgba(6, 182, 212, ${0.4 + Math.sin(pulsePhase) * 0.2}) 60deg,
              transparent 120deg,
              rgba(147, 51, 234, ${0.3 + Math.cos(pulsePhase) * 0.2}) 180deg,
              transparent 240deg,
              rgba(59, 130, 246, ${
                0.5 + Math.sin(pulsePhase * 1.5) * 0.2
              }) 300deg,
              transparent 360deg
            )
          `,
          animationDuration: "2s",
          filter: "blur(0.5px)",
        }}
      />

      {/* Fast-spinning inner ring */}
      <div
        className="absolute inset-8 rounded-full animate-spin"
        style={{
          background: `
            conic-gradient(
              from ${-rotation * 2}deg,
              transparent 0deg,
              rgba(168, 85, 247, 0.6) 90deg,
              transparent 180deg,
              rgba(236, 72, 153, 0.4) 270deg,
              transparent 360deg
            )
          `,
          animationDuration: "0.8s",
          filter: "blur(1px)",
        }}
      />

      {/* Dynamic pulsing core with morphing effect */}
      <div
        className="absolute inset-24 rounded-full flex items-center justify-center"
        style={{
          background: `
            radial-gradient(circle at center,
              rgba(6, 182, 212, ${coreIntensity}) 0%,
              rgba(59, 130, 246, ${coreIntensity * 0.8}) 30%,
              rgba(147, 51, 234, ${coreIntensity * 0.6}) 60%,
              transparent 100%
            )
          `,
          transform: `scale(${pulseScale}) rotate(${rotation * 0.5}deg)`,
          boxShadow: `
            0 0 60px rgba(6, 182, 212, ${coreIntensity * 0.8}),
            0 0 120px rgba(59, 130, 246, ${coreIntensity * 0.5}),
            0 0 180px rgba(147, 51, 234, ${coreIntensity * 0.3}),
            inset 0 0 60px rgba(255, 255, 255, ${coreIntensity * 0.2})
          `,
          filter: "blur(0.5px)",
        }}
      >
        <div
          className="w-6 h-6 bg-white rounded-full animate-pulse"
          style={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.9)",
            animationDuration: "1s",
          }}
        />
      </div>

      {/* Dynamic floating particles */}
      {particles.map((particle) => {
        const x = 50 + (particle.radius * Math.cos(particle.angle)) / 3.2;
        const y = 50 + (particle.radius * Math.sin(particle.angle)) / 3.2;

        return (
          <div
            key={particle.id}
            className="absolute w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              background: `
                radial-gradient(circle at center,
                  rgba(6, 182, 212, ${
                    0.8 + Math.sin(Date.now() * 0.003 + particle.id) * 0.2
                  }) 0%,
                  rgba(147, 51, 234, ${
                    0.6 + Math.cos(Date.now() * 0.002 + particle.id) * 0.3
                  }) 70%,
                  transparent 100%
                )
              `,
              boxShadow: `
                0 0 15px rgba(6, 182, 212, ${
                  0.6 + Math.sin(Date.now() * 0.003 + particle.id) * 0.3
                }),
                0 0 25px rgba(147, 51, 234, ${
                  0.4 + Math.cos(Date.now() * 0.002 + particle.id) * 0.2
                })
              `,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: "1.5s",
              transform: `scale(${
                1 + Math.sin(Date.now() * 0.004 + particle.id) * 0.3
              })`,
            }}
          />
        );
      })}

      {/* Fast energy streams */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-ping"
            style={{
              width: `${120 + i * 30}px`,
              height: `${120 + i * 30}px`,
              top: `${50 - (60 + i * 15)}%`,
              left: `${50 - (60 + i * 15)}%`,
              background: `
                radial-gradient(circle at center,
                  transparent 40%,
                  rgba(6, 182, 212, ${0.1 + i * 0.05}) 70%,
                  transparent 100%
                )
              `,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.2s",
              border: `1px solid rgba(6, 182, 212, ${0.2 + i * 0.1})`,
            }}
          />
        ))}
      </div>

      {/* Data stream effect */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"
            style={{
              height: "200%",
              left: `${10 + i * 7}%`,
              top: "-50%",
              animationDelay: `${i * 0.15}s`,
              animationDuration: "2s",
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: "center bottom",
              opacity: "0.6",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const ProcessingPage: React.FC = () => {
  const message = useProcessingMessage();

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 left-10 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping"
          style={{ animationDuration: "1.5s" }}
        ></div>
        <div
          className="absolute top-20 right-20 w-3 h-3 bg-purple-400/25 rounded-full animate-pulse"
          style={{ animationDuration: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"
          style={{ animationDuration: "1.8s" }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-4 h-4 bg-indigo-400/20 rounded-full animate-pulse"
          style={{ animationDuration: "2.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-5 w-1 h-1 bg-cyan-300/40 rounded-full animate-ping"
          style={{ animationDuration: "1.2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-5 w-1.5 h-1.5 bg-purple-300/35 rounded-full animate-pulse"
          style={{ animationDuration: "1.7s" }}
        ></div>
      </div>

      <Card className="relative backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-2 border-gradient-to-r from-cyan-200/60 via-blue-200/60 to-purple-200/60 dark:from-cyan-800/40 dark:via-blue-800/40 dark:to-purple-800/40 shadow-2xl">
        <CardContent className="pt-12 pb-12">
          <div className="text-center space-y-12">
            {/* Enhanced Futuristic Loading Animation */}
            <FuturisticLoader />

            {/* Refined Message */}
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold text-foreground mb-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {message}
              </h2>
              <p className="text-muted-foreground text-base font-light tracking-wide">
                Processing in background...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
