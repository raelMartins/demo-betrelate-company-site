<script setup lang="ts">
import 'primeicons/primeicons.css';
useServerSeoMeta({
  title: 'Betrelate Company',
  ogTitle: 'Betrelate Company',
  description: 'This is the company platform',
  ogDescription: 'This is the company platform',
  ogImage: '/images/betrelate-icon.png',
  twitterCard: 'summary_large_image'
});

useHead({
  link: [{ rel: 'icon', href: '/images/betrelate-icon.png' }]
});
</script>

<template>
  <NuxtPage />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Work Sans', sans-serif;
  font-size: 62.5%;
  scroll-behavior: smooth;
  ::selection {
    background-color: #9a79b6;
    color: #ede7f2;
  }
}
body {
  max-width: 190rem;
  margin: auto;
}
:root {
  --text-color: #452461;
  --primary-color: #673692;
  --light-purple: #e6d4f6;
  --very-light-purple: #ede7f2;
  --form-text: #9a79b6;
  --form-field: #fbf8fd;
  --primary-box-shadow: 0.1rem 0.05rem 0.4rem 0.05rem rgba(0, 0, 0, 0.2);
  --letter-spacing: -0.018216rem;
  --success-color: #4cd964;
  --error-color: #ea4335;

  --toastify-color-success: #673692;
  --toastify-color-error: #b42616;
  --toastify-toast-width: 46rem;
}

input,
button,
textarea {
  font-family: 'Work Sans', sans-serif;
}
* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}
hr {
  border: none;
  height: 0.2rem;
  background-color: var(--very-light-purple);
}
.Toastify__toast-container {
  font-size: 1.6rem;
}
</style>
