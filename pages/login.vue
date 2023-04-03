<script setup lang="ts">
import { toast } from 'vue3-toastify';
const email = useState('email', () => '');
const password = useState('password', () => '');

definePageMeta({
  layout: 'login-layout'
});
useServerSeoMeta({
  description: 'Login with your company details!',
  ogDescription: 'Login with your company details!'
});

//function to login with
const loginToCompanyAccount = catchAsyncError(async (e: any) => {
  e.preventDefault();
  e.target.disabled = true;
  //make the necessary API calls
  const res = await login({
    companyEmail: email.value,
    password: password.value
  });
  console.log(res);

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

  //alert the user they are logged in
  toast.success('Logged In Successfully');

  //navigate to the user's dashboard
  location.assign('/dashboard');
});
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>Login</Title>
    </Head>
    <section>
      <h1 class="page_title">Login</h1>
      <p>Please provide the following details to access your company account</p>
      <form class="account_access_form login" @submit="loginToCompanyAccount">
        <div class="form_field">
          <label>Company Email</label>
          <input type="text" v-model="email" autoComplete="new-password" />
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
          <button @click="loginToCompanyAccount">Login</button>
        </div>
        <p>
          Don’t have an account?
          <NuxtLink href="/signup">Create Account</NuxtLink>
        </p>
      </form>
    </section>
  </NuxtLayout>
</template>

<style lang="scss">
.account_access_form.login {
  padding: 6rem 0rem;
}
</style>
