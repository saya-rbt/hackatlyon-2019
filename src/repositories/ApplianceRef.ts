import { ApplianceRefType } from './ApplianceRefType';
import { Criteria } from './Criteria';

export interface ApplianceRef {
  id_appliance_red: number;
  name: string;
  type: ApplianceRefType;
  criterias: Criteria[];
}
