import { User } from '@/repositories/User';
import { Order, deliverOrder, updateStepOrder, getManagerOrders, getAllOrders, getOrdersToBeDelivered } from '@/repositories/Order';
import { Roles } from '@/repositories/Role';

export async function getCommandList(user: User): Promise<Order[]> {
  switch (user.role.id_role) {
    case Roles.MANAGER:
      return getManagerOrders(user);
    case Roles.ASSISTANT:
      return getOrdersToBeDelivered();
    case Roles.TECHNICAL_SERVICE:
      return getAllOrders();
  }
}

export function doCommandAction(user: User, orders: Order[], step: string) {
  switch (user.role.id_role) {
    case Roles.ASSISTANT:
      return deliverOrder(orders);
    case Roles.TECHNICAL_SERVICE:
      return updateStepOrder(orders, step);
  }
}

export function getCommandAction(user: User) {
  switch (user.role.id_role) {
    case Roles.ASSISTANT:
      return 'Livrer';
    case Roles.TECHNICAL_SERVICE:
      return 'Change de jalon';
  }
}
