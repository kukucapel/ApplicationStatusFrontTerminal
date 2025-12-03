import { ApplicantI } from './ApplicationDto';

export interface AppealI {
  appeal: string;
}

export interface FullAppealI extends ApplicantI, AppealI {}
