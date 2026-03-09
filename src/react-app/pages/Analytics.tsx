import { Link } from "react-router";
import {
  Sparkles,
  ArrowLeft,
  Clock,
  TrendingUp,
  Target,
  Flame,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { Progress } from "@/react-app/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Sample data - will be replaced with real data later
const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 4.0 },
  { day: "Fri", hours: 2.9 },
  { day: "Sat", hours: 5.1 },
  { day: "Sun", hours: 3.5 },
];

const subjectData = [
  { name: "Mathematics", value: 8, color: "#14b8a6" },
  { name: "Physics", value: 5, color: "#f59e0b" },
  { name: "History", value: 3, color: "#8b5cf6" },
  { name: "English", value: 4, color: "#ec4899" },
  { name: "Chemistry", value: 3, color: "#06b6d4" },
];

const focusData = [
  { time: "8am", score: 65 },
  { time: "9am", score: 78 },
  { time: "10am", score: 85 },
  { time: "11am", score: 90 },
  { time: "12pm", score: 72 },
  { time: "1pm", score: 55 },
  { time: "2pm", score: 68 },
  { time: "3pm", score: 82 },
  { time: "4pm", score: 88 },
  { time: "5pm", score: 75 },
  { time: "6pm", score: 60 },
];

const stats = {
  totalStudyTime: "24h 30m",
  dailyAverage: "3h 30m",
  weeklyGoal: 75,
  studyStreak: 7,
};

export default function AnalyticsPage() {
  const totalSubjectHours = subjectData.reduce((acc, s) => acc + s.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Analytics</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Study Time</p>
                  <p className="text-xl font-bold text-foreground">{stats.totalStudyTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Daily Average</p>
                  <p className="text-xl font-bold text-foreground">{stats.dailyAverage}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <Target className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">Weekly Goal</p>
                  </div>
                  <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">{stats.weeklyGoal}%</p>
                </div>
                <Progress value={stats.weeklyGoal} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
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
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Weekly Study Hours Bar Chart */}
          <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Weekly Study Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Bar dataKey="hours" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Study Time by Subject Pie Chart */}
          <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Study Time by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {subjectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value}h`, "Hours"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-2">
                  {subjectData.map((subject) => (
                    <div key={subject.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                      <span className="text-sm text-foreground flex-1">{subject.name}</span>
                      <span className="text-sm text-muted-foreground">{Math.round((subject.value / totalSubjectHours) * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Focus Score Line Chart */}
        <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Focus Score Throughout the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={focusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Focus Score"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Focus Score"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#ec4899" }}
                  />
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
