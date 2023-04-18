import axios from 'axios';

export const checkLoggedIn = async () => {
  //get the token and expiry date cookies
  // const companytoken = useCookie('betrelatecompanytoken');
  // const companytokenexpiry = useCookie('companytokenexpiry');

  console.log('Checking If Logged In');
  const companytoken = useCookie('betrelatecompanytoken', {
    path: '/',
    maxAge: 15768000
  });
  const companytokenexpiry = useCookie('companytokenexpiry', {
    path: '/',
    maxAge: 15768000
  });

  console.log(companytoken.value);
  //check if the user is logged in
  if (!companytoken.value || !companytokenexpiry.value) {
    const error: any = new Error('not-authenticated');
    error.code = 401;
    throw error;
  }

  //if the token has not expired return it
  if (Date.parse(JSON.stringify(companytokenexpiry.value)) - Date.now() > 0) {
    return companytoken.value;
  }

  // then try to refresh the token the company account used
  const {
    data,
    pending,
    error,
    refresh
  }: { data: any; pending: any; error: any; refresh: any } = await useFetch(
    '/company/auth/refreshToken',
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + companytoken.value },
      baseURL: useRuntimeConfig().BASE_URL
    }
  );

  //throw an error if there is one
  if (error.value) {
    if (error.value.response) {
      throw new Error(error.value.response.message);
    } else {
      throw new Error(error.value.message);
    }
  }

  //then set that token as the cookie

  companytoken.value = data.value.token.token;
  companytokenexpiry.value = data.value.token.token;

  //return it for use in other functions
  console.log('Done with this');
  return data.value.token.token;
};

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
  const {
    data,
    pending,
    error,
    refresh
  }: { data: any; pending: any; error: any; refresh: any } = await useFetch(
    '/company/profile',
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      baseURL: useRuntimeConfig().BASE_URL
    }
  );

  //throw an error if there is one
  if (error.value) {
    if (error.value.response) {
      const customError: any = new Error(error.value.response.message);
      customError.code = error.value.response.status;
      customError.response = error.value.response;
      throw customError;
    } else {
      const customError: any = new Error(error.value.message);
      customError.code = error.value.status;
      throw customError;
    }
  }
  return data.value;
};

export const requestEmailVerification = async (token: string | null) => {
  const res = await axios({
    method: 'POST',
    url: `${useRuntimeConfig().BASE_URL}/company/auth/requestEmailVerification`,
    headers: { Authorization: 'Bearer ' + token }
  });
  return res.data;
};

export const completeCompanyEmailVerification = async ({
  email = '',
  code = ''
}: {
  email: string;
  code: string;
}) => {
  const res = await axios({
    method: 'POST',
    url: `${useRuntimeConfig().BASE_URL}/company/auth/verifyEmail`,
    data: { email, code }
  });
  return res.data;
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
};

export const getAdPlacements = async (token: string | null) => {
  const { data, pending, error, refresh } = await useFetch(
    '/company/advert/getAdPlacements',
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

export const createAdvert = async (token: string | null, data: any) => {
  const res = await axios({
    method: 'POST',
    url: `${useRuntimeConfig().BASE_URL}/company/advert/createAdItem`,
    data,
    headers: { Authorization: 'Bearer ' + token }
  });

  return res.data;
};
