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
