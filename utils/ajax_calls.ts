import axios from 'axios';

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

export const getAccount = async (token: string | null) => {};

export const getAds = async (token: string | null) => {
  const { data, pending, error, refresh } = await useFetch(
    '/company/advert/getAdItems',
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      baseURL: useRuntimeConfig().BASE_URL
    }
  );

  console.log(error.value);

  return data.value;

  // const res = await axios({
  //   method: 'GET',
  //   url: `${useRuntimeConfig().BASE_URL}/company/advert/getAdItems`,
  //   headers: { Authorization: 'Bearer ' + token }
  // });

  // return res.data;
};
