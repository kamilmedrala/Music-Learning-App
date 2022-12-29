<template>
  <div class="h-full">
    <div>
      <div class="py-10">
        <h3 class="text-2xl md:text-3xl">Hello{{ storedName }}!</h3>
      </div>
      <ul class="flex flex-wrap w-full">
        <li class="w-1/2 md:w-[300px] p-2.5 aspect-square">
          <nuxt-link class="group block w-full h-full" to="/stroik">
            <div
              class="w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"
            >
              Stroik
            </div>
          </nuxt-link>
        </li>
        <li class="w-1/2 md:w-[300px] p-2.5 aspect-square">
          <nuxt-link class="group block w-full h-full" to="/naucznik">
            <div
              class="w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"
            >
              Naucznik
            </div>
          </nuxt-link>
        </li>
        <li class="w-1/2 md:w-[300px] p-2.5 aspect-square">
          <nuxt-link class="group block w-full h-full" to="/nagrywnik">
            <div
              class="w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"
            >
              Nagrywnik
            </div>
          </nuxt-link>
        </li>
        <li class="w-1/2 md:w-[300px] p-2.5 aspect-square">
          <nuxt-link class="group block w-full h-full" to="/">
            <div
              class="w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"
            >
              〈 Exit
            </div>
          </nuxt-link>
        </li>
        <li class="w-1/2 md:w-[300px] p-2.5 aspect-square">
          <div class="group block w-full h-full cursor-pointer">
            <div
              class="w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"
              @click="openSettingsModal()"
            >
              Settings
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SettingsModal from "../components/SettingsModal.vue";
export default {
  components: { SettingsModal },
  computed: {
    storedName() {
      let name = this.$store.getters.getSettings.name;
      if (name) name = ", " + name;
      return name;
    },
  },
  methods: {
    openSettingsModal() {
      this.$store.commit("setSettings", {
        type: "modalActive",
        data: true,
      });
    },
  },
  mounted() {
    this.$store.commit("setCurrentMode", "idle");
  },
};
</script>

<style></style>
