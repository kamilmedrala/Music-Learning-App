<template>
  <div class="max-w-[400px]">
    <h1 class="text-black">{{ title }}</h1>
    <p v-if="subtext" class="text-green-3000 mb-5">
      {{ subtext }}
    </p>
  </div>
</template>

<script>
export default {
  name: "HeaderTitle",
  props: {
    title: {
      type: String,
      default: "Title",
      required: true,
    },
    subtext: {
      type: String,
    },
  },
};
</script>

<style></style>
