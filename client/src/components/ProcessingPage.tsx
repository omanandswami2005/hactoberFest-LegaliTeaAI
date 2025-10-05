import React, { useEffect, useState } from "react";
import {
  Loader2,
  FileText,
  Brain,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/stores/appStore";

// Animated typing text component
const AnimatedText: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        if (currentIndex < text.length) {
          const timeout = setTimeout(() => {
            setDisplayText((prev) => prev + text[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          }, 50);
          return () => clearTimeout(timeout);
        }
      }, delay);
      return () => clearTimeout(timer);
    } else {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, 50);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, text, delay]);

  return (
    <span className="inline-block">
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </span>
  );
};

// Fast-paced loading messages component
const FastLoadingMessages: React.FC = () => {
  const messages = [
    "⚡ Loading your analysis at lightning speed...",
    "🚀 Scanning document for key insights...",
    "💫 Finding actionable results quickly...",
    "🎯 Analyzing legal language rapidly...",
    "⚡ Extracting critical information fast...",
    "🚀 Delivering results in seconds...",
    "💫 Working at maximum speed...",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000); // Faster rotation for more energetic feel
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="h-8 flex items-center justify-center">
      <AnimatedText text={messages[currentMessageIndex]} />
    </div>
  );
};

export const ProcessingPage: React.FC = () => {
  const { processingStage, progress } = useAppStore();
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const [showRoundLoader, setShowRoundLoader] = useState(false);

  // Create dynamic pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity((prev) => (prev === 1 ? 1.2 : 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show round loader after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowRoundLoader(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced circular progress indicator component
  const CircularProgress: React.FC<{
    progress: number;
    size?: number;
    strokeWidth?: number;
  }> = ({ progress, size = 120, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-muted/20"
          />
          {/* Progress circle with gradient */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1500 ease-out"
            style={{
              filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))",
            }}
          />
          {/* Define gradient */}
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {Math.round(progress)}%
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Complete
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getStageIcon = () => {
    switch (processingStage) {
      case "extract":
        return (
          <div className="relative">
            <div className="relative">
              <FileText className="h-12 w-12 text-blue-500 animate-pulse" />
              <div className="absolute -top-1 -right-1">
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
            {showRoundLoader && (
              <div className="mt-4">
                <CircularProgress
                  progress={progress}
                  size={80}
                  strokeWidth={6}
                />
              </div>
            )}
          </div>
        );
      case "analyze":
        return (
          <div className="relative">
            <div className="relative">
              <Brain
                className="h-12 w-12 text-purple-500 animate-pulse"
                style={{ transform: `scale(${pulseIntensity})` }}
              />
              <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-20"></div>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-bounce" />
            </div>
            <div className="mt-4">
              <CircularProgress progress={progress} size={80} strokeWidth={6} />
            </div>
          </div>
        );
      case "complete":
        return (
          <div className="relative">
            <div className="relative">
              <CheckCircle2 className="h-12 w-12 text-green-500 animate-bounce" />
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30"></div>
            </div>
            <div className="mt-4">
              <CircularProgress progress={100} size={80} strokeWidth={6} />
            </div>
          </div>
        );
      default:
        return (
          <div className="relative">
            <div className="relative">
              <Loader2 className="h-12 w-12 text-amber-500 animate-spin" />
              <div className="absolute inset-0 border-4 border-amber-200 rounded-full animate-pulse opacity-50"></div>
            </div>
            <div className="mt-4">
              <CircularProgress progress={progress} size={80} strokeWidth={6} />
            </div>
          </div>
        );
    }
  };

  const getEducationalTip = () => {
    const tips = [
      "Our AI analyzes thousands of legal documents for unmatched accuracy and reliability.",
      "We rapidly identify key terms, risks, and actionable next steps in seconds.",
      "Advanced confidence scoring helps you understand analysis reliability instantly.",
      "Complex legal language is translated into clear, understandable insights.",
      "Smart risk detection highlights potential red flags that need your attention.",
    ];

    // Rotate tips based on loading stage
    const tipIndex =
      processingStage === "extract" ? 0 : processingStage === "analyze" ? 1 : 2;
    return tips[tipIndex] || tips[0];
  };

  return (
    <div className="max-w-2xl mx-auto relative min-h-screen flex items-center justify-center p-4">
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        <div className="absolute top-16 left-16 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-24 right-24 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-15"></div>
        <div className="absolute bottom-24 left-24 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-20"></div>
        <div className="absolute bottom-16 right-16 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-10"></div>

        {/* Additional subtle particles */}
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-bounce opacity-25"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-green-300 rounded-full animate-ping opacity-20"></div>

        {/* Gradient orbs for depth */}
        <div className="absolute top-12 right-12 w-8 h-8 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-12 left-12 w-6 h-6 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-sm animate-bounce"></div>
      </div>

      <Card
        className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-2 shadow-2xl shadow-blue-500/10 dark:shadow-blue-400/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.9) 100%)",
          borderImage:
            "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #10b981 100%) 1",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">{getStageIcon()}</div>

            {/* Main Loading Message */}
            <div className="space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4 tracking-tight animate-pulse">
                Loading
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">
                ⚡ Analyzing your document at lightning speed...
              </p>
            </div>

            {/* Fast-paced loading messages */}
            <FastLoadingMessages />

            {/* Enhanced Loading Steps */}
            <div className="flex justify-center space-x-8 md:space-x-12 text-sm">
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-700 ${
                    processingStage === "extract"
                      ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 shadow-lg shadow-blue-500/30"
                      : progress > 50
                      ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500"
                      : "bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <FileText
                    className={`h-6 w-6 transition-all duration-500 ${
                      processingStage === "extract"
                        ? "text-blue-600 dark:text-blue-400 animate-bounce"
                        : progress > 50
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  {processingStage === "extract" && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                  )}
                </div>
                <span
                  className={`font-semibold transition-all duration-500 ${
                    processingStage === "extract"
                      ? "text-blue-600 dark:text-blue-400"
                      : progress > 50
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  Reading
                </span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-700 ${
                    processingStage === "analyze"
                      ? "bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500 shadow-lg shadow-purple-500/30"
                      : progress >= 100
                      ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500"
                      : "bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <Brain
                    className={`h-6 w-6 transition-all duration-500 ${
                      processingStage === "analyze"
                        ? "text-purple-600 dark:text-purple-400 animate-pulse"
                        : progress >= 100
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  {processingStage === "analyze" && (
                    <>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
                      <Sparkles className="absolute -bottom-1 -left-1 h-4 w-4 text-yellow-400 animate-spin" />
                    </>
                  )}
                </div>
                <span
                  className={`font-semibold transition-all duration-500 ${
                    processingStage === "analyze"
                      ? "text-purple-600 dark:text-purple-400"
                      : progress >= 100
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  Analyzing
                </span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-700 ${
                    processingStage === "complete"
                      ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500 shadow-lg shadow-green-500/30"
                      : "bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <CheckCircle2
                    className={`h-6 w-6 transition-all duration-500 ${
                      processingStage === "complete"
                        ? "text-green-600 dark:text-green-400 animate-bounce"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  {processingStage === "complete" && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                  )}
                </div>
                <span
                  className={`font-semibold transition-all duration-500 ${
                    processingStage === "complete"
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  Complete
                </span>
              </div>
            </div>

            {/* Enhanced Educational Content */}
            <div className="relative bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 border border-blue-200/60 dark:border-blue-800/60 rounded-xl p-6 max-w-lg mx-auto shadow-xl backdrop-blur-sm">
              <div className="absolute top-3 right-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    <span className="text-white text-lg animate-bounce">
                      💡
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold bg-gradient-to-r from-blue-800 to-purple-800 dark:from-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-2">
                    Did you know?
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
                    {getEducationalTip()}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Feature Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-950/30 dark:to-green-900/30 rounded-xl border border-green-200/60 dark:border-green-800/60 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/60 dark:to-green-800/60 rounded-full flex items-center justify-center shadow-md">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400 animate-pulse" />
                </div>
                <p className="text-center text-green-700 dark:text-green-300 font-semibold text-sm">
                  Secure Loading
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-950/30 dark:to-blue-900/30 rounded-xl border border-blue-200/60 dark:border-blue-800/60 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 rounded-full flex items-center justify-center shadow-md">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-pulse" />
                </div>
                <p className="text-center text-blue-700 dark:text-blue-300 font-semibold text-sm">
                  AI-Powered Analysis
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-950/30 dark:to-purple-900/30 rounded-xl border border-purple-200/60 dark:border-purple-800/60 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/60 dark:to-purple-800/60 rounded-full flex items-center justify-center shadow-md">
                  <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                </div>
                <p className="text-center text-purple-700 dark:text-purple-300 font-semibold text-sm">
                  Lightning Fast
                </p>
              </div>
            </div>

            {/* Enhanced animated status indicators */}
            <div className="flex justify-center items-center space-x-6 md:space-x-8 mt-6">
              <div className="flex items-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                <Target className="h-5 w-5 animate-pulse" />
                <span>Loading</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                <TrendingUp className="h-5 w-5 animate-bounce" />
                <span>Analyzing</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-medium text-green-600 dark:text-green-400">
                <Sparkles className="h-5 w-5 animate-spin" />
                <span>Optimizing</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
