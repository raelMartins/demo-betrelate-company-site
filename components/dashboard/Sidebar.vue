<script setup lang="ts"></script>
<template>
  <div class="dashboard_sidebar">
    <div class="logo">
      <SvgsBetrelateSVG />
    </div>
    <div class="company_info">
      <div class="company_image">
        <img src="/images/betrelate-icon.png" alt="nothing really" />
      </div>
      <div class="company_name">Betrelate</div>
      <div class="company_type">BUSINESS ACCOUNT</div>
    </div>
    <hr />
    <nav class="navigation_links">
      <NuxtLink href="/dashboard" class="nav_link"
        ><SvgsDashboardSVG />Dashboard</NuxtLink
      >
      <NuxtLink href="/adverts" class="nav_link"
        ><SvgsDashboardSVG />Adverts</NuxtLink
      >
      <NuxtLink href="/transaction-history" class="nav_link"
        ><SvgsDashboardSVG />Transaction History</NuxtLink
      >
    </nav>
  </div>
</template>
<style lang="scss">
@import '~/assets/styles/mixins.module.scss';
.dashboard_sidebar {
  width: 18rem;
  padding: 3.2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: sticky;
  top: 0;
  .logo {
    margin-bottom: 4.2rem;
  }
  .company_info {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    align-items: center;
  }
  .company_image {
    @include centerImage;
    width: 6rem;
    height: 6rem;
  }
  .company_name {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: #404040;
  }
  .company_type {
    text-transform: uppercase;
    padding: 0.4rem 0.7rem;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2rem;
    color: var(--primary-color);
    background-color: var(--light-purple);
    border-radius: 0.4rem;
  }
  hr {
    width: calc(100% + 16rem);
    margin: 2rem 0rem;
    margin-left: -8rem;
  }
  .navigation_links {
    list-style: none;
    margin: 0rem;
    padding: 0rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .router-link-active {
      color: var(--primary-color) !important;
    }
    .nav_link {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 180%;
      padding: 0.6rem 0.2rem;
      // background-color: var(--light-purple);
      border-radius: 0.4rem;
      color: #6e6378;
    }
  }
}
</style>
