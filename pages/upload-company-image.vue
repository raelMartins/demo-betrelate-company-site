<script setup lang="ts">
import { ImagePickerType } from '~~/utils/custom_types';

const companyImage = useState('companyImage', () => {
  // return '/images/betrelate-icon.png';
  return {
    imageFile: null,
    imagePreview: '/images/betrelate-icon.png',
    dimensions: {
      height: '',
      width: ''
    }
  };
});
const imgSrc = companyImage.value.imagePreview;

const getImage = (data: ImagePickerType) => {
  // companyImage = data;
};

definePageMeta({
  layout: 'login-layout'
});
useServerSeoMeta({
  description: 'Upload your company image',
  ogDescription: 'Upload your company image'
});
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>Upload Company Image</Title>
    </Head>
    <h1 class="page_title">Profile Image</h1>
    <p>Kindly upload your business profile image</p>
    <form class="account_access_form">
      <div class="upload_image_container">
        <div class="rounded_image">
          <img :src="imgSrc" />
        </div>
        <div class="image_text">
          <span class="description">Upload profile photo</span>
          <span class="max_size">Max size 2MB</span>
        </div>
      </div>
      <div class="submit_button">
        <button>Done</button>
      </div>
    </form>
  </NuxtLayout>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';
.account_access_form {
  .upload_image_container {
    padding: 5rem 0rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
    .rounded_image {
      @include centerImage;
      height: 10.4rem;
      width: 10.4rem;
      background: #ffffff;
      border: 0.1rem solid #c4c4c4;
      border-radius: 5.2rem;
    }
    .image_text {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      .description {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 120%;
        color: var(--primary-color);
      }
      .max_size {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 120%;
        color: #999999;
      }
    }
  }
}
</style>
