<script setup lang="ts">
import { toast } from 'vue3-toastify';

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');

definePageMeta({
  title: 'Create your Company Account',
  layout: 'login-layout'
});
useServerSeoMeta({
  description: 'Signup with your company details!',
  ogDescription: 'Signup with your company details!'
});

//funtion to login with
const createCompanyAccount = catchAsyncError(async (e: any) => {
  e.preventDefault();
  e.target.disabled = true;
  if (!email.value || !password.value || !name.value || !phone.value) {
    throw new Error('Please fill out all details');
  }

  //make the necessary API calls
  console.log({
    companyEmail: email.value,
    password: password.value,
    companyName: name.value,
    companyPhone: phone.value
  });
  const res = await signup({
    companyEmail: email.value,
    password: password.value,
    companyName: name.value,
    companyPhone: phone.value
  });
  console.log(res);

  //save the token and expiry date into cookies
  // const companytoken = useCookie('betrelatecompanytoken', {
  //   path: '/',
  //   maxAge: 15768000
  // });
  // companytoken.value = res.token.token;
  // const companytokenexpiry = useCookie('companytokenexpiry', {
  //   path: '/',
  //   maxAge: 15768000
  // });
  // companytokenexpiry.value = res.token.expire_at;

  //alert the user they are logged in
  toast.success('Account Created Successfully');

  //navigate to the user's dashboard
  location.assign('/upload-company-image');
});
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>Create Account</Title>
    </Head>
    <section>
      <h1 class="page_title">Create Account</h1>
      <p>Please provide the following details to create the company account</p>
      <form class="account_access_form" @submit="createCompanyAccount">
        <div class="form_field">
          <label>Company Name</label>
          <input type="text" v-model="name" autoComplete="new-password" />
        </div>
        <div class="form_field">
          <label>Company Email</label>
          <input type="text" v-model="email" autoComplete="new-password" />
        </div>
        <div class="form_field">
          <label>Phone Number</label>
          <input type="text" v-model="phone" autoComplete="new-password" />
        </div>
        <div class="form_field">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            autoComplete="new-password"
          />
        </div>
        <div class="submit_button">
          <button @click="createCompanyAccount">Create Account</button>
        </div>
        <p>
          Already have an account?
          <NuxtLink href="/login">Login</NuxtLink>
        </p>
      </form>
    </section>
  </NuxtLayout>
</template>
