<template>
  <div class="relative min-h-screen bg-green-1000 px-[5%] md:px-[10%]">
    <Transition name="zoom">
      <SettingsModal v-if="modalActive && this.$route.name != 'index'" />
    </Transition>

    <Transition name="zoom">
      <div
        v-if="!modalActive || this.$route.name == 'index'"
        class="relative z-10 mx-auto w-full container h-full min-h-screen"
      >
        <Nuxt />
      </div>
    </Transition>
    <BgStrings />
  </div>
</template>

<script>
export default {
  computed: {
    modalActive() {
      return this.$store.getters.getSettings.modalActive;
    },
  },
};
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
