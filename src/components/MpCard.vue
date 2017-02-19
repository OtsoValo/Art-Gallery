<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="mpSrc">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image" style="height: 40px; width: 40px;">
            <img :src="mpArtist" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{mpTitle}}</p>
          <p class="subtitle is-6">{{mpSubTitle}}</p>
        </div>
      </div>

      <div class="content">
        {{mpContent}}
        <br>
        <small>11:09 PM - 1 Jan 2016</small>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mpCard',
    props: {
      mpSrc: String,
      mpArtist: {
        type: String,
        default: 'http://bulma.io/images/placeholders/96x96.png'
      },
      mpTitle: String,
      mpSubTitle: String,
      mpContent: String 
    }
  }
</script>

<style>

</style>