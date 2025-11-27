export interface ApplicantI {
  fio: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  postal_code1: string;
  postal_code2: string;
}
export interface ApplicationI {
  theme: string;
  question: string;
  assigned_unit_id: number | null;
}

export interface FullApplicationI extends ApplicantI, ApplicationI {}
