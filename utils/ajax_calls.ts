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
