<template>
    <div class="container">
        <nav class="cov-nav">
            {{msg}}
        </nav>
    </div>
</template>

<script>

export default {
    data () {
        return {
            msg: 'App demo'
        }
    }
}
</script>

<style>
    html {
        font-size: 62.5%;
        font-family: Hiragino Sans GB,Helvetica,Arial,STHeiti,WenQuanYi Micro Hei,sans-serif;
    }
    * {
        padding: 0;
        margin: 0;
    }
    body {
        background-color: #F5F5F5;
    }
    .container {
        max-width: 80rem;
        margin-left: auto;
        margin-right: auto;
        padding-top: 7rem;
    }
    .cov-nav {
        position: fixed;
        height: 6rem;
        width: 100%;
        background-color: #252e39;
        top: 0;
        left: 0;
        z-index: 2;
        font-size: 1.5rem;
        color: #fff;
    }
</style>