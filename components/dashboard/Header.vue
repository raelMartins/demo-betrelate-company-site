<script setup lang="ts">
const showNotifs = useState<boolean>('showNotifs', () => false);
const notifications = useState<any[]>('allNotifications', () => []);
const loading = useState<boolean>('loadingNotifs', () => false);
const profile = useState<any>('profile');

const token = useCookie('betrelatecompanytoken').value;

const getNotifications = catchAsyncError(async () => {
  try {
    loading.value = true;
    const res = await getAllNotifications(token);
    // const res: any = [];
    notifications.value = res;
    console.log(res);

    loading.value = false;
  } catch (err: any) {
    loading.value = false;
    throw err;
  }
});
onMounted(() => {
  getNotifications();
});

const openNotifs = () => {
  showNotifs.value = true;
  getNotifications();
};
</script>
<template>
  <header class="dashboard_header">
    <div class="header_container">
      <div class="company_notifications" @click="openNotifs">
        <i class="pi pi-bell"></i>
        <!-- <SvgsNotificationSVG /> -->
        <span class="unread_notifications" v-if="notifications.length > 0">{{
          notifications.length
        }}</span>
      </div>
      <div class="company_info">
        <div class="company_text">
          <div class="company_name">{{ profile.companyName }}</div>
          <div class="company_type">BUSINESS ACCOUNT</div>
        </div>
        <div class="company_image">
          <img :src="profile.profilePic" alt="nothing really" />
        </div>
      </div>
    </div>
    <hr />
  </header>
</template>
<style lang="scss">
@import '~/assets/styles/mixins.module.scss';
.dashboard_header {
  .header_container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;
  }
  .company_notifications {
    padding: 0.1rem 1rem;
    cursor: pointer;
    position: relative;
    .pi {
      font-size: 3.6rem;
      color: var(--form-text);
    }
    .unread_notifications {
      position: absolute;
      bottom: 0.2rem;
      right: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.2rem;
      height: 1.6rem;
      min-width: 1.6rem;
      border-radius: 1.6rem;
      background-color: red;
      color: white;
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 1.6rem;
      text-align: center;
      letter-spacing: var(--letter-spacing);
    }
  }
  .company_info {
    background-color: white;
    border-radius: 0.4rem;
    padding: 1.8rem;
    display: flex;
    gap: 2.2rem;
  }
  .company_image {
    @include centerImage;
    width: 4rem;
    height: 4rem;
  }
  .company_name {
    font-size: 1.4rem;
    line-height: 1.6rem;
    font-weight: 400;
    color: #000000;
    margin-bottom: 0.4rem;
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
    width: calc(100% + 3rem);
    margin: 2rem 0rem;
    margin-left: -3rem;
  }
}
</style>
