import {Technology} from './technology';

export class User {
  id: number;
  first_name: string;
  mid_name: string;
  last_name: string;
  full_name: string;
  town: string;
  technology_names: string;
  // ratingCount: number;
  // ratingValue: number;
  tech: Technology[];
}
