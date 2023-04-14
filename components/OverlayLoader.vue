<script setup lang="ts">
const props = defineProps(['test']);

console.log(props.test);

const styling = ref({
  display: `none`,
  opacity: `0`,
  backgroundColor: `white`
});
</script>

<template>
  <div className="{styles.overlay}" id="overlay_loader" :style="styling">
    <i class="pi pi-spin pi-spinner"></i>

    <!-- <RotatingLines
        width="50"
        strokeColor={dark ? `white` : `#673692`}
        strokeWidth="1.5"
      /> -->
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
  opacity: 0;
  // background-color: white !important;
  // background-color: black !important;
  .pi {
    font-size: 3rem;
  }
}
</style>
