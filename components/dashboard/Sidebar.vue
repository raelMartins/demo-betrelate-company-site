<script setup lang="ts">
const show = ref(true);
const profile = useState<any>('profile');

const showNav = () => {
  show.value = !show.value;
};
</script>
<template>
  <div class="sidebar_container">
    <div class="sidebar_hamburger_menu" @click="showNav">
      <i class="pi pi-bars"></i>
    </div>
    <div
      class="dashboard_sidebar"
      :style="show ? { transform: 'translateX(0%)' } : {}"
    >
      <div class="close_button" @click="showNav">
        <i class="pi pi-times"></i>
      </div>
      <div class="logo">
        <SvgsBetrelateSVG />
      </div>
      <div class="company_info">
        <div class="company_image">
          <img :src="profile.profilePic" alt="nothing really" />
        </div>
        <div class="company_name">{{ profile.companyName }}</div>
        <div class="company_type">BUSINESS ACCOUNT</div>
      </div>
      <hr />
      <nav class="navigation_links">
        <NuxtLink href="/dashboard" class="nav_link"
          ><SvgsDashboardSVG />Dashboard</NuxtLink
        >
        <NuxtLink href="/adverts" class="nav_link"
          ><i class="pi pi-megaphone"></i>Adverts</NuxtLink
        >
        <NuxtLink href="/transaction-history" class="nav_link"
          ><i class="pi pi-dollar"></i>Transaction History</NuxtLink
        >
      </nav>
    </div>
  </div>
</template>
<style lang="scss">
@import '~/assets/styles/mixins.module.scss';
.sidebar_container {
  position: relative;
  .sidebar_hamburger_menu {
    position: absolute;
    top: 1.6rem;
    left: 1.6rem;
    cursor: pointer;
    color: var(--primary-color);
    .pi {
      font-size: 2.6rem;
    }
  }
}
.dashboard_sidebar {
  width: 18rem;
  padding: 3.2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: fixed;
  top: 0rem;
  left: 0rem;
  bottom: 0rem;
  background-color: white;
  box-shadow: var(--primary-box-shadow);
  transform: translateX(-100%);
  transition: 0.3s;
  z-index: 5;
  @include desktop {
    position: sticky;
    transform: translateX(0%);
    top: 0;
    box-shadow: none;
  }
  .close_button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.6rem;
    cursor: pointer;
    color: var(--primary-color);
    @include desktop {
      display: none;
    }
  }
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
      .pi {
        color: var(--primary-color);
        font-size: 2rem;
        margin-right: 0.3rem;
      }
    }
  }
}
</style>
