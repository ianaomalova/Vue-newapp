<template>
    <div class="app">
        <h1>Страница с постами: </h1>
        <my-input style="width: 100%" v-model="searchQuery" placeholder="Поиск..."/>

        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select
                    v-model:model-value1="selectedSort"
                    :options="sortOptions"
            />
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form @create="CreatePost"/>
        </my-dialog>

        <post-list
                :posts="sortedAndSearchPost"
                @remove="RemovePost"
                v-if="!isPostLoading"
        />

        <div v-else>Идет загрузка...</div>
        <!--        <div class="page__wrapper">-->
        <!--            <div-->
        <!--                    v-for="pageNumber in totalPages"-->
        <!--                    :key="pageNumber"-->
        <!--                    class="page"-->
        <!--                    :class="{-->
        <!--                        'current-page' : page === pageNumber-->
        <!--                    }"-->
        <!--                    @click="changePage(pageNumber)"-->
        <!--            >-->
        <!--                {{ pageNumber }}-->
        <!--            </div>-->
        <!--        </div>-->
        <div v-intersaction="loadMorePost" class="observer">

        </div>
    </div>
</template>

<script>
    import PostForm from "@/components/PostForm";
    import PostList from "@/components/PostList";
    import MyDialog from "@/components/UI/MyDialog";
    import axios from 'axios'
    import MySelect from "@/components/UI/MySelect";
    export default {
        components: {
            MySelect,
            MyDialog,
            PostList,
            PostForm
        },
        data() {
            return{
                posts: [],
                dialogVisible: false,
                isPostLoading: false,
                selectedSort: '',
                sortOptions: [
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ],
                searchQuery: '',
                page: 1,
                limit: 10,
                totalPages: 0
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
            },
            async fetchPost() {
                try {
                    console.log('Fetch')
                    this.isPostLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                    //console.log(response.data);
                    this.posts = response.data;
                } catch (e) {
                    alert('Ошибка')
                } finally {
                    this.isPostLoading = false;
                }
            },
            async loadMorePost() {
                try {
                    console.log('Load')
                    this.page += 1;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                    //console.log(response.data);
                    this.posts = [...this.posts, ...response.data];
                } catch (e) {
                    alert('Ошибка')
                } finally {

                }
            }
            // changePage(pageNumber) {
            //     this.page = pageNumber;
            // }
        },
        mounted() {
            this.fetchPost();
            console.log('Mounted')
            //console.log(this.$refs.observer)
            // const options = {
            //     rootMargin: '0px',
            //     threshold: 1.0
            // }
            //
            // const callback = (entries, observer) => { //это как раз та функция, которая отработает, когда мы пересекли необходимвй элемент
            //     if(entries[0].isIntersecting && this.page < this.totalPages) {
            //         this.loadMorePost();
            //     }
            // }
            //
            // const observer = new IntersectionObserver(callback, options);
            // observer.observe(this.$refs.observer)
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((post1, post2) =>
                    post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                )
            },
            sortedAndSearchPost() {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        },
        watch: {
            // page() {
            //     this.fetchPost();
            // }
        }
    }
</script>

<style scoped>


    form {
        display: flex;
        flex-direction: column;
    }


    .app__btns {
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
    }
    .page__wrapper {
        display: flex;
        margin-top: 15px;
        align-items: center;
        align-content: center;
        justify-content: center;
    }
    .page {
        border: 1px solid black;
        padding: 10px;
        margin-right: 5px;
    }
    .current-page {
        border: 2px solid teal;
    }
</style>