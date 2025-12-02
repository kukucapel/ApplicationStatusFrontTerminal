import { FullApplicationI } from '@/dtos/ApplicationDto';
import { apiRequest } from './apiClient';

export async function sendApplication(data: any) {
  console.log(data);
  return apiRequest(`/admin/requests/external/plain`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
export async function sendPrint(data: {
  text: string;
  titleTop: string;
  titleBottom: string;
}) {
  const response = await fetch('http://172.16.26.210:3000/print', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: data.text,
      titleTop: data.titleTop,
      titleBottom: data.titleBottom,
    }),
  });

  if (!response.ok) {
    return false;
  }

  return true;
}
