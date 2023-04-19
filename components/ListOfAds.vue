<script setup lang="ts">
const ads: any = ref([]);
const noOfAds = ref(0);
const status = ref('');
const loading = ref(false);

const switchTab = async (tab: string) => {
  status.value = tab;
  await getAllAds();
};

const token = useCookie('betrelatecompanytoken').value;

const getAllAds = catchAsyncError(async () => {
  try {
    loading.value = true;
    const res: any = await getAds(token, { status: status.value });
    console.log(res);
    ads.value = res.data;
    noOfAds.value = res.data.length;
    loading.value = false;
  } catch (err) {
    loading.value = false;
    throw err;
  }
});

onMounted(() => {
  setTimeout(() => {
    getAllAds();
  }, 10);
});

const activestyle = 'background-color: var(--primary-color); color: white';
</script>

<template>
  <section class="ads_list">
    <div class="ad_filters">
      <span
        class="filter_option"
        @click="switchTab('')"
        :style="status === '' ? activestyle : ``"
        >All</span
      >
      <span
        class="filter_option"
        @click="switchTab('pending')"
        :style="status === 'pending' ? activestyle : ``"
        >Pending</span
      >
      <span
        class="filter_option"
        @click="switchTab('active')"
        :style="status === 'active' ? activestyle : ``"
        >Active</span
      >
      <!-- <span
        class="filter_option"
        @click="switchTab('completed')"
        :style="status === 'completed' ? activestyle : ``"
        >Completed</span
      > -->
      <span
        class="filter_option"
        @click="switchTab('rejected')"
        :style="status === 'rejected' ? activestyle : ``"
        >Inactive</span
      >
    </div>
    <div class="ad_total">
      <div class="total">Total Ads: {{ noOfAds }}</div>
      <div class="view_all">View All</div>
    </div>
    <ul class="list_of_ads">
      <OverlayLoader :loading="loading" />
      <li class="ad_list_item" v-for="advert in ads">
        <div class="advert_image">
          <img :src="advert.asset" alt="advert-image" />
        </div>
        <div class="ad_date start">
          <span class="caption">Start Date</span>
          <span class="date">{{ simpleDateFormat(advert.startDate) }}</span>
        </div>
        <div class="ad_date end">
          <span class="caption">End Date</span>
          <span class="date">{{ simpleDateFormat(advert.endDate) }}</span>
        </div>
        <div class="ad_status">
          <span class="caption">Status</span>
          <span :class="`status ${advert.status}`">{{ advert.status }}</span>
        </div>
        <div class="ad_action">
          <span class="caption">Action</span>
          <NuxtLink :href="`/ads/${advert.adID}`" class="action">
            View <span>Details</span>
          </NuxtLink>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';

.ads_list {
  background-color: white;
  border-radius: 1rem;
  min-height: 50rem;
  // height: 100%;
  height: 100%;
  padding: 4rem 1rem;
  @include tablet {
    padding: 4rem 3rem;
  }
  .ad_filters {
    align-items: center;
    gap: 0.8rem;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    margin-bottom: 1.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @include tablet {
      display: flex;
    }
    .filter_option {
      padding: 1.2rem 2rem;
      text-align: center;
      color: #999999;
      background: #ececec;
      border-radius: 0.4rem;
      flex: 1;
      // width: 10rem;
      max-width: 100%;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: var(--primary-color);
        color: white;
      }
    }
  }
  .ad_total {
    padding: 2.2rem 3rem;
    margin-left: -3rem;
    border-bottom: 0.1rem solid #eeeeee;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.8rem;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .view_all {
      color: var(--primary-color);
    }
  }
  .list_of_ads {
    margin: 0rem;
    padding: 0rem;
    list-style: none;
    position: relative;
    min-height: 20rem;
  }
  .ad_list_item {
    color: #404040;
    display: flex;
    gap: 1.7rem;
    border-bottom: 0.1rem solid #eeeeee;
    padding: 1.6rem 0.6rem;
    width: 100%;
    @include tablet {
      padding: 1.6rem 3rem;
    }
    .advert_image {
      @include centerImage;
      width: 6rem;
      height: 6rem;
      border-radius: 1rem;
    }
    .ad_date,
    .ad_status,
    .ad_action {
      flex: 1;
      display: flex;
      flex-direction: column;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 1.6rem;
      color: #404040;
      gap: 1.2rem;
      align-items: flex-start;
      .caption {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 1.4rem;
        color: #999999;
      }
    }
    .ad_date.start {
      display: none;
      @include largephone {
        display: flex;
      }
      @include laptop {
        display: none;
      }
      @include desktop {
        display: flex;
      }
    }
    .ad_status {
      .status {
        text-transform: capitalize;
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 1.4rem;
        text-align: center;
        // color: #999999;
        padding: 0.6rem 1.4rem;
        min-width: max-content;
        // background: #dadada;
        // border: 0.1rem solid #dadada;
        border-radius: 0.4rem;
        color: #dc8744;
        background: #fff3d2;
        border: 0.1rem solid #f6c358;
      }
      .pending {
        color: #999999;
        background: #dadada;
        border: 0.1rem solid #dadada;
      }
      .rejected {
        color: var(--error-color);
        background-color: #ffebe9;
        border: 0.1rem solid var(--error-color);
      }
      .completed {
        color: var(--success-color);
        background-color: #e7ffeb;
        border: 0.1rem solid var(--success-color);
      }
    }
    .ad_action {
      flex: none;
      text-decoration: underline;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 1.9rem;
      a > span {
        display: none;
      }
      @include desktop {
        a > span {
          display: inline;
        }
      }
    }
    @include tablet {
      flex-direction: row;
    }
  }
}
</style>
