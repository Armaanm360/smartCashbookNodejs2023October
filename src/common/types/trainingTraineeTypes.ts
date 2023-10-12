export interface ITrainingTrainee {
  id: number;
  training_member_id: number;
  training_id: number;
  user_trainee_id: number;
  designation: string;
  email: string;
  name_en: string | null;
  name_bn: string | null;
  official_address: string;
  residential_contact_number: string;
  official_contact_number: string;
  residential_address: string;
  date_of_birth: string;
  last_education_qualification: string;
  board: string;
  exam: string;
  division: string;
  year: string;
  group_subject: string;
  total_work_exp: string;
  proffessional_qualification: string;
  workshop_attended: number;
  signature: string;
  created_at: string;
}
