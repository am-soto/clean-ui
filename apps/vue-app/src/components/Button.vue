<template>
    <button :class="StyledClass">
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
        StyledClass(): string {
            return `${ButtonStyles({ color: this.color })}`;
        },
    },
});
</script>
  