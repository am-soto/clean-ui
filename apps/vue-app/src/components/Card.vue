<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  CardStyles,
  InputStyles,
  TextareaStyles,
  ButtonDeleteStyles,
} from "ui";
import Overlay from "./Overlay.vue";
import avatar from "animal-avatar-generator";
import { LocalService } from "utils";

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
});

const deleting = ref(false);
const cardRef = ref(null);
const focusTitle = ref(false);
const isEditedByMe = ref(false);

const cardStyles = computed(() => CardStyles({ color: props.task.color }));

const updateTitle = (event: any) => {
  if (isEditable()) {
    const newTitle = event.target.value;
    emit("update", { ...props.task, title: newTitle });
    isEditedByMe.value = true
  }
};

const updateDescription = (event: any) => {
  if (isEditable()) {
    const newDescription = event.target.value;
    emit("update", { ...props.task, description: newDescription });
    isEditedByMe.value = true
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

watch(() => props.task, () => {
  isEditedByMe.value = props.task.clientCode === LocalService.get("client-code")
});

</script>

<template>
  <div class="relative  ml-[7px] mb-[7px]" @onFocus="() => focusTitle = true" @onBlur="() => focusTitle = false" :class="focusTitle
    ? 'outline outline-[#555] rounded-2xl outline-offset-4' : ''">
    <!-- Overlay de carga -->
    <Overlay :clientCode="clientCode" :task="task" />
    <delete-loading-overlay v-if="deleting" />
    <div ref="cardRef" :class="cardStyles" v-bind="props">
      <!-- Content -->
      <div class="h-full">
        <input :class="InputStyles" :value="task.title" @input="updateTitle" :maxLength="20" />
        <textarea :class="TextareaStyles" :value="task.description" @input="updateDescription" />
      </div>
      <!-- Footer -->
      <div class="flex items-end justify-between font-medium pt-7">
        <span v-if="isEditedByMe">Editada por ti</span>
        <img v-else :src="`data:image/svg+xml;utf8,${encodeURIComponent(
          avatar(task.clientCode, { size: 100 }).trim()
        )}`" height="32" width="32"
          class="transition-all scale-100 rounded-full outline outline-2 outline-offset-2 hover:scale-150 hover:outline-none" />
        <button @click="onClickDelete()" :class="ButtonDeleteStyles">
          <trash-icon />
        </button>
      </div>
    </div>
  </div>
</template>
  