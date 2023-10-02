<script setup>
import { ref, computed, onMounted, defineEmits } from "vue";
import { CardStyles, InputStyles, TextareaStyles, ButtonDeleteStyles } from 'ui'

const emit = defineEmits(['delete', 'update'])

const props = defineProps({
    color: {
        type: String,
        default: "orange",
    },
    task: {
        type: Object,
        required: true,
    },
    focus: Boolean,
});

const deleting = ref(false);
const cardRef = ref(null);
const color = ref('orange')

onMounted(() =>
    props.task &&
    (color.value = props.task.color)
)

const cardStyles = computed(() => CardStyles({ color: color.value }))

const updateTitle = (event) => {
    const newTitle = event.target.value;
    emit('update', { ...props.task, title: newTitle });

};

const updateDescription = (event) => {
    const newDescription = event.target.value;
    emit('update', { ...props.task, description: newDescription });
};

const onClickDelete = () => {
    deleting.value = true
    emit('delete', props.task)
};
</script>

<template>
    <div class="relative">
        <!-- Overlay de carga -->
        <delete-loading-overlay v-if="deleting" />
        <div ref="cardRef" :class="cardStyles" v-bind="props">
            <!-- Content -->
            <div class="h-full">
                <input :class="InputStyles" :autofocus="focus" :value="task.title" @input="updateTitle" />
                <textarea :class="TextareaStyles" :value="task.description" @input="updateDescription"></textarea>
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
  