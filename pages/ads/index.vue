<script setup lang="ts"></script>
<template>
  <Head>
    <Title>Adverts</Title>
  </Head>
  <section>
    <header class="page_header">
      <h1 class="page_title">Adverts</h1>
      <NuxtLink href="/ads/create" class="header_action_button"
        >Create New Ad</NuxtLink
      >
    </header>
    <ListOfAds />
  </section>
</template>
<style lang="scss"></style>
