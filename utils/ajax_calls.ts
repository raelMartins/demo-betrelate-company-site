import axios from 'axios';

// export const checkLoggedIn = async (ctx) => {
//   //get the token and expiry date cookies
//   const companytoken = useCookie('betrelatecompanytoken');
//   const companytokenexpiry = useCookie('companytokenexpiry');
//   const { betrelatetoken, expirydate } = ctx.req.cookies;
//   //check if the user is logged in
//   if (!companytoken || !companytokenexpiry) {
//     throw new Error('loggedout', { statusCode: 401 });
//   }

//   //if the token has not expired return it
//   if (Date.parse(JSON.stringify(companytokenexpiry)) - Date.now() > 0) {
//     return companytoken;
//   }

//   try {
//     // then try to refresh the token th company account used
//     const {
//       data,
//       pending,
//       error,
//       refresh
//     }: { data: any; pending: any; error: any; refresh: any } = await useFetch(
//       '/company/auth/refreshToken',
//       {
//         method: 'GET',
//         headers: { Authorization: 'Bearer ' + companytoken },
//         baseURL: useRuntimeConfig().BASE_URL
//       }
//     );

//     //throw an error if there is one
//     if (error.value) {
//       throw new Error(error.value.message);
//     }

//     //then set that token as the cookie
//     companytoken.value = data.value.data.token.token;
//     companytokenexpiry.value = data.value.data.token.token;

//     //return it for use in other functions
//     return companytoken.value;
//   } catch (err) {
//     throw new Error('loggedout', {
//       statusCode: 401
//     });
//   }
// };

export const login = async ({
  companyEmail,
  password
}: {
  companyEmail: string;
  password: string;
}) => {
  const res = await axios({
    method: 'POST',
    url: `${useRuntimeConfig().BASE_URL}/company/auth/login`,
    data: { companyEmail, password }
  });
  return res.data;
};

export const requestPasswordReset = async (companyEmail: string) => {
  const res = await axios({
    method: 'POST',
    url: `${useRuntimeConfig().BASE_URL}/company/auth/reset-password`,
    data: { companyEmail }
  });
  return res.data;
};

export const resetAccountPassword = async (
  token: string | null,
  { password = '', newPassword = '' }
) => {
  const res = await axios({
    method: 'POST',
    url: `${useRuntimeConfig().BASE_URL}/company/auth/change-password`,
    data: { password, newPassword },
    headers: { Authorization: 'Bearer ' + token }
  });
  return res.data;
};

export const signup = async ({
  companyName,
  companyEmail,
  companyPhone,
  password
}: {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  password: string;
}) => {
  const res = await axios({
    method: 'POST',
    url: `${useRuntimeConfig().BASE_URL}/company/auth/register`,
    data: { companyEmail, companyName, companyPhone, password }
  });
  return res.data;
};

export const getProfile = async (token: string | null) => {
  const { data, pending, error, refresh } = await useFetch('/company/profile', {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
    baseURL: useRuntimeConfig().BASE_URL
  });

  if (error.value) {
    throw new Error(error.value.message);
  }
  return data.value;

  // const res = await axios({
  //   method: 'GET',
  //   url: `${useRuntimeConfig().BASE_URL}/company/advert/getAdItems`,
  //   headers: { Authorization: 'Bearer ' + token }
  // });

  // return res.data;
};

export const getAds = async (token: string | null, info: any = {}) => {
  const { status = 'pending' } = info;
  const { data, pending, error, refresh } = await useFetch(
    '/company/advert/getAdItems',
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      baseURL: useRuntimeConfig().BASE_URL,
      query: { status }
    }
  );

  if (error.value) {
    throw new Error(error.value.message);
  }
  return data.value;

  // const res = await axios({
  //   method: 'GET',
  //   url: `${useRuntimeConfig().BASE_URL}/company/advert/getAdItems`,
  //   headers: { Authorization: 'Bearer ' + token }
  // });

  // return res.data;
};

export const getTransactions = async (token: string | null, info: any = {}) => {
  const { page = 1, limit = 10, days = 7 } = info;
  const { data, pending, error, refresh } = await useFetch(
    `/company/wallet/getTransactions?page=${page}&limit=${limit}&days=${days}`,
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      baseURL: useRuntimeConfig().BASE_URL
    }
  );

  if (error.value) {
    throw new Error(error.value.message);
  }
  return data.value;

  // const res = await axios({
  //   method: 'GET',
  //   url: `${useRuntimeConfig().BASE_URL}/company/advert/getAdItems`,
  //   headers: { Authorization: 'Bearer ' + token }
  // });

  // return res.data;
};

export const uploadCompanyImage = async (token: string | null, data: any) => {
  const res = await axios({
    method: 'POST',
    url: `${useRuntimeConfig().BASE_URL}/company/auth/uploadProfilePic`,
    data,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};

export const getAllNotifications = async (
  token: string | null,
  data: any = {}
) => {
  const { page = 1, limit = 10 } = data;
  const res = await axios({
    method: 'GET',
    url: `${
      useRuntimeConfig().BASE_URL
    }/company/notification/getNotifications?page=${page}&limit=${limit}`,
    headers: { Authorization: 'Bearer ' + token }
  });

  return res.data.data;
};

export const markNotificationAsRead = async (
  token: string | null,
  id: string
) => {
  const res = await axios({
    method: 'PATCH',
    url: `${useRuntimeConfig().BASE_URL}/company/notification/markAsRead/${id}`,
    headers: { Authorization: 'Bearer ' + token }
  });

  return res.data;
};
