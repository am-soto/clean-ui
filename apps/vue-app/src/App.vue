
<script setup="ts">
import { ButtonStyles, CardStyles, Colors } from "ui";
</script>

<template>
    <h1 className="text-3xl font-bold underline bg-lime">Hello Hiberus from Vue!</h1>
    <button type="button" :class="ButtonStyles({ color: Colors.black })">
        +
    </button>

    <div :class="CardStyles({ color: Colors.red })">
        <div class="h-full overflow-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum
        </div>
    </div>
</template>
