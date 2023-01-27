<script setup>
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue'
  import axios from 'axios'

  const title = ref()
  const article = ref()
  const author = ref()
  const thumbnail = ref()
  const route = useRoute();
  onMounted(() => {
    const blog_detail = route.params.blog_detail
    axios.get(`blogs/${blog_detail}`)
      .then(response => {
        title.value = response.data.title
        article.value = response.data.article
        author.value = response.data.author.username
        thumbnail.value = response.data.thumbnail.url
        console.log(response.data)
        document.title = 'Blog | ' + title.value
      })
      .catch(error => {
        console.log(error)
      })
  })
</script>

<template>
  <div class="home mx-auto px-3 mb-5" style="max-width: 1000px;">
    <h1 class="mt-2 text-center">{{ title }}</h1>
    <img :src="url + thumbnail" class="d-block img-fluid mb-2 mx-auto">
    <div class="mb-3">
      <b class="mt-2 text-capitalize">by {{ author }}</b>
    </div>
    <div v-html="article"></div>
  </div>
</template>