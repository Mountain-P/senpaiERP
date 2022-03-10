<template>
  <div class="d-flex align-center justify-center fill-height">
    <div class="text-center">
      <div class="display-4">
        <span v-if="error">
          {{ error.status }}
          {{ error.message }}
        </span>
        <span v-else>404 找不到此網頁</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
