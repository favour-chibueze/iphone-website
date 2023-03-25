<template>
    <Button class="ips-btn" @click="emit('submitForm')">
        <slot></slot>
    </Button>
</template>


<script setup>
    import {defineEmits} from 'vue'


    const emit = defineEmits(['submitForm']);
</script>
