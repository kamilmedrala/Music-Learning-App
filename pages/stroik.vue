<template>
  <div>
    <div class="py-10">
      <nuxt-link class="group block w-full h-full" to="/">
        <span
          class="font-main text-xl md:text-2xl transition duration-300 hover:text-green-3000"
        >
          〈 Back
        </span>
      </nuxt-link>
    </div>
    <div>
      <HeaderTitle title="Stroik" />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("setCurrentMode", "tuner");
  },
};
</script>

<style></style>
