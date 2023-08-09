<template>
    <div class="p-5">
        <h1 className="text-3xl font-bold underline bg-lime">Hello Hiberus from Vue!</h1>
        <Button>+asd</Button>
        <Card :color="colors.blue">
            <template #content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum
            </template>
            <template #footer>
                <div>date</div>
                <Button>+</Button>
            </template>
        </Card>
    </div>
</template>


<script lang="ts">
import { Color, Colors } from "ui";
import { defineComponent } from 'vue';

import Button from './components/Button.vue';
import Card from './components/Card.vue';
export default defineComponent({
    name: 'App',
    components: {
        Button,
        Card
    },
    computed: {
        colors(): Color {
            return Colors;
        },
    },
})
</script>