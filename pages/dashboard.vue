<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout'
});
</script>
<template>
  <NuxtLayout>
    <Head>
      <Title>Dashboard</Title>
    </Head>
    <section class="dashboard_content">
      <header class="page_header">
        <h1 class="page_title">Dashboard</h1>
        <NuxtLink href="/ads/create" class="header_action_button"
          >Create New Ad</NuxtLink
        >
      </header>
      <div class="dashboard_container">
        <div class="dashboard_left_content">
          <WalletBalance />
          <ListOfTransactions />
        </div>
        <div class="dashboard_right_content">
          <ListOfAds />
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
<style lang="scss">
@import '~/assets/styles/mixins.module.scss';
.dashboard_content {
  max-width: 100%;
  .dashboard_container {
    display: flex;
    gap: 0.6rem;
    flex-direction: column;
    margin-bottom: 3rem;
    @include laptop {
      flex-direction: row;
    }
    .dashboard_left_content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .dashboard_right_content {
      flex: 1;
      gap: 2rem;
    }
  }
}
</style>
