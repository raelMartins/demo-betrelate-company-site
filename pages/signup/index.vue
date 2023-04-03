<script setup>
definePageMeta({
  title: 'Create your Company Account',
  layout: 'login-layout'
});
</script>

<template>
  <NuxtLayout>
    <section>
      <h1 class="page_title">Create Account</h1>
      <p>Please provide the following details to create the company account</p>
      <form class="account_access_form">
        <div class="form_field">
          <label>Company Name</label>
          <input type="text" class="" autoComplete="new-password" />
        </div>
        <div class="form_field">
          <label>Company Email</label>
          <input type="text" class="" autoComplete="new-password" />
        </div>
        <div class="form_field">
          <label>Phone Number</label>
          <input type="text" class="" autoComplete="new-password" />
        </div>
        <div class="form_field">
          <label>Password</label>
          <input type="password" class="" autoComplete="new-password" />
        </div>
        <div class="submit_button">
          <button>Create Account</button>
        </div>
        <p>
          Already have an account?
          <NuxtLink href="/login">Login</NuxtLink>
        </p>
      </form>
    </section>
  </NuxtLayout>
</template>
