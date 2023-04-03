<script setup>
definePageMeta({
  title: 'Login To Our Company Site',
  layout: 'login-layout'
});
</script>

<template>
  <NuxtLayout>
    <section>
      <h1 class="page_title">Login</h1>
      <p>Please provide the following details to access your company account</p>
      <form class="account_access_form">
        <div class="form_field">
          <label>Company Email</label>
          <input type="text" class="" autoComplete="new-password" />
        </div>
        <div class="form_field">
          <label>Password</label>
          <input type="password" class="" autoComplete="new-password" />
        </div>
        <div class="submit_button">
          <button>Login</button>
        </div>
        <p>
          Don’t have an account?
          <NuxtLink href="/signup">Create Account</NuxtLink>
        </p>
      </form>
    </section>
  </NuxtLayout>
</template>

<style lang="scss"></style>
