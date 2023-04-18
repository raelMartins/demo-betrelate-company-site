<script setup lang="ts">
const profile = useState('profile', () => null);

const getCompanyProfile = async () => {
  try {
    const companytoken = useCookie('betrelatecompanytoken').value;
    // const newToken = await checkLoggedIn();
    const res: any = await getProfile(companytoken);
    console.log(res.data);

    profile.value = res.data;
  } catch (err) {
    catchServerSideError(err);
  }
};

getCompanyProfile();
</script>

<template>
  <main class="main" v-if="profile">
    <DashboardSidebar />
    <div class="content">
      <DashboardHeader />
      <DashboardNotificationSidebar />
      <slot />
    </div>
  </main>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';
.main {
  display: flex;
  min-height: 100vh;
  .content {
    flex: 1;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    padding: 1rem;
    background-color: white;
    @include tablet {
      background: #f6f6f6;
      padding: 3rem;
    }
    .page_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .page_title {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.3rem;
      letter-spacing: var(--letter-spacing);
      color: #404040;
      margin: 2.3rem 0rem;
    }
  }
  .header_action_button {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.6rem;
    text-align: center;
    color: var(--primary-color);
    background-color: var(--light-purple);
    border-radius: 0.4rem;
    border: none;
    outline: none;
    padding: 1.4rem 1rem;
    cursor: pointer;
  }
}
</style>
