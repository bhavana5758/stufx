import { useState } from "react";
import { useNavigate } from "react-router";
import { Smile, Battery, Target, Leaf, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";

type Mood = "happy" | "tired" | "focused" | "calm";

interface MoodOption {
  id: Mood;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  quotes: string[];
}

const moodOptions: MoodOption[] = [
  {
    id: "happy",
    label: "Happy",
    icon: <Smile className="w-8 h-8" />,
    color: "text-amber-500",
    bgColor: "bg-amber-50 hover:bg-amber-100 border-amber-200",
    quotes: [
      "Your positive energy is contagious! Let it fuel your learning today.",
      "Happiness is the best study companion. Ride this wave!",
      "A joyful mind absorbs knowledge like a sponge. You've got this!",
    ],
  },
  {
    id: "tired",
    label: "Tired",
    icon: <Battery className="w-8 h-8" />,
    color: "text-purple-500",
    bgColor: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    quotes: [
      "Even small steps forward count. Take it one topic at a time.",
      "Rest is part of the journey. A quick break can recharge your brain.",
      "Tiredness is temporary, but the knowledge you gain lasts forever.",
    ],
  },
  {
    id: "focused",
    label: "Focused",
    icon: <Target className="w-8 h-8" />,
    color: "text-teal-500",
    bgColor: "bg-teal-50 hover:bg-teal-100 border-teal-200",
    quotes: [
      "You're in the zone! This is when breakthroughs happen.",
      "Laser focus activated. Time to conquer your goals!",
      "Channel this energy — you're unstoppable right now.",
    ],
  },
  {
    id: "calm",
    label: "Calm",
    icon: <Leaf className="w-8 h-8" />,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
    quotes: [
      "A calm mind is a powerful mind. Perfect for deep learning.",
      "Serenity breeds creativity. Let ideas flow naturally.",
      "Peace and productivity go hand in hand. Embrace it.",
    ],
  },
];

export default function WelcomePage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [showQuote, setShowQuote] = useState(false);
  const navigate = useNavigate();

  const handleMoodSelect = (mood: MoodOption) => {
    setSelectedMood(mood.id);
    const randomQuote = mood.quotes[Math.floor(Math.random() * mood.quotes.length)];
    setQuote(randomQuote);
    setShowQuote(true);
  };

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo and Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Stufx
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Smart Student Study Tracker
          </p>
        </div>

        {/* Mood Selection */}
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-center mb-2 text-foreground">
            How are you feeling today?
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Select your mood to get started with personalized motivation
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {moodOptions.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood)}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-300 
                  ${mood.bgColor}
                  ${selectedMood === mood.id 
                    ? "ring-2 ring-offset-2 ring-teal-500 scale-105 shadow-lg" 
                    : "hover:scale-102 hover:shadow-md"
                  }
                `}
              >
                <div className={`flex flex-col items-center gap-3 ${mood.color}`}>
                  {mood.icon}
                  <span className="font-medium text-foreground">{mood.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Motivational Quote */}
          <div
            className={`
              transform transition-all duration-500 ease-out
              ${showQuote ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            {showQuote && (
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 dark:border-slate-700/50 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground leading-relaxed">
                      "{quote}"
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      — Your daily motivation
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div
            className={`
              flex justify-center transform transition-all duration-500 delay-200
              ${showQuote ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            {showQuote && (
              <Button
                size="lg"
                onClick={handleContinue}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300"
              >
                Continue to Login
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative text-center py-6 text-sm text-muted-foreground">
        <p>Track smarter, study better</p>
      </footer>
    </div>
  );
}
