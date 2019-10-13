import { User } from './User';
import { RequestStep } from './RequestStep';
import { Appliance } from './Appliance';
import { mutate } from '@/services/graphql';
import { user } from '@/services/authentication';
import gql from 'graphql-tag';

export interface Order {
  id_order: number;
  asker: User;
  requestStep: RequestStep;
}

export async function orderAppliances(appliances: Appliance[]) {
  let data = await mutate<any>(gql`
    mutation insertOrder {
      insert_order(objects: [
        {
          asker_id: ${user.id_user}
          request_step_id: 1
        }
      ]) {
        returning {
          id_order
        }
      }
    }
  `);

  const idOrder = data.insert_order.returning[0].id_order;

  data = await mutate(gql`
    mutation insertApplianceOrder {
      insert_orderAppliance(objects: [
        ${appliances.map(
          appliance => `
            {
              appliance_id: ${appliance.id_appliance},
              order_id: ${idOrder}
            },
          `,
        )}
      ]) {
        affected_rows
      }
    }
  `);

  data = await mutate(gql`
    mutation updateApplianceStatus {
      update_appliance(
        _set: {
          appliance_status_id: 9
        },
        where: {
          id_appliance: {
            _in: [${appliances.map(app => app.id_appliance).join(',')}]
          }
        }
      )
    }
  `);
}
