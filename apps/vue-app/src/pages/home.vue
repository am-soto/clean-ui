<script setup lang="ts">
import { ref } from "vue";
import { Colors } from "ui";
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import SearchBar from "../components/SearchBar.vue";
import { useTasks } from "../composables/useTasks";
import avatar from "animal-avatar-generator";
import { funAnimalName } from "fun-animal-names";

const {
  createTask,
  updateFilter,
  updateTask,
  deleteTask,
  tasks,
  clientCode,
} = useTasks();

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
    <div slot="left-bar" class="flex flex-col items-center justify-between">
      <div>
        <h3>Añadir</h3>
        <Button @click="onShowColorsClick()">&#10010;</Button>
        <ul v-if="showColors" class="pt-4" ref="parent">
          <li v-for="item in colors" :key="item">
            <button type="button" class="transition-all rounded-full active:scale-110 w-7 h-7" :class="`bg-${item}`"
              @click="createTask(item)" />
          </li>
        </ul>
      </div>
      <div className="flex flex-col ">
        <span className="text-xs text-center">
          made with <span>🥚</span>
        </span>
        <span className="text-sm text-center font-bold ">by web-ones</span>
        <span className="text-xs text-center">&copy; 2023</span>
      </div>
    </div>
    <div slot="main">
      <div class="flex justify-betwen">
        <div class="w-[85%] pl-1 ">
          <SearchBar @update="updateFilter" />
          <h1 className="text-5xl">Notas</h1>
        </div>
        <div class="flex flex-col items-center">
          <img :src="`data:image/svg+xml;utf8,${encodeURIComponent(
            avatar(clientCode, { size: 100 }).trim()
          )}`" height="100" width="100" class="w-20 rounded-full md:w-24" />
          <span class="font-bold text-center">
            {{ funAnimalName(clientCode) }}
          </span>
        </div>
      </div>
      <ul className="flex flex-wrap gap-4 py-2 overflow-auto" ref="parent">
        <li v-for="task in tasks" :key="task.id">
          <Card :clientCode="clientCode" :task="task" @delete.once="deleteTask(task)" @update="updateTask" />
        </li>
      </ul>
    </div>
  </home-layout>
</template>

