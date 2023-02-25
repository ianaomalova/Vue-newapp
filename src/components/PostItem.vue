<template>
    <div class="post">
        <div>
            <div><strong>ID: </strong>{{post.id}}</div>
            <div><strong>Название: </strong> {{post.title}}</div>
            <div><strong>Описание: </strong> {{post.body}}</div>
        </div>
        <div class="post__btns">
            <my-button @click="RemovePost">Удалить</my-button>
            <my-button @click="this.$router.push(`/posts/${post.id}`)">Открыть</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            post : {
                type: Object,
                require: true
            }
        },
        methods: {
            RemovePost() {
                this.$emit('remove', this.post)
            }
        }
    }
</script>

<style scoped>
    .post {
        padding: 15px;
        border: 2px solid teal;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .post__btns {
        display: flex;
    }
</style>