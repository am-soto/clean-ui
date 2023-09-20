import { Task } from "core";
import { useEffect, useState } from "react";
export const useFilterNotes = (tasks: Task[]) => {
  const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);

  useEffect(() => {
    setSearchedTasks(tasks);
  }, [tasks]);

  const filterNotes = (value: string) => {
    const searchedPodcasts = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(value.toLowerCase()) ||
        task.description.toLowerCase().includes(value.toLowerCase()) ||
        task.user?.username.toLowerCase().includes(value.toLowerCase()) ||
        task.status.toLowerCase().includes(value.toLowerCase())
    );

    setSearchedTasks(searchedPodcasts);
  };

  return { filterNotes, searchedTasks };
};
