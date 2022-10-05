<template>
  <div class="relative min-h-screen bg-green-1000">
    <div
      class="relative z-10 px-[5%] md:px-[10%] h-screen mx-auto max-w-screen-2xl"
    >
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

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-main text-5xl md:text-7xl;
}

p,
button,
span,
b {
  @apply font-body text-base md:text-lg;
}
</style>
