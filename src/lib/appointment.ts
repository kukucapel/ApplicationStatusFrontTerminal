import { FullApplicationI } from '@/dtos/ApplicationDto';
import { apiRequest } from './apiClient';

export async function sendApplication(data: any) {
  // const encryptString = encryptPhp({ ...data });
  // console.log(encryptString);
  // return apiRequest(`/admin/requests/external`, {
  //   method: 'POST',
  //   body: JSON.stringify({ data: encryptString }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
}
