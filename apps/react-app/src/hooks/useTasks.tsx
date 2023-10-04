import {
  DeleteTasksUseCase,
  GetTasksUseCase,
  PatchTasksUseCase,
  PostTasksUseCase,
  SubscribeTasksRealtimeUseCase,
  Task,
} from "core";
import { useCallback, useEffect, useState } from "react";
import { debounce, LocalService, uuidv4 } from "utils";

const useCasePost = new PostTasksUseCase();
const useCasePatch = new PatchTasksUseCase();
const useCaseDelete = new DeleteTasksUseCase();
const useCaseGet = new GetTasksUseCase();
const useCaseGetRealtime = new SubscribeTasksRealtimeUseCase();

export const useTasks = () => {
  const [clientCode, setClientCode] = useState("");
  const [filter, setFilter] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const updateFilter = (filter: string) => {
    setFilter(filter);
  };

  // SYNC FUNCTIONS
  const createTask = async (color: string) => {
    const task = await useCasePost.execute(color, clientCode);
    setTasks([...tasks, ...task]);
  };

  const editTask = async (task: Task) => {
    await useCasePatch.execute({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      user_id: task.user?.id,
      clientCode: clientCode,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceEditTask = useCallback(debounce(editTask, 100), [editTask]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCreateTask = useCallback(debounce(createTask, 250), [
    createTask,
  ]);

  const deleteTask = async (task: Task) => {
    await useCaseDelete.execute(task.id);
    const response = await useCaseGet.execute();
    setTasks(response);
  };

  // REALTIME FUNCTIONS
  const createTaskRealtime = (task: Task) => {
    if (tasks.filter((t) => t.id === task.id).length === 0) {
      setTasks([...tasks, task]);
      // setFocusNew(true);
    }
  };

  const updateTaskRealtime = (task: Task) => {
    if (task.clientCode !== LocalService.get("client-code")) {
      const oldTasks = tasks.filter((t) => t.id !== task.id);
      if (oldTasks.length !== tasks.length) {
        setTasks([...oldTasks, task]);
      }
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
    let clientCode = LocalService.get<string>("client-code");
    if (clientCode === null) {
      clientCode = uuidv4();
      LocalService.set("client-code", clientCode);
    }
    setClientCode(clientCode);
  }, []);

  return {
    clientCode,
    getTasks,
    createTask: debounceCreateTask,
    deleteTask,
    updateFilter,
    updateTask: debounceEditTask,
  };
};
