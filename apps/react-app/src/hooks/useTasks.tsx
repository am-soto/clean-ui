import {
  DeleteTasksUseCase,
  GetTasksUseCase,
  PatchTasksUseCase,
  PostTasksUseCase,
  Task,
} from "core";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "../helpers/debounce";

export const useTasks = () => {
  const useCasePost = new PostTasksUseCase();
  const useCasePatch = new PatchTasksUseCase();
  const useCaseDelete = new DeleteTasksUseCase();
  const useCaseGet = new GetTasksUseCase();

  const [filter, setFilter] = useState(""); 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [focusNew, setFocusNew] = useState(false); 

  const getTasks = () => {
    return tasks
      .filter(
        (task) =>
          task.title.toLowerCase().includes(filter.toLowerCase()) ||
          task.description.toLowerCase().includes(filter.toLowerCase()) ||
          task.user?.username.toLowerCase().includes(filter.toLowerCase()) ||
          task.status.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => a.id > b.id ? -1 : 1);
  }

  const createTask = async (color: string) => {
    const task = await useCasePost.execute(color);
    setTasks([...tasks, ...task]);
    setFocusNew(true);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await useCaseGet.execute();
      setTasks(response);
    };
    getData();
  }, []);

  // TODO: Cambiar editable tag por input transparente
  const editTask = async (task: Task) => {
    await useCasePatch.execute({
      ...task
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceEditTask = useCallback(debounce(editTask), [editTask]);

  const deleteTask = async (task: Task) => {
    await useCaseDelete.execute(task.id);
    const response = await useCaseGet.execute();
    setTasks(response);
  };

  const updateFilter = (filter: string) => {
    setFilter(filter);
    setFocusNew(false);
  }

  return { focusNew, getTasks, createTask, deleteTask, updateFilter, updateTask: debounceEditTask };
};
