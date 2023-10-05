<script setup lang="ts">
import { ref, computed } from "vue";
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
const internalTask = ref(props.task)


const cardStyles = computed(() => CardStyles({ color: props.task.color }));

const updateTitle = (event: any) => {
  if (isEditable()) {
    const newTitle = event.target.value;
    internalTask.value = { ...props.task, title: newTitle, clientCode: LocalService.get("client-code") ?? "", }
    emit("update", internalTask.value);
  }
};

const updateDescription = (event: any) => {
  if (isEditable()) {
    const newDescription = event.target.value;
    internalTask.value = { ...props.task, description: newDescription, clientCode: LocalService.get("client-code") ?? "", }
    emit("update", internalTask.value);
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

const isEditedByMe = computed(() => {
  return internalTask.value.clientCode === LocalService.get("client-code")

})
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
        <input :class="InputStyles" :value="internalTask.title" @input="updateTitle" :maxLength="20" />
        <textarea :class="TextareaStyles" :value="internalTask.description" @input="updateDescription" />
      </div>
      <!-- Footer -->
      <div class="flex items-end justify-between font-medium pt-7">
        <img :src="`data:image/svg+xml;utf8,${encodeURIComponent(
          avatar(internalTask.clientCode, { size: 100 }).trim()
        )}`" height="32" width="32" class="transition-all scale-100 rounded-full hover:scale-150" :class="` ${isEditedByMe && 'outline outline-2 outline-offset-2 hover:outline-none'
  } `" />
        <button @click="onClickDelete()" :class="ButtonDeleteStyles">
          <trash-icon />
        </button>
      </div>
    </div>
  </div>
</template>
  