<template>
  <div class="relative min-h-screen bg-green-1000 px-[5%] md:px-[10%]">
    <div class="relative z-10 mx-auto w-full container h-full min-h-screen">
      <Nuxt />
    </div>
    <BgStrings />
  </div>
</template>

<script>
export default {};
</script>

<style>
.page-enter-active,
.page-leave-active {
  @apply transform transition duration-300;
}
.page-enter,
.page-leave-to {
  @apply -translate-y-7 opacity-0;
}

.zoom-enter-active,
.zoom-leave-active {
  @apply transform transition duration-300;
}
.zoom-enter,
.zoom-leave-to {
  @apply scale-90 opacity-0;
}
</style>
