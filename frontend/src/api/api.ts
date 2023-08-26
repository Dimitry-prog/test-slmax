import axios, { AxiosError, AxiosResponse } from 'axios';
import { AxiosKnownErrorType } from '../types';
import { BASE_URL } from '../utils/constants';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const handleRequest = async (
  reqFun: Promise<AxiosResponse>,
  reject: (value: string) => string | unknown
) => {
  try {
    const { data } = await reqFun;
    return data;
  } catch (e) {
    const error = e as AxiosError<AxiosKnownErrorType>;
    const errorMessage: string = error.response?.data.message || String(error);
    return reject(errorMessage);
  }
};
