import { FullApplicationI } from '@/dtos/ApplicationDto';
import { apiRequest } from './apiClient';
import { encryptJson } from './aes256';

export async function sendApplication(data: any) {
  const encryptString = encryptJson({ ...data });

  return apiRequest(`/admin/requests/external`, {
    method: 'POST',
    body: JSON.stringify({ data: encryptString }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
