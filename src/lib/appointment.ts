import { FullApplicationI } from '@/dtos/ApplicationDto';
import { apiRequest } from './apiClient';
// import { encryptPayload } from './aes256';

export async function sendApplication(data: any) {
  // const encryptString = encryptPayload({ ...data });
  // console.log(encryptString);
  // return apiRequest(`/admin/requests/external`, {
  //   method: 'POST',
  //   body: JSON.stringify({ data: encryptString }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
}
