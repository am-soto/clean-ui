import { LocalService, debounce, uuidv4 } from "utils";
import {
  DeleteTasksUseCase,
  GetTasksUseCase,
  PatchTasksUseCase,
  PostTasksUseCase,
  SubscribeTasksRealtimeUseCase,
  Task,
} from "core";
import { ref, onMounted, Ref, computed } from "vue";

const useCasePost = new PostTasksUseCase();
const useCasePatch = new PatchTasksUseCase();
const useCaseDelete = new DeleteTasksUseCase();
const useCaseGet = new GetTasksUseCase();
const useCaseGetRealtime = new SubscribeTasksRealtimeUseCase();

export const useTasks = () => {
  const filter: Ref<string> = ref("");
  const tasksArray: Ref<Task[]> = ref([]);
  const focusNew: Ref<boolean> = ref(false);
  const clientCode: Ref<string> = ref("");

  const tasks = computed(() => {
    return tasksArray.value
      .filter(
        (task: Task) =>
          task.title.toLowerCase().includes(filter.value.toLowerCase()) ||
          task.description.toLowerCase().includes(filter.value.toLowerCase()) ||
          task.user?.username
            .toLowerCase()
            .includes(filter.value.toLowerCase()) ||
          task.status.toLowerCase().includes(filter.value.toLowerCase())
      )
      .sort((a, b) => (a.id > b.id ? -1 : 1));
  });

  const createTask = async (color: string) => {
    const task = await useCasePost.execute(color, clientCode.value);
    tasksArray.value = [...task, ...tasksArray.value];
    // focusNew.value = true;
  };

  const editTask = async (task: Task) => {
    await useCasePatch.execute({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      user_id: task.user?.id,
      clientCode: clientCode.value,
    });
  };

  const debounceEditTask = debounce(editTask);

  const deleteTask = async (task: Task) => {
    await useCaseDelete.execute(task.id);
    const response = await useCaseGet.execute();
    tasksArray.value = [...response];
  };

  const updateFilter = (value: string) => {
    filter.value = value;
    // focusNew.value = false;
  };

  // REALTIME FUNCTIONS
  const createTaskRealtime = (task: Task) => {
    if (tasks.value.filter((t) => t.id === task.id).length === 0) {
      tasksArray.value = [task, ...tasksArray.value];
    }
  };

  const updateTaskRealtime = (task: Task) => {
    if (task.clientCode !== LocalService.get("client-code")) {
      const oldTasks = tasks.value.filter((t) => t.id !== task.id);
      if (oldTasks.length !== tasks.value.length) {
        tasksArray.value = [...oldTasks, task];
      }
    }
  };

  const deleteTaskRealtime = (id: number) => {
    tasksArray.value = tasks.value.filter((t) => t.id !== id);
  };

  useCaseGetRealtime.execute(
    createTaskRealtime,
    updateTaskRealtime,
    deleteTaskRealtime
  );

  onMounted(async () => {
    tasksArray.value = await useCaseGet.execute();
    let code = LocalService.get<string>("client-code");
    if (code === null) {
      code = uuidv4();
      LocalService.set("client-code", code);
    }
    clientCode.value = code;
  });

  return {
    focusNew,
    createTask,
    deleteTask,
    updateFilter,
    updateTask: debounceEditTask,
    tasks,
    clientCode,
  };
};
