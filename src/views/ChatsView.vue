<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const chats = ref([]);
const route = useRoute();
//const router = useRouter();

watch(() => route.params, (val) => {
    console.log('update params', val);
    chats.value = [
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

    ];
}, { immediate: true })

</script>
<template>
    <div>
        <aside>
            <div v-for="chat in chats" :key="chat.id">
                <RouterLink :to="`/chats/${chat.id}`">{{ chat.name }}</RouterLink>
            </div>
        </aside>
        <article>
            <RouterView />
        </article>

    </div>
</template>