<script setup lang="ts"></script>

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
      <form class="ad_form">
        <h4 class="ad_form_header">Kindly provide the following details</h4>
        <div class="ad_form_field">
          <label>Advert Type</label>
          <div class="radio_buttons">
            <div class="radio_option">
              <span class="radio active"></span>
              <span class="radio_title">Video</span>
            </div>
            <div class="radio_option">
              <span class="radio"></span>
              <span class="radio_title">Image</span>
            </div>
            <div class="radio_option">
              <span class="radio"></span>
              <span class="radio_title">Text Only</span>
            </div>
          </div>
        </div>
        <div class="ad_form_field">
          <label>Select Action</label>
          <div class="radio_buttons">
            <div class="radio_option">
              <span class="radio active"></span>
              <span class="radio_title">Learn more</span>
            </div>
            <div class="radio_option">
              <span class="radio"></span>
              <span class="radio_title">Download now</span>
            </div>
            <div class="radio_option">
              <span class="radio"></span>
              <span class="radio_title">Visit website</span>
            </div>
            <div class="radio_option">
              <span class="radio"></span>
              <span class="radio_title">Shop now</span>
            </div>
          </div>
        </div>
        <div class="ad_form_field">
          <label style="font-weight: 600">Ad Description</label>
          <textarea
            class="custom_input_design ad_description"
            placeholder="Enter Description"
          />
        </div>
        <div class="ad_form_field">
          <div class="custom_input_design upload_image_or_video"></div>
        </div>
        <div class="ad_form_field">
          <label>Url Link</label>
          <input
            type="text"
            class="custom_input_design"
            placeholder="Enter Url Link"
          />
        </div>
        <div class="ad_form_field">
          <label>Target Audience</label>
          <div class="radio_buttons">
            <div class="radio_option">
              <span class="radio active"></span>
              <span class="radio_title">Everyone</span>
            </div>
            <div class="radio_option">
              <span class="radio"></span>
              <span class="radio_title">Women Only</span>
            </div>
            <div class="radio_option">
              <span class="radio"></span>
              <span class="radio_title">Men Only</span>
            </div>
          </div>
        </div>
        <div class="ad_form_field">
          <label>Select Interest</label>
          <div class="input_container">
            <input
              type="text"
              class="custom_input_design"
              placeholder="Select Interest"
            />
            <button>+ Add</button>
          </div>
        </div>
        <div class="submit_button">
          <button>Submit Advert</button>
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
  }
  .ad_form {
    max-width: 59rem;
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
            height: 1rem;
            width: 1rem;
          }
          .radio_title {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 1.9rem;
            letter-spacing: var(--letter-spacing);
            color: #000000;
          }
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
        height: 18.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
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
}
</style>
