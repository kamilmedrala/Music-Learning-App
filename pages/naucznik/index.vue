<template>
  <div>
    <div class="py-10">
      <nuxt-link class="group block w-full h-full" to="/start">
        <span
          class="font-main text-xl md:text-2xl transition duration-300 hover:text-green-3000"
        >
          〈 Back
        </span>
      </nuxt-link>
      <HeaderTitle title="Naucznik" />
      <div>
        <ul class="flex flex-wrap w-full gap-5">
          <li class="w-1/2 md:w-[300px] aspect-square">
            <nuxt-link
              class="group block w-full h-full"
              to="/naucznik/fur-elise"
            >
              <div
                class="w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"
              >
                Fur-Elise
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("setCurrentMode", "idle");
  },
};
</script>

<style></style>
