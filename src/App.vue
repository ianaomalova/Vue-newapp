<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <br>
        <my-button @click="showDialog" style="margin-top: 15px;">Создать пост</my-button>
    <my-dialog v-model:show="dialogVisible">
        <post-form @create="CreatePost"/>
    </my-dialog>
    <post-list
            :posts="posts"
            @remove="RemovePost"
    />
    </div>
</template>

<script>
    import PostForm from "@/components/PostForm";
    import PostList from "@/components/PostList";
    import MyDialog from "@/components/UI/MyDialog";
    export default {
        components: {
            MyDialog,
            PostList,
            PostForm
        },
        data() {
            return{
                posts: [
                    {id: 1, title: 'Name', body: 'Body'},
                    {id: 2, title: 'Name 2', body: 'Body 2'}
                ],
                title: '',
                body: '',
                dialogVisible: false,
            }
        },
        methods: {
            CreatePost(post) {
                this.posts.push(post)
                this.dialogVisible = false
            },
            RemovePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showDialog() {
                this.dialogVisible = true
            }
        }
    }
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

form {
    display: flex;
    flex-direction: column;
}

    .app {
        padding: 20px;
    }

</style>