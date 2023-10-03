<script setup>
import { ref, onMounted, computed } from "vue";
import { Colors } from "ui";
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import { GetTasksUseCase } from "core";
import { useTasks } from "../composables/useTasks";

const { focusNew, createTask, updateFilter, updateTask, deleteTask, tasks } =
  useTasks();

const colors = ref(
  Object.keys(Colors).filter((item) => item !== "white" && item !== "black")
);
const showColors = ref(false);
const [parent] = useAutoAnimate();

const onShowColorsClick = () => {
  showColors.value = !showColors.value;
};
</script>
<template>
  <home-layout>
    <div slot="left-bar">
      <h3>App</h3>
      <Button @click="onShowColorsClick()">+</Button>
      <ul v-if="showColors" class="pt-4">
        <li v-for="item in colors" :key="item.id">
          <button
            type="button"
            class="rounded-full w-7 h-7 animate__animated animate__fadeInDown"
            :class="`bg-${item}`"
            @click="createTask(item)"
          />
        </li>
      </ul>
    </div>
    <div slot="main">
      // AQUI BUSCADOR
      <h1 className="text-5xl">Notas</h1>
      <ul className="flex flex-wrap gap-4 py-2 overflow-auto" ref="parent">
        <li v-for="task in tasks" :key="task.id">
          <Card
            :task="task"
            :focus="focusNew"
            @delete.once="deleteTask(task)"
            @update="updateTask"
          />
        </li>
      </ul>
    </div>
  </home-layout>
</template>

