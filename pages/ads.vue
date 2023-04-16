<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout'
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
.header_text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
  h1 {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-weight: 600;
    font-size: 2rem;
    line-height: 2.3rem;
    letter-spacing: var(--letter-spacing);
    color: #404040;
    margin: 0rem;
    .back_button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.4rem;
      border-radius: 0.6rem;
      background: #f5e9ff;
      color: var(--primary-color);
      cursor: pointer;
      .pi {
        font-size: 3rem;
      }
    }
  }
}
</style>
