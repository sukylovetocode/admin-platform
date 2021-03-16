<template>
    <img :src="pic" />
</template>

<script>
export default {
    name: 'Picture',
    props: {
        pic: String,
    },
};
</script>
