import { apiRequest } from './apiClient';

export const getUnitTreeForApplication = async () => {
  return apiRequest(`/admin/units`, { method: 'GET', credentials: 'include' });
};
