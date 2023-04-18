<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { ImagePickerType } from '~~/utils/custom_types';

const loading = ref(true);
const placementsSelected = ref(false);
const placements: any = ref([]);
const selectedPlacements: any = ref([]);
// const
const adType = ref('image');
const adDescription = ref('');
const adAsset: any = ref('');
const adAction = ref('');
const adUrl = ref('');
const adAudience = ref('');
const adInterests: any = ref(['1', '2', '3', '4']);
const startDate = ref(yearFirstDateFormat(Date.now() + 86400000));
const days = ref(1);

const companytoken = useCookie('betrelatecompanytoken');

const getAvailableAdPlacements = async () => {
  try {
    const res: any = await getAdPlacements(companytoken.value);
    console.log(res);
    placements.value = res.data;
  } catch (err: any) {
    console.error(err);
    console.log(err.response);
  }
};

onMounted(async () => {
  await getAvailableAdPlacements();
});

const togglePlacement = (placement: any) => {
  const selectedEl = selectedPlacements.value.find(
    (el: any) => el.placementID === placement.placementID
  );

  if (selectedEl) {
    const filteredArr = selectedPlacements.value.filter(
      (el: any) => el.placementID !== placement.placementID
    );
    selectedPlacements.value = [...filteredArr];
  } else {
    selectedPlacements.value = [...selectedPlacements.value, placement];
  }
  console.log(selectedPlacements.value);
};
//using the below two functions when actually selecting an image from your device
const selectImage = (data: ImagePickerType) => {
  adAsset.value = data;
  return data;
};

const getImage = () => {
  uploadImageWithPreview(selectImage);
};

const createThisAdvert = catchAsyncError(async (e: any) => {
  e.target.disabled = true;
  e.preventDefault();
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append('description', adDescription.value);
    if (adType.value !== 'text') {
      formData.append('asset', adAsset.value.imageFile);
    }
    formData.append('action', adAction.value);
    formData.append('redirectUrl', adUrl.value);
    formData.append('type', adType.value);
    formData.append('targetAudience', adAudience.value);
    for (let i: number = 0; i < selectedPlacements.value.length; i++) {
      formData.append(
        `placements[${i}]`,
        selectedPlacements.value[i].placementID
      );
    }
    for (let i: number = 0; i < adInterests.value.length; i++) {
      formData.append(`interests[${i}]`, adInterests.value[i]);
    }
    formData.append('startDate', startDate.value);
    formData.append(
      'endDate',
      yearFirstDateFormat(Date.parse(startDate.value) + 86400000 * days.value)
    );
    // Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    const res = await createAdvert(companytoken.value, formData);
    console.log(res);
    toast.success('Advert created successfully!');
    location.assign('/ads');
  } catch (err) {
    loading.value = false;
    throw err;
  }
});
</script>

<template>
  <section class="create_ad_page">
    <div class="header_text">
      <h1>
        <NuxtLink :href="`/ads`" class="back_button">
          <i class="pi pi-angle-left"></i
        ></NuxtLink>
        Create Advert
      </h1>
    </div>
    <div class="ad_form_container">
      <OverlayLoader :loading="loading" />
      <form class="select_ad_placement" v-if="!placementsSelected">
        <h4 class="ad_form_header">Where will this ad show</h4>
        <p class="ad_form_sub_header">
          Kindly select where you want this advert to show
        </p>
        <div class="ad_form_field" v-for="placement in placements">
          <div class="radio_option" @click="() => togglePlacement(placement)">
            <span
              :class="`radio ${
                selectedPlacements.find((elmn:any) => elmn.placementID === 
                placement.placementID)
                  ? 'active'
                  : ''
              }`"
            ></span>
            <span class="radio_title"
              ><b> {{ placement.name }} </b>
              <span
                >Price: &#8358;{{
                  Intl.NumberFormat('en-US').format(placement.amount || 0)
                }}
                Per Ad</span
              ></span
            >
          </div>
        </div>
        <div class="submit_button">
          <button
            @click="placementsSelected = true"
            :disabled="selectedPlacements.length === 0"
          >
            Next
          </button>
        </div>
      </form>
      <form class="ad_form" v-else @submit="createThisAdvert">
        <h4 class="ad_form_header">Kindly provide the following details</h4>
        <div class="ad_form_field">
          <label>Advert Type</label>
          <div class="radio_buttons">
            <div class="radio_option" @click="adType = 'image'">
              <span
                :class="`radio ${adType === 'image' ? `active` : ''}`"
              ></span>
              <span class="radio_title">Image</span>
            </div>
            <div class="radio_option disabled">
              <span
                :class="`radio ${adType === 'video' ? `active` : ''}`"
              ></span>
              <span class="radio_title">Video</span>
            </div>
            <div class="radio_option disabled">
              <span
                :class="`radio ${adType === 'text' ? `active` : ''}`"
              ></span>
              <span class="radio_title">Text Only</span>
            </div>
          </div>
        </div>

        <div class="ad_form_field">
          <label style="font-weight: 600">Ad Description</label>
          <textarea
            class="custom_input_design ad_description"
            placeholder="Enter Description"
            v-model="adDescription"
          />
        </div>
        <div class="ad_form_field">
          <div
            class="custom_input_design upload_image_or_video"
            v-if="adType === 'image' || adType === 'video'"
            @click="getImage"
            :style="
              adAsset.imagePreview && adAsset.dimensions.height
                ? {
                    width: adAsset.dimensions.width,
                    height: adAsset.dimensions.height
                  }
                : {}
            "
          >
            <img
              v-if="adAsset.imagePreview"
              :src="adAsset.imagePreview"
              alt="Advert Image"
            />
            <div class="content_container" v-else>
              <i class="pi pi-image"></i>
              <h4>Upload an image</h4>
              <h6>(Max size of 2mb)</h6>
            </div>
          </div>
        </div>
        <div class="ad_form_field">
          <label>Start Date</label>
          <input
            type="date"
            class="custom_input_design"
            v-model="startDate"
            :min="startDate"
          />
        </div>
        <div class="ad_form_field">
          <div class="custom_input_design days_range_selector">
            <div class="day_range_details">
              <div class="budget_details">
                <h3>Total Amount</h3>
                <h4>
                  &#8358;{{
                    Intl.NumberFormat('en-US').format(
                      selectedPlacements.reduce(
                        (total: number, abc: any) => total + abc.amount,
                        0
                      ) * days
                    )
                  }}
                </h4>
                <div class="selected_placement_details">
                  <span v-for="placement in selectedPlacements"
                    >{{ placement.name }} - &#8358;{{
                      Intl.NumberFormat('en-US').format(placement.amount)
                    }}</span
                  >
                </div>
              </div>
              <div class="days">
                <h4>{{ days }} day{{ days == 1 ? '' : 's' }}</h4>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              v-model="days"
              class="day_slider"
            />
          </div>
        </div>
        <div class="ad_form_field">
          <label>Select Action</label>
          <div class="radio_buttons">
            <div class="radio_option" @click="adAction = 'Learn more'">
              <span
                :class="`radio ${adAction === 'Learn more' ? `active` : ''}`"
              ></span>
              <span class="radio_title">Learn more</span>
            </div>
            <div class="radio_option" @click="adAction = 'Download'">
              <span
                :class="`radio ${adAction === 'Download' ? `active` : ''}`"
              ></span>
              <span class="radio_title">Download now</span>
            </div>
            <div class="radio_option" @click="adAction = 'Web visit'">
              <span
                :class="`radio ${adAction === 'Web visit' ? `active` : ''}`"
              ></span>
              <span class="radio_title">Visit website</span>
            </div>
            <div class="radio_option" @click="adAction = 'Shop'">
              <span
                :class="`radio ${adAction === 'Shop' ? `active` : ''}`"
              ></span>
              <span class="radio_title">Shop now</span>
            </div>
          </div>
        </div>
        <div class="ad_form_field">
          <label>Url Link</label>
          <input
            type="text"
            class="custom_input_design"
            placeholder="Enter Url Link"
            v-model="adUrl"
          />
        </div>
        <div class="ad_form_field">
          <label>Target Audience</label>
          <div class="radio_buttons">
            <div class="radio_option" @click="adAudience = 'everyone'">
              <span
                :class="`radio ${adAudience === 'everyone' ? `active` : ''}`"
              ></span>
              <span class="radio_title">Everyone</span>
            </div>
            <div class="radio_option" @click="adAudience = 'female'">
              <span
                :class="`radio ${adAudience === 'female' ? `active` : ''}`"
              ></span>
              <span class="radio_title">Women Only</span>
            </div>
            <div class="radio_option" @click="adAudience = 'male'">
              <span
                :class="`radio ${adAudience === 'male' ? `active` : ''}`"
              ></span>
              <span class="radio_title">Men Only</span>
            </div>
          </div>
        </div>
        <!-- <div class="ad_form_field">
          <label>Select Interest</label>
          <div class="input_container">
            <input
              type="text"
              class="custom_input_design"
              placeholder="Select Interest"
            />
            <button>+ Add</button>
          </div>
        </div> -->
        <div class="submit_button">
          <button @click="createThisAdvert">Submit Advert</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';
.create_ad_page {
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9rem;
  .ad_form_container {
    background-color: white;
    position: relative;
  }
  .select_ad_placement,
  .ad_form {
    margin: 0rem auto;
    padding: 3.6rem 1rem;
    @include tablet {
      padding: 3.6rem 0rem;
    }
    .ad_form_header {
      font-weight: 700;
      font-size: 2rem;
      line-height: 2.3rem;
      letter-spacing: var(--letter-spacing);
      color: var(--primary-color);
      margin: 0rem;
      margin-bottom: 3rem;
    }
    .ad_form_field {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      margin-bottom: 3rem;
      label {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 1.9rem;
        letter-spacing: var(--letter-spacing);
        color: var(--form-text);
      }
      //everything regarding radios
      .radio_buttons {
        display: flex;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
        @include tablet {
          gap: 3.6rem;
        }
      }
      .radio_option {
        display: flex;
        gap: 1rem;
        align-items: center;
        cursor: pointer;
        .radio {
          border-radius: 50%;
          background-color: white;
          height: 1.4rem;
          width: 1.4rem;
          border: 0.1rem solid #c4c4c4;
        }
        .radio.active {
          background-color: var(--primary-color);
          border: 0.3rem solid var(--light-purple);
          height: 1.4rem;
          width: 1.4rem;
        }
        .radio_title {
          font-weight: 400;
          font-size: 1.6rem;
          line-height: 1.9rem;
          letter-spacing: var(--letter-spacing);
          color: #000000;
        }
      }
      .radio_option.disabled {
        opacity: 0.3;
        color: grey;
        cursor: not-allowed;
        .radio {
          background-color: grey;
        }
      }

      //custom input style
      .custom_input_design {
        outline: none;
        background: rgba(225, 215, 233, 0.2);
        border: 0.1rem solid rgba(154, 121, 182, 0.9);
        border-radius: 0.8rem;
        padding: 1.9rem 1.7rem;
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 1.9rem;
        width: 100%;
        &::placeholder {
          color: #c4c4c4;
        }
      }
      .ad_description {
        resize: none;
        height: 10.4rem;
        &::placeholder {
          color: var(--form-text);
        }
      }
      .upload_image_or_video {
        min-height: 18.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin: 0rem auto;
        max-width: 100%;
        cursor: pointer;
        padding: 0rem;
        img {
          object-fit: cover;
          max-width: 100%;
        }
        .content_container {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          .pi {
            font-size: 4rem;
            color: #9747ff;
          }
          h4,
          h6 {
            font-weight: 600;
            font-size: 1.4rem;
            line-height: 1.6rem;
            text-align: center;
            letter-spacing: 0.08em;
            color: var(--form-text);
            margin: 0rem;
          }
          h6 {
            font-weight: 400;
          }
        }
      }
      .days_range_selector {
        background-color: var(--primary-color);
        min-height: 19rem;
        color: white;
        padding: 2rem 1rem;
        @include tablet {
          padding: 2rem;
        }
        .day_range_details {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 2.8rem;

          h3,
          h4,
          h5 {
            margin: 0rem;
          }
          h3 {
            font-weight: 500;
            font-size: 1.2rem;
            line-height: 100%;
          }
          h4 {
            font-weight: 600;
            font-size: 2.4rem;
            line-height: 100%;
          }
          .budget_details {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .selected_placement_details {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 1.7rem;
              font-weight: 500;
              font-size: 1.4rem;
              line-height: 1.6rem;
            }
          }
        }
        .day_slider {
          -webkit-appearance: none;
          width: 100%;
          height: 1rem;
          border-radius: 1rem;
          background-color: whitesmoke;
          transition: opacity 0.2s;
          cursor: pointer;
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            background-color: var(--primary-color);
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            border: 0.4rem solid var(--light-purple);
            box-shadow: var(--primary-box-shadow);
            outline: 0.1rem solid var(--primary-color);
            cursor: pointer;
          }

          &::-moz-range-thumb {
            appearance: none;
            background-color: var(--primary-color);
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            border: 0.4rem solid var(--light-purple);
            box-shadow: 0px 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
            cursor: pointer;
          }
        }
      }
      .input_container {
        display: flex;
        gap: 1rem;
        button {
          @include darkButton;
          font-weight: 500;
          font-size: 1.6rem;
          line-height: 1.9rem;
          letter-spacing: var(--letter-spacing);
          padding: 1.9rem;
          min-width: max-content;
        }
      }
    }
    .submit_button {
      padding: 2.4rem 0rem;
      button {
        @include darkButton;
      }
    }
  }
  .ad_form {
    max-width: 59rem;
  }
  .select_ad_placement {
    padding: 3.6rem 1rem;
    @include tablet {
      padding: 3.6rem 5rem;
    }
    .ad_form_sub_header {
      font-weight: 400;
      color: #9a79b6;
      margin: 1rem 0rem 4rem;
    }
    .radio_option {
      align-items: flex-start !important;
    }
    .radio {
      margin: 0.2rem;
    }
    .radio_title {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      b {
        font-weight: 700;
        letter-spacing: 0.08em;
        color: #150b1d;
      }
      span {
        font-weight: 400;
        letter-spacing: 0.08em;
      }
    }
  }
}
</style>
