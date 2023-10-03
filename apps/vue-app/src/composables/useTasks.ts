import { debounce } from "utils";
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

  const tasks = computed(() => {
    return tasksArray.value.filter(
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
    const task = await useCasePost.execute(color);
    //tasksArray.value = await useCaseGet.execute();
    tasksArray.value = [...task, ...tasksArray.value];
    focusNew.value = true;
  };

  const editTask = async (task: Task) => {
    await useCasePatch.execute({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      user_id: task.user?.id,
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
    focusNew.value = false;
  };

  onMounted(async () => {
    tasksArray.value = await useCaseGet.execute();
  });

  return {
    focusNew,
    createTask,
    deleteTask,
    updateFilter,
    updateTask: debounceEditTask,
    tasks,
  };
};
