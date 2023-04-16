<script setup lang="ts">
import { toast } from 'vue3-toastify';
const email = ref('');
const requestSent = ref(false);
const OTP = ref(['', '', '', '', '', '']);
const censored_email = ref('');

definePageMeta({
  layout: 'login-layout'
});
useServerSeoMeta({
  description: 'Verify Your Email',
  ogDescription: 'Verify Your Email'
});

/**************************************************************
 *
 *
 **************************************************************/
watch(email, (new_email) => {
  const emailfirstHalfSubStr = new_email.split(`@`)[0].slice(0, 3);
  const emailfirstHalfSubStr2 = new_email.split(`@`)[0].slice(3);

  console.log(emailfirstHalfSubStr, emailfirstHalfSubStr2);

  let result = emailfirstHalfSubStr2.replace(/./gi, function (x) {
    return `x`;
  });
  if (new_email.split(`@`)[1]) {
    censored_email.value =
      emailfirstHalfSubStr + result + `@` + new_email.split(`@`)[1];
  } else {
    censored_email.value = emailfirstHalfSubStr + result + `@gmail.com`;
  }
});

//this moves the cursor between fields dynamically when typing
const handleAutoFocus = (e: any) => {
  const { value, name } = e.target;
  const [fieldName, fieldIndex] = name.split('-');

  if (value < 0) {
    toast.error('Number cannot be lower than 0');
    return;
  }

  let fieldIntIndex = parseInt(fieldIndex, 10);

  const myOTP = [...OTP.value];
  myOTP[fieldIntIndex - 1] = `${value}`;
  OTP.value = myOTP;

  if (`${value}`.length >= 1) {
    // Get the next input field using it's name
    const nextfield: any = document.querySelector(
      `input[name=${fieldName}-${fieldIntIndex + 1}]`
    );

    const currentfield: any = document.querySelector(
      `input[name=${fieldName}-${fieldIntIndex}]`
    );

    if (currentfield !== null) {
      currentfield.blur();
    }

    // If found, focus the next field
    if (nextfield !== null) {
      nextfield.focus();
    }
  }
};

//this dynamically shifts the cursor when clearing  fields
const handleFieldClearing = (e: any) => {
  const { value, name } = e.target;
  const [fieldName, fieldIndex] = name.split('-');

  let fieldIntIndex = parseInt(fieldIndex, 10);

  if (e.keyCode === 8 && !value) {
    // Get the previous input field using it's name
    const previousfield: any = document.querySelector(
      `input[name=${fieldName}-${fieldIntIndex - 1}]`
    );

    // If found, focus the next field
    if (previousfield !== null) {
      previousfield.focus();
    }
  }
};

const handlePaste = (e: any) => {
  e.preventDefault();
  e.target.blur();
  // Get pasted data via clipboard API
  const clipboardData = e.clipboardData || ``;
  const pastedData = clipboardData.getData('Text');

  const otpString = pastedData.slice(0, 6);
  // Do whatever with pasteddata

  const OTPno = otpString / 1;

  if (!isNaN(OTPno)) {
    const arr = otpString.split(``);
    OTP.value = arr;
  }
};
/**************************************************************
 *
 *
 **************************************************************/

//function to request password change
const makeEmailVerificationRequest = catchAsyncError(async (e: any) => {
  e.preventDefault();
  e.target.disabled = true;
  if (!email.value) {
    throw new Error('Please fill out the form');
  }
  //make the necessary API calls
  const companytoken = useCookie('betrelatecompanytoken');

  const res = await requestEmailVerification(companytoken.value);
  console.log(res);
  requestSent.value = true;
  //alert the user they are logged in
  toast.success('Email Sent!');
});

//function to change password with
const verifyCompanyEmail = catchAsyncError(async (e: any) => {
  e.preventDefault();
  e.target.disabled = true;

  const code = OTP.value.join('');

  if (!email.value || code.length < 6) {
    throw new Error('Your OTP is incomplete');
  }

  const res = completeCompanyEmailVerification({
    code,
    email: email.value
  });

  console.log(res);
  //alert the user that their email has been verified
  toast.success('Your email has been verified!');

  //redirect to dashboard
  location.assign('dashboard');
});
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>{{
        requestSent ? 'Verify Your Email' : 'Request For Email Verification'
      }}</Title>
    </Head>
    <section class="verify_email_page">
      <h1 class="page_title">
        {{
          requestSent ? 'Verify Your Email' : 'Request For Email Verification'
        }}
      </h1>
      <div class="request_email_verification_form" v-if="!requestSent">
        <p>Enter the email you would like to verify</p>
        <form
          class="account_access_form verify_email"
          @submit="makeEmailVerificationRequest"
        >
          <div class="form_field">
            <label>Company Email</label>
            <input type="text" v-model="email" />
            <!-- autoComplete="new-password" -->
          </div>
          <div class="submit_button">
            <button @click="makeEmailVerificationRequest">Submit</button>
          </div>
        </form>
      </div>
      <div class="email_verification_form" v-else>
        <p>
          Kindly provide the OTP sent to your email ({{ censored_email }}) to
          verify your account
        </p>
        <form
          class="account_access_form verify_email"
          @submit="verifyCompanyEmail"
          @paste="handlePaste"
        >
          <div class="form_field">
            <div class="single_digit_inputs">
              <input
                type="number"
                :max="9"
                :min="0"
                :value="OTP[0]"
                name="OTP-1"
                autocomplete="off"
                @input="handleAutoFocus"
                @keydown="handleFieldClearing"
              />
              <input
                type="number"
                :max="9"
                :min="0"
                :value="OTP[1]"
                name="OTP-2"
                autocomplete="off"
                @input="handleAutoFocus"
                @keydown="handleFieldClearing"
              />
              <input
                type="number"
                :max="9"
                :min="0"
                :value="OTP[2]"
                name="OTP-3"
                autocomplete="off"
                @input="handleAutoFocus"
                @keydown="handleFieldClearing"
              />
              <input
                type="number"
                :max="9"
                :min="0"
                :value="OTP[3]"
                name="OTP-4"
                autocomplete="off"
                @input="handleAutoFocus"
                @keydown="handleFieldClearing"
              />
              <input
                type="number"
                :max="9"
                :min="0"
                :value="OTP[4]"
                name="OTP-5"
                autocomplete="off"
                @input="handleAutoFocus"
                @keydown="handleFieldClearing"
              />
              <input
                type="number"
                :max="9"
                :min="0"
                :value="OTP[5]"
                name="OTP-6"
                autocomplete="off"
                @input="handleAutoFocus"
                @keydown="handleFieldClearing"
              />
            </div>
            <p>
              Didn&apos;t get OTP?
              <span @click="makeEmailVerificationRequest">Resend OTP</span>
            </p>
          </div>
          <div class="submit_button">
            <button @click="verifyCompanyEmail">Verify Email</button>
          </div>
        </form>
      </div>
    </section>
  </NuxtLayout>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';
.verify_email_page {
  text-align: center;
  p {
    max-width: 100% !important;
    text-align: center;
  }
  @include tablet {
    text-align: left;
    p {
      text-align: left;
      max-width: 45rem !important;
    }
  }
}

.account_access_form.verify_email {
  padding: 6rem 0rem;
  .single_digit_inputs {
    width: 100%;
    display: grid;
    max-width: 40rem;
    margin: auto;
    margin-bottom: 3rem;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 0.6rem;
    align-items: center;
    justify-content: center;
    @include tablet {
      margin: 0rem;
      margin-bottom: 3rem;
    }
    input {
      height: 5.5rem;
      border-radius: 0.4rem;
      font-size: 2rem;
      padding: 0.6rem;
      // max-width: 6.5rem;
      // min-width: 2.4rem;
      text-align: center;
      border: none;
      background-color: rgba(225, 215, 233, 0.2);
      border: 0.1rem solid rgba(154, 121, 182, 0.9);
      border-radius: 0.8rem;
      outline: none;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      /* Firefox */
      &[type='number'] {
        -moz-appearance: textfield;
      }
    }
  }
  p {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.6rem;
    letter-spacing: var(--letter-spacing);
    color: #999999 !important;
    span {
      color: var(--text-color);
      cursor: pointer;
    }
  }
}
</style>
