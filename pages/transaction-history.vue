<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout'
});
</script>
<template>
  <NuxtLayout>
    <Head>
      <Title>Transaction History</Title>
    </Head>
    <section>
      <header class="page_header">
        <h1 class="page_title">Transaction History</h1>
        <NuxtLink href="/ads/create" class="header_action_button"
          >Create New Ad</NuxtLink
        >
      </header>
      <ListOfTransactions />
    </section>
  </NuxtLayout>
</template>
<style lang="scss"></style>
