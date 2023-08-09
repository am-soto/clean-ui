<template>
    <div :class="StyleClass">
        <p>
            <slot name="content" />
        </p>
        <div class="flex items-center justify-between pt-1">
            <slot name="footer" />
        </div>
    </div>
</template>
  
<script lang="ts">
import { CardStyles, Colors } from 'ui'
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Card',
    props: {
        color: {
            required: false,
            type: String,
            default: Colors.orange
        }
    },

    computed: {
        StyleClass(): string {
            return `${CardStyles({ color: this.color })}`;
        },
    },
});
</script>
  