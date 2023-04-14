import axios from 'axios';

export const getAllAds = async (token: string | null) => {
  const { data, pending, error, refresh } = await useFetch(
    '/company/advert/getAdItems',
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      baseURL: useRuntimeConfig().BASE_URL
    }
  );

  return data.value;

  // const res = await axios({
  //   method: 'GET',
  //   url: `${useRuntimeConfig().BASE_URL}/company/advert/getAdItems`,
  //   headers: { Authorization: 'Bearer ' + token }
  // });

  // return res.data;
};
