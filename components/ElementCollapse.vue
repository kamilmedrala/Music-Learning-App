<template>
  <div class="rounded-2xl bg-white overflow-hidden">
    <div class="flex justify-between w-full p-3" @click="toggleCollapse()">
      <span
        class="block pr-3 w-full text-xl whitespace-nowrap overflow-ellipsis overflow-hidden"
      >
        {{ selected }}
      </span>
      <div class="flex items-center">
        <svg
          class="stroke-current text-green-3000 rotate-180 transition duration-300"
          :class="{ 'rotate-0': collapsed }"
          width="20"
          height="11"
          viewBox="0 0 20 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 1L9.64645 9.14645C9.84171 9.34171 10.1583 9.34171 10.3536 9.14645L18.5 1"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
    <div
      class="w-full transition-all duration-300"
      ref="container"
      :style="{ height: collapsed ? '0px' : this.containerHeight + 'px' }"
    >
      <ul class="w-full h-full">
        <li
          v-for="(option, index) in options"
          :key="index"
          class="px-3 hover:bg-gray-300 transition duration-200"
          @click="selectOption(option)"
        >
          <div class="py-2 border-t border-gray-500">
            <span
              class="block w-full whitespace-nowrap overflow-hidden overflow-ellipsis"
              >{{ option }}</span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElementCollapse",
  props: {
    options: Array,
    defaultSelect: {
      type: String,
      default: "Wybierz",
    },
  },
  data() {
    return {
      selected: this.defaultSelect,
      collapsed: true,
    };
  },
  watch: {
    defaultSelect(value) {
      this.selected = value;
    },
  },
  computed: {
    containerHeight() {
      return this.$refs.container.scrollHeight;
    },
  },
  methods: {
    toggleCollapse() {
      if (this.options.length > 0) {
        this.collapsed = !this.collapsed;
      }
    },
    selectOption(name) {
      this.selected = name;
      this.toggleCollapse();
      this.$emit("optionSelect", this.selected);
    },
  },
};
</script>

<style></style>
