(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{422:function(t,l,r){"use strict";r.r(l);r(37);var o={components:{SettingsModal:r(265).default},computed:{storedName:function(){var t=this.$store.getters.getSettings.name;return t&&(t=", "+t),t}},methods:{openSettingsModal:function(){this.$store.commit("setSettings",{type:"modalActive",data:!0})}},mounted:function(){this.$store.commit("setCurrentMode","idle")}},e=r(39),component=Object(e.a)(o,(function(){var t=this,l=t._self._c;return l("div",{staticClass:"h-full"},[l("div",[l("div",{staticClass:"py-10"},[l("h3",{staticClass:"text-2xl md:text-3xl"},[t._v("Hello"+t._s(t.storedName)+"!")])]),t._v(" "),l("ul",{staticClass:"flex flex-wrap w-full"},[l("li",{staticClass:"w-1/2 md:w-[300px] p-2.5 aspect-square"},[l("nuxt-link",{staticClass:"group block w-full h-full",attrs:{to:"/stroik"}},[l("div",{staticClass:"w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"},[t._v("\n            Stroik\n          ")])])],1),t._v(" "),l("li",{staticClass:"w-1/2 md:w-[300px] p-2.5 aspect-square"},[l("nuxt-link",{staticClass:"group block w-full h-full",attrs:{to:"/naucznik"}},[l("div",{staticClass:"w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"},[t._v("\n            Naucznik\n          ")])])],1),t._v(" "),l("li",{staticClass:"w-1/2 md:w-[300px] p-2.5 aspect-square"},[l("nuxt-link",{staticClass:"group block w-full h-full",attrs:{to:"/nagrywnik"}},[l("div",{staticClass:"w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"},[t._v("\n            Nagrywnik\n          ")])])],1),t._v(" "),l("li",{staticClass:"w-1/2 md:w-[300px] p-2.5 aspect-square"},[l("nuxt-link",{staticClass:"group block w-full h-full",attrs:{to:"/"}},[l("div",{staticClass:"w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300"},[t._v("\n            〈 Exit\n          ")])])],1),t._v(" "),l("li",{staticClass:"w-1/2 md:w-[300px] p-2.5 aspect-square"},[l("div",{staticClass:"group block w-full h-full cursor-pointer"},[l("div",{staticClass:"w-full h-full p-3 md:p-5 bg-white border border-solid border-white group-hover:border-brown-1000 rounded-md font-main text-2xl md:text-3xl transition duration-300",on:{click:function(l){return t.openSettingsModal()}}},[t._v("\n            Settings\n          ")])])])])])])}),[],!1,null,null,null);l.default=component.exports}}]);