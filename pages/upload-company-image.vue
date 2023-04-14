<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { ImagePickerType } from '../utils/custom_types';
definePageMeta({
  layout: 'login-layout'
});
useServerSeoMeta({
  description: 'Upload your company image',
  ogDescription: 'Upload your company image'
});

const companyImage: any = ref({
  imageFile: null,
  imagePreview: '',
  dimensions: {
    height: '',
    width: ''
  }
});

//using the below two functions when actually selecting an image from your device
const selectImage = (data: ImagePickerType) => {
  companyImage.value = data;
  return data;
};

const getImage = () => {
  uploadImageWithPreview(selectImage);
};

const companytoken = useCookie('betrelatecompanytoken');

//the function is below is to upload the selected image as your company image
const submitImage = catchAsyncError(async (e: any) => {
  e.preventDefault();
  e.target.disabled = true;
  if (!companyImage.value.imageFile) {
    throw new Error('Please select an image to upload');
  }
  const formData = new FormData();
  formData.append('image', companyImage.value.imageFile);
  const res = await uploadCompanyImage(companytoken.value, { formData });
  console.log(res);
  toast.success('Profile Image Updated Succesfully!');
  location.assign('/dashboard');
});
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>Upload Company Image</Title>
    </Head>
    <h1 class="page_title">Profile Image</h1>
    <p>Kindly upload your business profile image</p>
    <form class="account_access_form" @submit="submitImage">
      <div class="upload_image_container" @click="getImage">
        <div class="rounded_image">
          <img :src="companyImage.imagePreview" />
        </div>
        <div class="image_text">
          <span class="description">Upload profile photo</span>
          <span class="max_size">Max size 2MB</span>
        </div>
      </div>
      <div class="submit_button">
        <button @click="submitImage">Done</button>
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
    cursor: pointer;
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
