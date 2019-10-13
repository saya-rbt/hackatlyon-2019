import { query, mutate } from '@/services/graphql';
import gql from 'graphql-tag';
import { User } from './User';
import { ApplianceRef } from './applianceRef';
import { ApplianceStatus } from './ApplianceStatus';

export interface Appliance {
  id_appliance: number;
  manager: User;
  ref: ApplianceRef;
  status: ApplianceStatus;
  location: Location;
}

export async function getAppliancesForManager(user: User): Promise<Appliance[]> {
  const data = await query<{ appliance: Appliance[] }>(gql`
    query getAppliancesForUser {
      appliance(where: {
        manager_id: {
          _eq: "${user.id_user}"
        }
      }) {
        id_appliance
        manager {
          name
          surname
        }
        ref {
          name
          criterias {
            type {
              label
            }
            value
          }
        }
        status {
          label
        }
      }
    }
  `);

  return data.appliance;
}

export async function getAppliancesForAssistant(): Promise<Appliance[]> {
  const data = await query<{ appliance: Appliance[] }>(gql`
    query {
      appliance(where: { status: { id_appliance_status: { _eq: 2 } } }) {
        id_appliance
        manager {
          name
          surname
        }
        ref {
          name
          criterias {
            type {
              label
            }
            value
          }
        }
        status {
          label
        }
      }
    }
  `);

  return data.appliance;
}

export async function getAppliancesForDSI(): Promise<Appliance[]> {
  const data = await query<{ appliance: Appliance[] }>(gql`
    query {
      appliance(where: { status: { id_appliance_status: { _nin: [1, 2] } } }) {
        id_appliance
        manager {
          name
          surname
        }
        ref {
          name
          criterias {
            type {
              label
            }
            value
          }
        }
        status {
          label
        }
      }
    }
  `);

  return data.appliance;
}

export async function getAvailableAppliance(): Promise<Appliance[]> {
  const data = await query<{ appliance: Appliance[] }>(gql`
    query {
      appliance(where: { status: { id_appliance_status: { _eq: 4 } } }) {
        id_appliance
        ref {
          name
          criterias {
            type {
              label
            }
            value
          }
        }
      }
    }
  `);

  return data.appliance;
}

export async function updateAppliancesStatus(appliances: Appliance[]): Promise<Appliance[]> {
  const data = await mutate<any>(gql`
    mutation update_appliance {
      update_appliance(
        where: {
          id_appliance: {
            _in: [${appliances.map(appliance => appliance.id_appliance).join(',')}]
          }
        },
        _set: {
          appliance_status_id: 2
        }
      ){
        affected_rows
        returning {
          id_appliance
          status {
            id_appliance_status
            label
          }
        }
      }
    }
  `);

  const returned = data.update_appliance.returning;

  appliances.forEach((appliance, index) => {
    appliance.status = returned[index].status;
  });

  return appliances;
}

export async function updateAppliancesForRefurbishing(appliances: Appliance[]): Promise<Appliance[]> {
  const data = await mutate<any>(gql`
  mutation update_appliance {
    update_appliance(
      where: {
        id_appliance: {
          _in: [${appliances.map(appliance => appliance.id_appliance).join(',')}]
        }
      },
      _set: {
        appliance_status_id: 3
      }
    ) {
      affected_rows
      returning {
        id_appliance
        status {
          id_appliance_status
          label
        }
      }
    }
  }
`);

  const returned = data.update_appliance.returning;

  appliances.forEach((appliance, index) => {
    appliance.status = returned[index].status;
  });

  return appliances;
}

export async function updateAppliancesToStatus(appliances: Appliance[], status: string): Promise<Appliance[]> {
  const data = await mutate<any>(gql`
    mutation update_appliance {
      update_appliance(
        where: {
          id_appliance: {
            _in: [${appliances.map(appliance => appliance.id_appliance).join(',')}]
          }
        },
        _set: {
          appliance_status_id: "${status}"
          manager_id: 5
        }
      ) {
        affected_rows
        returning {
          id_appliance
          status {
            id_appliance_status
            label
          }
          manager {
            id_user
            name
            surname
          }
        }
      }
    }
  `);

  const returned = data.update_appliance.returning;

  appliances.forEach((appliance, index) => {
    appliance.status = returned[index].status;
    appliance.manager = returned[index].manager;
  });

  return appliances;
}
