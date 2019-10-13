import { User } from './User';
import { RequestStep } from './RequestStep';
import { Appliance } from './Appliance';
import { mutate, query } from '@/services/graphql';
import { user } from '@/services/authentication';
import gql from 'graphql-tag';

export interface Order {
  id_order: number;
  asker: User;
  requestStep: RequestStep;
  appliances: { appliance: Appliance }[];
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
      ) {
        affected_rows
      }
    }
  `);

  return appliances;
}

export async function deliverOrder(orders: Order[]) {
  let data = await mutate<any>(gql`
    mutation deliverOrder {
      update_order(
        _set: {
          request_step_id: 4
        },
        where: {
          id_order: {
            _in: [${orders.map(o => o.id_order).join(',')}]
          }
        }
      ) {
        returning {
          asker_id
        }
      }
    }
  `);

  const askerId = data.update_order.returning.asker_id;

  await mutate(gql`
    mutation updateManager {
      update_appliance(
        _set: {
          manager_id: ${askerId}
        },
        where: {
          id_appliance: {
            _in: [${orders.reduce(
              (ids, o) => [...ids, ...o.appliances.map(a => a.appliance.id_appliance)],
              [],
            )}]
          }
        }
      ) {
        affected_rows
      }
    }
  `);
}

export async function updateStepOrder(orders: Order[], step: string) {
  await mutate(gql`
    mutation deliverOrder {
      update_order(
        _set: {
          request_step_id: ${step}
        },
        where: {
          id_order: {
            _in: [${orders.map(o => o.id_order).join(',')}]
          }
        }
      )
  }
  `);
}

export async function getManagerOrders(user: User) {
  const data = await query<any>(gql`
    query getOrdersFromAsker {
      order(where: { asker_id: { _eq: ${user.id_user} }}) {
        id_order
        appliances {
          appliance {
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
        asker {
          name
          surname
        }
        requestStep {
          label
        }
      }
    }
  `);

  return data.order;
}

export async function getOrdersToBeDelivered(): Promise<Order[]> {
  const data = await query<any>(gql`
    query ordersToBeDelivered {
      order(where: { request_step_id: { _eq: 2 }}) {
        id_order
        appliances {
          appliance {
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
        asker {
          name
          surname
        }
        requestStep {
          label
        }
      }
    }
  `);

  return data.order;
}

export async function getAllOrders(): Promise<Order[]> {
  const data = await query<any>(gql`
    query allOrders {
      order {
        id_order
        appliances {
          appliance {
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
        asker {
          name
          surname
        }
        requestStep {
          label
        }
      }
    }
  `);

  return data.order;
}
