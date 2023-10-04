<template>
    <edit-overlay v-if="!isEditable" />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Overlay',
    props: {
        clientCode: {
            required: true,
            type: String,
        },
        task: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            interval: 0 as any,
            dateNow: new Date()
        };
    },

    computed: {
        isEditable(): boolean {
            if (this.clientCode !== this.task.clientCode) {
                const differenceInSeconds =
                    (this.dateNow.getTime() - this.task.updatedAt.getTime()) / 1000;
                return differenceInSeconds > 5;
            }
            return true;
        }
    },
    methods: {
        time() {
            this.dateNow = new Date()
        }
    },
    mounted() {
        this.interval = setInterval(() => this.time(), 100);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
});
</script>
  