import { CountryData } from './CountryData';

export interface CountryResponse {
  found: boolean;
  data: CountryData | null;
}
