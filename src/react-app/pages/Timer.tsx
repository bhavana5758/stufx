import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Sparkles,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Save,
  Clock,
  BookOpen,
} from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { Input } from "@/react-app/components/ui/input";
import { Label } from "@/react-app/components/ui/label";

interface StudyRecord {
  id: number;
  subject: string;
  duration: number; // in seconds
  date: string;
}

const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const formatDuration = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  return `${mins}m`;
};

export default function TimerPage() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [subject, setSubject] = useState("");
  const [records, setRecords] = useState<StudyRecord[]>([
    { id: 1, subject: "Mathematics", duration: 3600, date: "Today" },
    { id: 2, subject: "Physics", duration: 2700, date: "Today" },
    { id: 3, subject: "History", duration: 1800, date: "Yesterday" },
  ]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleSave = () => {
    if (time < 60 || !subject.trim()) return;
    const record: StudyRecord = {
      id: Date.now(),
      subject: subject.trim(),
      duration: time,
      date: "Just now",
    };
    setRecords([record, ...records]);
    setTime(0);
    setSubject("");
    setIsRunning(false);
  };

  const totalToday = records
    .filter((r) => r.date === "Today" || r.date === "Just now")
    .reduce((acc, r) => acc + r.duration, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Study Timer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Timer Card */}
        <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl mb-8">
          <CardContent className="p-8">
            {/* Subject Input */}
            <div className="max-w-xs mx-auto mb-8">
              <Label htmlFor="subject" className="text-center block mb-2">What are you studying?</Label>
              <Input
                id="subject"
                placeholder="e.g., Mathematics"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-12 rounded-xl text-center text-lg"
              />
            </div>

            {/* Timer Display */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center mx-auto shadow-inner">
                  <div className="w-56 h-56 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg">
                    <span className="text-5xl font-bold text-foreground font-mono">
                      {formatTime(time)}
                    </span>
                  </div>
                </div>
                {isRunning && (
                  <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" style={{ animationDuration: "3s" }} />
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="w-14 h-14 rounded-full p-0"
                disabled={time === 0}
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleStartStop}
                size="lg"
                className={`w-20 h-20 rounded-full p-0 shadow-lg ${
                  isRunning
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                }`}
              >
                {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </Button>
              <Button
                onClick={handleSave}
                variant="outline"
                size="lg"
                className="w-14 h-14 rounded-full p-0"
                disabled={time < 60 || !subject.trim()}
              >
                <Save className="w-5 h-5" />
              </Button>
            </div>

            {/* Hint */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {time < 60 ? "Study for at least 1 minute to save your session" : "Click save to record this session"}
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today's Study Time</p>
                  <p className="text-xl font-bold text-foreground">{formatDuration(totalToday)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sessions Today</p>
                  <p className="text-xl font-bold text-foreground">
                    {records.filter((r) => r.date === "Today" || r.date === "Just now").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Records */}
        <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{record.subject}</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                  <span className="text-lg font-semibold text-amber-600 dark:text-amber-400">
                    {formatDuration(record.duration)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
