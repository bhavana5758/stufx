import { useState } from "react";
import { Link } from "react-router";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  ListTodo,
  Timer,
  BarChart3,
  LogOut,
  Plus,
  AlertTriangle,
  AlertCircle,
  CircleDot,
} from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { Progress } from "@/react-app/components/ui/progress";

// Placeholder data - will be replaced with real data later
const stats = {
  totalStudyTime: "24h 30m",
  tasksCompleted: 12,
  studyStreak: 7,
  weeklyGoal: 75,
};

const pendingTasks = [
  { id: 1, title: "Complete Math Chapter 5", risk: "high", subject: "Mathematics", dueDate: "Today" },
  { id: 2, title: "Read History Notes", risk: "medium", subject: "History", dueDate: "Tomorrow" },
  { id: 3, title: "Practice Physics Problems", risk: "low", subject: "Physics", dueDate: "In 3 days" },
];

const completedTasks = [
  { id: 4, title: "Essay Draft", subject: "English", completedDate: "Yesterday" },
  { id: 5, title: "Chemistry Lab Report", subject: "Chemistry", completedDate: "2 days ago" },
];

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case "high":
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case "medium":
      return <AlertCircle className="w-4 h-4 text-amber-500" />;
    default:
      return <CircleDot className="w-4 h-4 text-emerald-500" />;
  }
};

const getRiskBadge = (risk: string) => {
  const baseClasses = "px-2 py-0.5 rounded-full text-xs font-medium";
  switch (risk) {
    case "high":
      return `${baseClasses} bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`;
    case "medium":
      return `${baseClasses} bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`;
    default:
      return `${baseClasses} bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400`;
  }
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Stufx
            </h1>
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-1">Good morning, Student!</h2>
          <p className="text-muted-foreground">Let's make today productive</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Study Time</p>
                  <p className="text-xl font-bold text-foreground">{stats.totalStudyTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  <p className="text-xl font-bold text-foreground">{stats.tasksCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <p className="text-xl font-bold text-foreground">{stats.studyStreak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Weekly Goal</p>
                  <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">{stats.weeklyGoal}%</p>
                </div>
                <Progress value={stats.weeklyGoal} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Link to="/tasks" className="group p-6 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 hover:scale-[1.02]">
            <ListTodo className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold">Tasks</p>
            <p className="text-sm text-teal-100">Manage your tasks</p>
          </Link>

          <Link to="/timer" className="group p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-[1.02]">
            <Timer className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold">Study Timer</p>
            <p className="text-sm text-amber-100">Start a session</p>
          </Link>

          <Link to="/analytics" className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
            <BarChart3 className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold">Analytics</p>
            <p className="text-sm text-purple-100">View your progress</p>
          </Link>
        </div>

        {/* Tasks Section */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Tasks</CardTitle>
              <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg">
                <Plus className="w-4 h-4 mr-1" />
                Add Task
              </Button>
            </div>
            {/* Tab Switcher */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "pending"
                    ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Pending ({pendingTasks.length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "completed"
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Completed ({completedTasks.length})
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === "pending" ? (
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {getRiskIcon(task.risk)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.subject}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={getRiskBadge(task.risk)}>{task.risk}</span>
                      <span className="text-sm text-muted-foreground">{task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.subject}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{task.completedDate}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
