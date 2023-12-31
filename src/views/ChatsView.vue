<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
//const router = useRouter();

const chats = reactive([
    {
        id: 1,
        name: 'Juan'
    },
    {
        id: 2,
        name: 'Jose'
    },
    {
        id: 3,
        name: 'Julian'
    }

]);

</script>
<template>
    <div>
        <aside>
            <div v-for="chat in chats" :key="chat.id">
                <RouterLink :to="`/chats/${chat.id}`">{{ chat.name }}</RouterLink>
            </div>
        </aside>
        <article>{{ route.params.chatId }}</article>

    </div>
</template>