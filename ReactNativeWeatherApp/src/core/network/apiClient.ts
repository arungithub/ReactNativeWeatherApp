import { API_BASE_URL, API_KEY } from '@env';
import { GetReqType } from './types';

console.log(API_BASE_URL, API_KEY);

export const apiErrorHandler = (error: any) => {
  console.log(JSON.stringify(error));
};

export const makeApiRequest = async (req: GetReqType) => {
  try {
    console.log(req);
    const response = await fetch(req.url, req.option);
    const res = await response.json();
    return res;
  } catch (e: any) {
    apiErrorHandler(e);
  }
};