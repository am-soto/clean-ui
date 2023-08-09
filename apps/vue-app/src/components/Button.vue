<template>
    <button :class="StyleClass" @click="onClick">
        <slot />
    </button>
</template>
  
<script lang="ts">
import { ButtonStyles, Colors } from 'ui'
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Button',
    props: {
        color: {
            required: false,
            type: String,
            default: Colors.black
        }
    },

    computed: {
        StyleClass(): string {
            return `${ButtonStyles({ color: this.color })}`;
        },
    },

    methods: {
        onClick(): void {
            this.$emit('click');
        },
    },
});
</script>
  