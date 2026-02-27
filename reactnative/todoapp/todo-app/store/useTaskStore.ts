import { create } from "zustand";
import { Task } from "../types/task";
import { saveTasks, loadTasks } from "../utils/storage";

type TaskState = {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  fetchTasks: () => Promise<void>;
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  fetchTasks: async () => {
    const storedTasks = await loadTasks();
    set({ tasks: storedTasks });
  },

  addTask: (title) => {
    const newTasks = [
      ...get().tasks,
      {
        id: Date.now().toString(),
        title,
        completed: false,
      },
    ];
    set({ tasks: newTasks });
    saveTasks(newTasks);
  },

  deleteTask: (id) => {
    const newTasks = get().tasks.filter((task) => task.id !== id);
    set({ tasks: newTasks });
    saveTasks(newTasks);
  },

  toggleTask: (id) => {
    const newTasks = get().tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
    set({ tasks: newTasks });
    saveTasks(newTasks);
  },
}));