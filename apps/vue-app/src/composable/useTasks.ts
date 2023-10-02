import { debounce } from "./../../../react-app/src/helpers/debounce";
import {
  DeleteTasksUseCase,
  GetTasksUseCase,
  PatchTasksUseCase,
  PostTasksUseCase,
  Task,
} from "core";
import { ref, onMounted, Ref, computed } from "vue";

const useCasePost = new PostTasksUseCase();
const useCasePatch = new PatchTasksUseCase();
const useCaseDelete = new DeleteTasksUseCase();
const useCaseGet = new GetTasksUseCase();

export const useTasks = () => {
  const filter: Ref<string> = ref("");
  const tasksArray: Ref<Task[]> = ref([]);
  const focusNew: Ref<boolean> = ref(false);

  const getTasks = () => {
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
  };

  const tasks = computed(() => {
    return tasksArray.value;
  });

  const createTask = async (color: string) => {
    const task = await useCasePost.execute(color);
    tasksArray.value = [...tasksArray.value, ...task];
    focusNew.value = true;
  };

  const editTask = async (task: Task) => {
    await useCasePatch.execute({
      ...task,
    });
  };

  //TODO: cambiar el import debounce
  const debounceEditTask = debounce(editTask);

  const deleteTask = async (task: Task) => {
    await useCaseDelete.execute(task.id);
    const response = await useCaseGet.execute();
    tasksArray.value = [...response];
  };

  const updateFilter = (value: string) => {
    filter.value = value;
    focusNew.value = false;
  };

  onMounted(async () => {
    tasksArray.value = await useCaseGet.execute();
  });

  return {
    focusNew,
    getTasks,
    createTask,
    deleteTask,
    updateFilter,
    updateTask: debounceEditTask,
    tasks,
  };
};
