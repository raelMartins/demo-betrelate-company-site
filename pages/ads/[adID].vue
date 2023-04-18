<script setup lang="ts"></script>

<template>
  <section class="view_ad_page">
    <div class="header_text">
      <h1>
        <NuxtLink :href="`/ads`" class="back_button">
          <i class="pi pi-angle-left"></i
        ></NuxtLink>
        Advert Insight
      </h1>
    </div>
    <div class="advert_insight">
      <div class="advert_overview"></div>
      <div class="advert_details">
        <div class="advert_audience"></div>
        <div class="advert_spending_analysis"></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss"></style>
