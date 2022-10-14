<template>
  <div
    class="w-full h-full min-h-screen flex flex-col md:flex-row justify-center md:justify-between items-center"
  >
    <div>
      <HeaderTitle
        title="Nutkomat"
        subtext="Learn how to play music Real-Time using only your microphone!"
      />
      <nuxt-link
        to="start"
        class="inline-block ml-7 mb-5 px-5 pt-2 pb-1 border border-solid border-green-3000 font-body text-lg text-green-3000 rounded-full hover:bg-green-2000/10 bg-green-1000/10 backdrop-blur-sm filter-fix transition duration-300"
      >
        Get Started
      </nuxt-link>
    </div>
    <HomeIllustration />
  </div>
</template>

<script>
import HeaderTitle from "../components/HeaderTitle.vue";
import HomeIllustration from "../components/HomeIllustration.vue";
export default {
  name: "HomePage",
  components: { HeaderTitle, HomeIllustration },
  mounted() {
    this.$store.commit("setCurrentMode", "idle");
  },
};
</script>
