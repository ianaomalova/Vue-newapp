<template>
    <form @submit.prevent>
        <h3>Создание поста</h3>
        <my-input v-focus v-model="post.title" class="input" type="text" placeholder="Название"/>
        <my-input v-model="post.body" class="input" type="text" placeholder="Описание"/>
        <my-button class="btn" @click="CreatePost" style="align-self: flex-end; margin-top: 15px">Создать пост</my-button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                post: {
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            CreatePost() {
                this.post.id = Date.now()
                this.$emit('create', this.post)
                this.post = {
                    title: '',
                    body: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>