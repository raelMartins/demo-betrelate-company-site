<script setup lang="ts">
const adverts: any = ref([]);
const noOfAds = ref(0);
const activeTab = ref('all');

const switchTab = catchAsyncError(async (tab: string) => {
  activeTab.value = tab;
  await getAllAdverts();
});

const token = useCookie('betrelatecompanytoken').value;

const getAllAdverts = async () => {
  const res: any = await getAds(token);
  console.log(res);

  adverts.value = res.data;
  noOfAds.value = res.data.length;
};

getAllAdverts();

const activestyle = 'background-color: var(--primary-color); color: white';
</script>

<template>
  <section class="adverts_list">
    <div class="advert_filters">
      <span
        class="filter_option"
        @click="switchTab('all')"
        :style="activeTab === 'all' ? activestyle : ``"
        >All</span
      >
      <span
        class="filter_option"
        @click="switchTab('ongoing')"
        :style="activeTab === 'ongoing' ? activestyle : ``"
        >Ongoing</span
      >
      <span
        class="filter_option"
        @click="switchTab('completed')"
        :style="activeTab === 'completed' ? activestyle : ``"
        >Completed</span
      >
      <span
        class="filter_option"
        @click="switchTab('rejected')"
        :style="activeTab === 'rejected' ? activestyle : ``"
        >Rejected</span
      >
    </div>
    <div class="advert_total">
      <div class="total">Total Ads: {{ noOfAds }}</div>
      <div class="view_all">View All</div>
    </div>
    <ul class="list_of_ads">
      <li class="ad_list_item" v-for="advert in adverts">
        <div class="company_image">
          <img :src="advert.asset" alt="company-image" />
        </div>
        <div class="advert_date">
          <span class="caption">Start Date</span>
          <span class="date">{{ simpleDateFormat(advert.startDate) }}</span>
        </div>
        <div class="advert_date">
          <span class="caption">End Date</span>
          <span class="date">{{ simpleDateFormat(advert.endDate) }}</span>
        </div>
        <div class="advert_status">
          <span class="caption">Status</span>
          <span class="status">{{ advert.status }}</span>
        </div>
        <div class="advert_action">
          <span class="caption">Action</span>
          <NuxtLink :href="`/adverts/${advert.adID}`" class="action">
            View Details
          </NuxtLink>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';

.adverts_list {
  background-color: white;
  padding: 4rem 3rem;
  border-radius: 1rem;
  min-height: 50rem;
  // height: 100%;
  .advert_filters {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    margin-bottom: 1.2rem;
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
  .advert_total {
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
  }
  .ad_list_item {
    color: #404040;
    align-items: center;
    display: flex;
    align-items: center;
    gap: 1.7rem;
    border-bottom: 0.1rem solid #eeeeee;
    padding: 1.6rem 3rem;
    margin-left: -3rem;
    width: 100%;
    .company_image {
      @include centerImage;
      width: 6rem;
      height: 6rem;
      border-radius: 1rem;
    }
    .advert_date,
    .advert_status,
    .advert_action {
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
    .advert_status {
      .status {
        text-transform: capitalize;
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 1.4rem;
        text-align: center;
        // color: #999999;
        padding: 0.6rem 1.7rem;
        // background: #dadada;
        // border: 0.1rem solid #dadada;
        border-radius: 0.4rem;
        color: #dc8744;
        background-color: #fff3d2;
        border: 0.1rem solid #f6c358;
      }
    }
    .advert_action {
      text-decoration: underline;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 1.9rem;
    }
    @include tablet {
      flex-direction: row;
    }
  }
}
</style>
