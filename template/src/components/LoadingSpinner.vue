<!--
As of now, please refer to wan_admin* or ntn_admin* projects to see how this works.

This is usually used to prevent the user from clicking anything else until an async process 
that usually takes a while takes place. At the same time, the spinner is shown to let the
users know that something is working based on what they did. The majority of the async
process do not take a while anyways. But sometimes, they don't take a while but the 
front-end has not been notified, we show this inside a setTimeout with 1000 value just to
show to the user that they need to wait to prevent app crashes or freezing.
-->

<template>
<div class="spinner-mask">
<div class="spinner-wrapper">
<div class="spinner-container">
<div class="spinner spinner--style1" title="0">
  <svg version="1.1" id="spinner-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="80px" height="80px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.35" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.5s"
      repeatCount="indefinite"/>
  </path>
  </svg>
</div>
</div>
</div>
</div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style>
.spinner-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.spinner-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.spinner-container {
  margin: auto;
  padding: 0;
  min-width: 20vw;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  /*margin-top: 10vh;*/
}

.spinner{
  margin: 0 0 2em;
  height: 100px;
  width: 20%;
  text-align: center;
  padding: 1em;
  margin: 0 auto;
  display: block;
  vertical-align: top;
}

/*
  Set the color of the icon
*/
svg path,
svg rect{
  fill: #FF6700;
}

</style>
