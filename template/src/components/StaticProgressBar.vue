<!--
As of now, please refer to wan_admin* or ntn_admin* projects to see how this works.
-->
<template>
<div class="progress">
  <div
   class="progress-bar"
   :class="{'progress-bar-striped': striped, 'active': active}"
   role="progressbar"
   aria-valuenow="100"
   aria-valuemin="100"
   aria-valuemax="100" style="width:100%">
    <!-- <span class="sr-only">70% Complete</span> -->
  </div>
</div>
</template>

<script>
export default {
  props: {
    striped: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
