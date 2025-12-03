import { apiRequest } from './apiClient';

export async function sendAppeal(data: any) {
  return apiRequest(`/admin/requests/external/appeal`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
