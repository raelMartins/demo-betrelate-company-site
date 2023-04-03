<template>
  <main class="main">
    <div class="left">
      <div class="logo">
        <SvgsBetrelateSVG />
      </div>
      <slot />
    </div>
    <div class="right">
      <SvgsLoginImageSVG />
    </div>
  </main>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';
.main {
  display: flex;
  min-height: 100vh;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 3.2rem 5.5rem;
    .logo {
      margin-bottom: 5.2rem;
    }
    .page_title {
      font-style: normal;
      font-weight: 600;
      font-size: 3rem;
      line-height: 3.5rem;
      letter-spacing: var(--letter-spacing);
      color: var(--primary-color);
      margin: 0rem;
      margin-bottom: 1.6rem;
    }
    p {
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 120%;
      color: #404040;
      margin: 0rem;
      max-width: 45rem;
    }
    .account_access_form {
      display: flex;
      flex-direction: column;
      margin: 1rem 0rem;
      .form_field {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        margin: 1.8rem 0rem;
        label {
          font-weight: 500;
          font-size: 1.8rem;
          line-height: 100%;
          color: #999999;
        }
        input {
          height: 5.6rem;
          background: #f9f7fb;
          border: 0.1rem solid #999999;
          border-radius: 1rem;
          padding: 0.1rem 1rem;
          outline: none;
        }
      }
      .submit_button {
        margin-top: 7rem;
        margin-bottom: 4rem;
        button {
          cursor: pointer;
          background-color: var(--primary-color);
          color: white;
          padding: 1.9rem;
          min-width: 23rem;
          text-align: center;
          font-weight: 500;
          font-size: 1.8rem;
          line-height: 100%;
          border: none;
          outline: none;
          border-radius: 0.4rem;
        }
      }
      a {
        color: var(--primary-color);
      }
    }
  }
  .right {
    display: none;
    @include tablet {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #672693;
      width: 40rem;
      position: sticky;
      top: 0;
      padding: 1rem;
      height: 100vh;
    }
    @include laptop {
      width: 59.7rem;
    }
  }
}
</style>
