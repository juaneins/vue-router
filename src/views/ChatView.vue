<script setup>
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';

const messages = reactive([
    {
        id: 1,
        text: 'mensaje 1',
        author: 1
    },
    {
        id: 2,
        text: 'mensaje 2',
        author: 2
    },
    {
        id: 3,
        text: 'mensaje 3',
        author: 3
    },
]);

const route = useRoute();

const filteredMessages = computed(() =>
    messages.filter(msg =>
        `${msg.author}` === route.params.chatId
    )
)

</script>
<template>
    <div v-for="msg in filteredMessages" :key="msg.id">
        {{ msg.text }}
    </div>
</template>