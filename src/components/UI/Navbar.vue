<template>
    <div class="navbar">
        <div @click="this.$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <my-button
                    style="margin-left: 15px;"
                    @click="this.$router.push('/posts')"
            >Посты
            </my-button>
            <my-button
                    style="margin-left: 10px;"
                    @click="this.$router.push('/about')"
            >О нас</my-button>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
    .navbar__btns {
        margin-left: auto;
    }
</style>