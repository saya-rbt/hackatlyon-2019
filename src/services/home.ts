import { User } from '@/repositories/User';
import { Roles } from '@/repositories/Role';
import {
  getAppliancesForManager,
  updateAppliancesStatus,
  updateAppliancesForRefurbishing,
  Appliance,
  getAppliancesForAssistant,
  getAppliancesForDSI,
  updateAppliancesToStatus,
} from '@/repositories/Appliance';

export async function getHomeList(user: User): Promise<Appliance[]> {
  switch (user.role.id_role) {
    case Roles.MANAGER:
      return getAppliancesForManager(user);
    case Roles.ASSISTANT:
      return getAppliancesForAssistant();
    case Roles.TECHNICAL_SERVICE:
      return getAppliancesForDSI();
    default:
      return [];
  }
}

export function getHomeAction(user: User): string {
  switch (user.role.id_role) {
    case Roles.MANAGER:
      return 'Mettre à disposition';
    case Roles.ASSISTANT:
      return 'Récupérer';
    case Roles.TECHNICAL_SERVICE:
      return 'Changer l\'état';
    default:
      console.error('An error happened');
  }
}

export async function doHomeAction(user: User, selected: Appliance[], newStatus: string): Promise<Appliance[]> {
  switch (user.role.id_role) {
    case Roles.MANAGER:
      return updateAppliancesStatus(selected);
    case Roles.ASSISTANT:
      return updateAppliancesForRefurbishing(selected);
    case Roles.TECHNICAL_SERVICE:
      return updateAppliancesToStatus(selected, newStatus);
  }
}
