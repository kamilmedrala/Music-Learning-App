<template>
  <div class="h-full">
    <Transition name="zoom">
      <!-- TODO: move modal to nav in layout to be accesible everywhere, here in start.vue shoud be forcefully opened on mounted -->
      <SettingsModal v-if="modalActive" />
    </Transition>
    <Transition name="zoom">
      <div v-if="!modalActive">
        <div class="py-10">
          <h3 class="text-2xl md:text-3xl">Hello{{ storedName }}!</h3>
        </div>
        <ul class="flex flex-wrap w-full gap-5">
          <li class="w-1/2 md:w-[300px] aspect-square">
            <nuxt-link class="group block w-full h-full" to="/">
              <div
                class="w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"
              >
                Stroik
              </div>
            </nuxt-link>
          </li>
          <li class="w-1/2 md:w-[300px] aspect-square">
            <nuxt-link class="group block w-full h-full" to="/">
              <div
                class="w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"
              >
                〈 Exit
              </div>
            </nuxt-link>
          </li>
          <li class="w-1/2 md:w-[300px] aspect-square">
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
    </Transition>
  </div>
</template>

<script>
import SettingsModal from "../components/SettingsModal.vue";
export default {
  components: { SettingsModal },
  methods: {
    openSettingsModal() {
      this.$store.commit("setSettings", {
        type: "modalActive",
        data: true,
      });
    },
  },
  computed: {
    modalActive() {
      return this.$store.getters.getSettings.modalActive;
    },
    storedName() {
      let name = this.$store.getters.getSettings.name;
      if (name) name = ", " + name;
      return name;
    },
  },
};
</script>

<style></style>
