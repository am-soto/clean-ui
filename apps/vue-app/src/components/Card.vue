<script setup lang="ts">
import { ref, computed } from "vue";
import {
  CardStyles,
  InputStyles,
  TextareaStyles,
  ButtonDeleteStyles,
} from "ui";
import Overlay from "./Overlay.vue";

const emit = defineEmits(["delete", "update"]);

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  clientCode: {
    type: String,
    required: true,
  },
  focus: Boolean,
});

const deleting = ref(false);
const cardRef = ref(null);

const cardStyles = computed(() => CardStyles({ color: props.task.color }));

const updateTitle = (event: any) => {
  if (isEditable()) {
    const newTitle = event.target.value;
    emit("update", { ...props.task, title: newTitle });
  }
};

const updateDescription = (event: any) => {
  if (isEditable()) {
    const newDescription = event.target.value;
    emit("update", { ...props.task, description: newDescription });
  }
};

const onClickDelete = () => {
  deleting.value = true;
  emit("delete", props.task);
};

const isEditable = () => {
  if (props.clientCode !== props.task.clientCode) {
    const now = new Date();
    const differenceInSeconds =
      (now.getTime() - props.task.updatedAt.getTime()) / 1000;
    return differenceInSeconds > 5;
  }
  return true;
};
</script>

<template>
  <div class="relative">
    <!-- Overlay de carga -->
    <Overlay :clientCode="clientCode" :task="task" />
    <delete-loading-overlay v-if="deleting" />
    <div ref="cardRef" :class="cardStyles" v-bind="props">
      <!-- Content -->
      <div class="h-full">
        <input
          :class="InputStyles"
          :autofocus="focus"
          :value="task.title"
          @input="updateTitle"
        />
        <textarea
          :class="TextareaStyles"
          :value="task.description"
          @input="updateDescription"
        ></textarea>
      </div>
      <!-- Footer -->
      <div class="flex items-end justify-between font-medium pt-7">
        {{ task.createdAt.toLocaleString("ES") }}
        <button @click="onClickDelete()" :class="ButtonDeleteStyles">
          <trash-icon />
        </button>
      </div>
    </div>
  </div>
</template>
  