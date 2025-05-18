import * as ApiService from './ApplicationServiceAPI';

export const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  filterApplications,
  getApplicationStats,
  exportApplicationsAsJson,
  ApplicationEvents
} = ApiService;

export default ApiService;
