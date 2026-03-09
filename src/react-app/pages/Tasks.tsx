import { useState } from "react";
import { Link } from "react-router";
import {
  Sparkles,
  ArrowLeft,
  Plus,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  CircleDot,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { Input } from "@/react-app/components/ui/input";
import { Label } from "@/react-app/components/ui/label";

interface Task {
  id: number;
  title: string;
  subject: string;
  risk: "high" | "medium" | "low";
  dueDate: string;
  isCompleted: boolean;
  completedDate?: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Complete Math Chapter 5", risk: "high", subject: "Mathematics", dueDate: "Today", isCompleted: false },
  { id: 2, title: "Read History Notes", risk: "medium", subject: "History", dueDate: "Tomorrow", isCompleted: false },
  { id: 3, title: "Practice Physics Problems", risk: "low", subject: "Physics", dueDate: "In 3 days", isCompleted: false },
  { id: 4, title: "Essay Draft", subject: "English", risk: "low", dueDate: "", isCompleted: true, completedDate: "Yesterday" },
  { id: 5, title: "Chemistry Lab Report", subject: "Chemistry", risk: "medium", dueDate: "", isCompleted: true, completedDate: "2 days ago" },
];

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case "high":
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    case "medium":
      return <AlertCircle className="w-5 h-5 text-amber-500" />;
    default:
      return <CircleDot className="w-5 h-5 text-emerald-500" />;
  }
};

const getRiskBadge = (risk: string) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium capitalize";
  switch (risk) {
    case "high":
      return `${baseClasses} bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`;
    case "medium":
      return `${baseClasses} bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`;
    default:
      return `${baseClasses} bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400`;
  }
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", subject: "", risk: "medium" as const, dueDate: "" });

  const pendingTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.subject.trim()) return;
    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      subject: newTask.subject,
      risk: newTask.risk,
      dueDate: newTask.dueDate || "No due date",
      isCompleted: false,
    };
    setTasks([task, ...tasks]);
    setNewTask({ title: "", subject: "", risk: "medium", dueDate: "" });
    setShowAddModal(false);
  };

  const handleCompleteTask = (id: number) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, isCompleted: true, completedDate: "Just now" } : t
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Tasks</h1>
            </div>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "pending"
                ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25"
                : "bg-white/80 dark:bg-slate-800/80 text-muted-foreground hover:bg-white dark:hover:bg-slate-800"
            }`}
          >
            Pending ({pendingTasks.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "completed"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                : "bg-white/80 dark:bg-slate-800/80 text-muted-foreground hover:bg-white dark:hover:bg-slate-800"
            }`}
          >
            Completed ({completedTasks.length})
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {activeTab === "pending" ? (
            pendingTasks.length === 0 ? (
              <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">All caught up!</p>
                  <p className="text-muted-foreground">No pending tasks. Add a new one to get started.</p>
                </CardContent>
              </Card>
            ) : (
              pendingTasks.map((task) => (
                <Card key={task.id} className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 text-transparent hover:text-emerald-500" />
                      </button>
                      {getRiskIcon(task.risk)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.subject}</p>
                      </div>
                      <span className={getRiskBadge(task.risk)}>{task.risk}</span>
                      <span className="text-sm text-muted-foreground hidden sm:block">{task.dueDate}</span>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )
          ) : completedTasks.length === 0 ? (
            <Card className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <p className="text-lg font-medium text-foreground">No completed tasks yet</p>
                <p className="text-muted-foreground">Complete some tasks to see them here.</p>
              </CardContent>
            </Card>
          ) : (
            completedTasks.map((task) => (
              <Card key={task.id} className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground line-through">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.subject}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{task.completedDate}</span>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md bg-white dark:bg-slate-800 border-0 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Add New Task</CardTitle>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Complete Chapter 5"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics"
                  value={newTask.subject}
                  onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Risk Level</Label>
                <div className="flex gap-2">
                  {(["low", "medium", "high"] as const).map((risk) => (
                    <button
                      key={risk}
                      onClick={() => setNewTask({ ...newTask, risk })}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium capitalize transition-all ${
                        newTask.risk === risk
                          ? risk === "high"
                            ? "bg-red-500 text-white"
                            : risk === "medium"
                            ? "bg-amber-500 text-white"
                            : "bg-emerald-500 text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {risk}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date (optional)</Label>
                <Input
                  id="dueDate"
                  placeholder="e.g., Tomorrow, In 3 days"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="h-12 rounded-xl"
                />
              </div>
              <Button
                onClick={handleAddTask}
                disabled={!newTask.title.trim() || !newTask.subject.trim()}
                className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-xl mt-4"
              >
                Add Task
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
