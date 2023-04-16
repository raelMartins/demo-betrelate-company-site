<script setup lang="ts">
import { toast } from 'vue3-toastify';
const email = ref('');
const requestSent = ref(false);
const password = ref('');
const newPassword = ref('');

definePageMeta({
  layout: 'login-layout'
});
useServerSeoMeta({
  description: 'Reset Your Password',
  ogDescription: 'Reset Your Password'
});

//function to request password change
const reequestPasswordChange = catchAsyncError(async (e: any) => {
  e.preventDefault();
  e.target.disabled = true;
  if (!email.value) {
    throw new Error('Please fill out the form');
  }
  //make the necessary API calls
  const res = await requestPasswordReset(email.value);
  console.log(res);
  requestSent.value = true;
  //alert the user they are logged in
  toast.success('Email Sent!');
});

//function to change password with
const changePassword = catchAsyncError(async (e: any) => {
  e.preventDefault();
  e.target.disabled = true;
  if (!password.value || !newPassword.value) {
    throw new Error('Please fill out the form');
  }

  //first login with the old password to get a token

  const old_login = await login({
    companyEmail: email.value,
    password: password.value
  });

  //then change the password using this token
  await resetAccountPassword(old_login.token.token, {
    password: password.value,
    newPassword: newPassword.value
  });

  //alert the user that ther password has been changed
  toast.success('Password Changed Successfully');

  //then login again with the new password and save the tokens in cookies
  const res = await login({
    companyEmail: email.value,
    password: newPassword.value
  });

  //save the token and expiry date into cookies
  const companytoken = useCookie('betrelatecompanytoken', {
    path: '/',
    maxAge: 15768000
  });
  companytoken.value = res.token.token;
  const companytokenexpiry = useCookie('companytokenexpiry', {
    path: '/',
    maxAge: 15768000
  });
  companytokenexpiry.value = res.token.expire_at;

  //navigate to the user's dashboard
  location.assign('/dashboard');
});
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>{{
        requestSent ? 'Change Your Password' : 'Request For Password Change'
      }}</Title>
    </Head>
    <section>
      <h1 class="page_title">
        {{
          requestSent ? 'Change Your Password' : 'Request For Password Change'
        }}
      </h1>
      <div class="request_password_change_form" v-if="!requestSent">
        <p>
          Please provide the email registered to the account for which you want
          to change the password
        </p>
        <form
          class="account_access_form reset_password"
          @submit="reequestPasswordChange"
        >
          <div class="form_field">
            <label>Company Email</label>
            <input type="text" v-model="email" />
            <!-- autoComplete="new-password" -->
          </div>
          <div class="submit_button">
            <button @click="reequestPasswordChange">Submit</button>
          </div>
        </form>
      </div>
      <div class="change_password_form" v-else>
        <p>
          Please enter the password sent to your email, and the new password you
          would like to use.
        </p>
        <form
          class="account_access_form reset_password"
          @submit="changePassword"
        >
          <div class="form_field">
            <label>Password</label>
            <input type="password" v-model="password" />
            <!-- autoComplete="new-password" -->
          </div>
          <div class="form_field">
            <label>New Password</label>
            <input type="password" v-model="newPassword" />
            <!-- autoComplete="new-password" -->
          </div>
          <div class="submit_button">
            <button @click="changePassword">Change Password</button>
          </div>
        </form>
      </div>
    </section>
  </NuxtLayout>
</template>

<style lang="scss">
.account_access_form.reset_password {
  padding: 6rem 0rem;
}
</style>
