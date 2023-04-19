<script setup lang="ts">
const adDetails: any = useState('adDetails', () => null);
const route = useRoute();
const companytoken = useCookie('betrelatecompanytoken');

const getAdvertDetails = async () => {
  const res: any = await getSingleAd(companytoken.value, route.params.adID);
  console.log(res.data);
  adDetails.value = res.data;
};

getAdvertDetails();

const cancelCompanyAdvert = catchAsyncError(async () => {
  // const res = await
});
</script>

<template>
  <section class="view_ad_page">
    <Head>
      <Title>Advert Insight</Title>
    </Head>
    <div class="header_text">
      <h1>
        <NuxtLink :href="`/ads`" class="back_button">
          <i class="pi pi-angle-left"></i
        ></NuxtLink>
        Advert Insight
      </h1>
    </div>
    <div class="advert_insight">
      <div class="advert_overview">
        <div class="advert_image">
          <img :src="adDetails.asset" alt="advert-image" />
        </div>
        <div class="advert_overview_details">
          <div class="ad_date start">
            <span class="caption">Start Date</span>
            <span class="date">{{
              simpleDateFormat(adDetails.startDate)
            }}</span>
          </div>
          <div class="ad_date end">
            <span class="caption">End Date</span>
            <span class="date">{{ simpleDateFormat(adDetails.endDate) }}</span>
          </div>
          <div class="ad_status">
            <span class="caption">Status</span>
            <span :class="`status ${adDetails.status}`">{{
              adDetails.status
            }}</span>
          </div>
          <div class="ad_action">
            <span class="caption">Action</span>
            <div class="action_options">
              <NuxtLink :href="`/ads/${route.params.adID}`" class="action">
                Edit
              </NuxtLink>
              <span><i class="pi pi-trash"></i></span>
            </div>
          </div>
        </div>
      </div>
      <div class="advert_details">
        <div class="advert_audience">
          <h3>Audience</h3>
          <div class="audience_details_container">
            <div class="audience_left">
              <AdsAudienceDoughnut :data="adDetails.stats.reach" />
            </div>
            <div class="audience_right">
              <div class="audience_reach_stat">
                Total Reach:<span>{{ adDetails.stats.impressions }}</span>
              </div>
              <div class="audience_reach_stat">
                Men:<span>{{
                  adDetails.stats.reach.find(
                    (el: any) => el._id.gender === 'male'
                  )
                    ? adDetails.stats.reach.find(
                        (el: any) => el._id.gender === 'male'
                      ).count
                    : 0
                }}</span>
              </div>
              <div class="audience_reach_stat">
                Women:<span>{{
                  adDetails.stats.reach.find(
                    (el: any) => el._id.gender === 'female'
                  )
                    ? adDetails.stats.reach.find(
                        (el: any) => el._id.gender === 'female'
                      ).count
                    : 0
                }}</span>
              </div>
            </div>
          </div>
          <div class="audience_impression_details">
            <div class="impression_info">
              <span>Impressions</span>
              <span class="impression_count">{{
                adDetails.stats.impressions
              }}</span>
            </div>
            <div class="impression_info">
              <span>Clicks</span>
              <span class="impression_count">{{ adDetails.stats.clicks }}</span>
            </div>
          </div>
        </div>
        <div class="advert_spending_analysis">
          <h3>Spending Analysis</h3>
          <div class="spending_analysis_header">
            <div class="spending_info">
              <h2>Budget</h2>
              <h5 style="font-size: 2.4rem; line-height: 2.8rem">
                N{{ adDetails.totalAmount }}
              </h5>
            </div>
            <div class="spending_info">
              <h2>Days left</h2>
              <h5>
                {{ adDetails.daysLeft }} Day{{
                  adDetails.daysLeft === 1 ? '' : 's'
                }}
              </h5>
            </div>
          </div>
          <div class="spending_info">
            <h2>Amount Spent</h2>
            <h5>
              N{{ adDetails.amountSpent }} Of N{{ adDetails.totalAmount }}
            </h5>
            <div class="budget_progress_bar">
              <div
                class="progress_bar_indicator"
                :style="{
                  width: `${
                    (adDetails.amountSpent / adDetails.totalAmount) * 100
                  }%`
                }"
              ></div>
            </div>
          </div>
          <div class="spending_info">
            <h2>Ad Placement</h2>
            <h5>
              <span v-for="placement in adDetails.placements"
                >{{ '' }}{{ placement.name }} {{ '' }}</span
              >
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="take_advert_action_buttons">
      <button class="boost_ad_button">Boost Again</button>
      <button class="cancel_ad_button">Cancel Advert</button>
    </div>
  </section>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';

.view_ad_page {
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.9rem;
  .advert_insight {
    display: flex;
    flex-direction: column;
  }
  .advert_overview,
  .advert_overview_details {
    color: #404040;
    align-items: center;
    display: flex;
    align-items: center;
    gap: 1.7rem;
    border-bottom: 0.1rem solid #eeeeee;
    width: 100%;
    background-color: white;
    border-radius: 1rem;
  }
  .advert_overview {
    flex-direction: column;
    padding: 1.6rem 1rem;

    @include tablet {
      flex-direction: row;
      padding: 1.6rem 3rem;
    }
  }
  .advert_image {
    @include centerImage;
    border-radius: 1rem;
    width: 100%;
    height: auto;
    @include tablet {
      width: 6rem;
      height: 6rem;
    }
  }
  .advert_overview_details {
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
  .ad_date.end {
    display: none;
    @include largephone {
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
      padding: 0.6rem 1.7rem;
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
    .action_options {
      display: flex;
      align-items: center;
      gap: 1rem;
      .pi {
        font-size: 1.8rem;
        cursor: pointer;
        color: var(--primary-color);
      }
    }
  }
  @include tablet {
    flex-direction: row;
  }

  .advert_details {
    display: flex;
    gap: 1.3rem;
    margin: 3rem 0rem;
    flex-direction: column;
    @include tablet {
      flex-direction: row;
    }
    .advert_audience,
    .advert_spending_analysis {
      flex: 1rem;
      background-color: white;
      border-radius: 1rem;
      padding: 1.5rem;
      @include tablet {
        padding: 2.5rem;
      }
      h3 {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 1.9rem;
        color: #000000;
      }
    }
    .audience_details_container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.1rem solid #999999;
      padding-bottom: 1rem;
      gap: 1rem;
      max-width: 100%;
      .audience_left,
      .audience_right {
        flex: 1;
        max-width: 50%;
        min-width: 50%;
      }
      .audience_reach_stat {
        display: flex;
        justify-content: space-between;
        margin: 2rem 0rem;
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 180%;
        color: #404040;
      }
    }
    .audience_impression_details {
      margin-top: 3rem;
      display: flex;
      gap: 8rem;
      padding: 0rem 2rem;
      .impression_info {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 1.6rem;
        color: #999999;
        .impression_count {
          font-weight: 700;
          font-size: 1.6rem;
          line-height: 1.9rem;
          color: #150b1d;
        }
      }
    }
    .advert_spending_analysis {
      .spending_info {
        margin-bottom: 4rem;
      }
      .spending_analysis_header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 3rem;
      }
      h2,
      h5 {
        margin: 0rem;
      }
      h2 {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 1.6rem;
        color: #999999;
        margin-top: 0.2rem;
        margin-bottom: 0.7rem;
      }
      .budget_progress_bar {
        width: 100%;
        height: 1rem;
        border-radius: 1rem;
        background: #f5f5f5;
        margin: 1rem 0rem;
      }
      .progress_bar_indicator {
        width: 2%;
        background-color: var(--primary-color);
        height: 100%;
        border-radius: 1rem;
        transition: 0.5s;
        max-width: 100%;
      }
    }
  }
  .take_advert_action_buttons {
    display: flex;
    align-items: center;
    gap: 1.4rem;
    button {
      outline: none;
      border: none;
      background-color: transparent;
      cursor: pointer;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 1.9rem;
      padding: 1.8rem;
      border-radius: 0.4rem;
      flex: 1;
      width: max-content;
      @include tablet {
        flex: none;
        width: 18.2rem;
      }
    }
    .boost_ad_button {
      background-color: var(--light-purple);
      color: var(--primary-color);
    }
    .cancel_ad_button {
      background-color: #ffdfdc;
      color: var(--error-color);
    }
  }
}
</style>
