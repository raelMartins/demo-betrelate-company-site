<script setup lang="ts">
const props = defineProps(['loading', 'dark']);
const styling = ref({
  display: `none`,
  opacity: `0`,
  backgroundColor: props.dark ? `black` : `white`,
  color: props.dark ? `white` : `#673692`
});

// console.log(props.loading);

watch(
  () => props.loading,
  (loading) => {
    if (loading) {
      styling.value = {
        ...styling.value,
        display: `flex`,
        opacity: `0`
      };
      setTimeout(() => {
        styling.value = {
          ...styling.value,
          display: `flex`,
          opacity: `.7`
        };
      }, 200);
    } else {
      styling.value = {
        ...styling.value,
        display: `flex`,
        opacity: `0`
      };
      setTimeout(() => {
        styling.value = {
          ...styling.value,
          display: `none`,
          opacity: `0`
        };
      }, 200);
    }
  }
);

const noLoadStyling = {
  display: `none`,
  opacity: `0`,
  backgroundColor: props.dark ? 'black' : 'white',
  color: props.dark ? 'white' : '#673692',
  transition: 'opacity 2s, display .2s ease-in-out .2s'
};

const loadingStyle = {
  display: 'flex',
  opacity: '.7',
  backgroundColor: props.dark ? 'black' : 'white',
  color: props.dark ? 'white' : '#673692',
  // transition: 'display 2s, opacity .2s ease-in-out .2s'
  transition: 'opacity 2s, display .2s ease-in-out .2s'
};

console.log(props.loading);
</script>

<template>
  <div class="overlay" id="overlay_loader" :style="styling">
    <i class="pi pi-spin pi-spinner"></i>
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: 0.2s;
  // opacity: 0;
  background-color: white;
  color: var(--primary-color);
  // background-color: white !important;
  // background-color: black !important;
  .pi {
    font-size: 4rem;
  }
}
</style>
