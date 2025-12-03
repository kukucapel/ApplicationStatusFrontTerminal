// import { FullApplicationI } from '@/dtos/ApplicationDto';
import { apiRequest } from './apiClient';

export const API_PRINT =
  process.env.NEXT_PUBLIC_PRINT || 'http://localhost:5000';

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
  const response = await fetch(API_PRINT, {
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
