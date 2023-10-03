import {
  DeleteTasksUseCase,
  GetTasksUseCase,
  PatchTasksUseCase,
  PostTasksUseCase,
  SubscribeTasksRealtimeUseCase,
  Task,
} from "core";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "utils";

const useCasePost = new PostTasksUseCase();
const useCasePatch = new PatchTasksUseCase();
const useCaseDelete = new DeleteTasksUseCase();
const useCaseGet = new GetTasksUseCase();
const useCaseGetRealtime = new SubscribeTasksRealtimeUseCase();

export const useTasks = () => {
  const [filter, setFilter] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [focusNew, setFocusNew] = useState(false);

  const getTasks = () => {
    return tasks
      .filter(
        (task) =>
          String(task.title).toLowerCase().includes(filter.toLowerCase()) ||
          String(task.description)
            .toLowerCase()
            .includes(filter.toLowerCase()) ||
          String(task.user?.username)
            .toLowerCase()
            .includes(filter.toLowerCase()) ||
          String(task.status).toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => (a.id > b.id ? -1 : 1));
  };

  const createTask = async (color: string) => {
    console.log("user create task", tasks);
    const task = await useCasePost.execute(color);
    setTasks([...tasks, ...task]);
    setFocusNew(true);
  };

  const createTaskRealtime = (task: Task) => {
    if (tasks.filter((t) => t.id === task.id).length === 0) {
      setTasks([...tasks, task]);
      setFocusNew(true);
    }
  };

  const updateTaskRealtime = (task: Task) => {
    console.log("1");
    const oldTasks = tasks.filter((t) => t.id !== task.id);
    if (oldTasks.length !== tasks.length) {
      console.log("2", task);
      setTasks([...oldTasks, task]);
      setFocusNew(true);
    }
  };

  const deleteTaskRealtime = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  useCaseGetRealtime.execute(
    createTaskRealtime,
    updateTaskRealtime,
    deleteTaskRealtime
  );

  useEffect(() => {
    const getData = async () => {
      const response = await useCaseGet.execute();
      setTasks(response);
    };
    getData();
  }, []);

  const editTask = async (task: Task) => {
    await useCasePatch.execute({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      user_id: task.user?.id,
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
  };

  return {
    focusNew,
    getTasks,
    createTask,
    deleteTask,
    updateFilter,
    updateTask: debounceEditTask,
  };
};
