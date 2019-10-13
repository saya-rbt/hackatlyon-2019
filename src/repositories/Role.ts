interface Role {
  id_role: number;
  name: string;
}

export const enum Roles {
  MANAGER = 1,
  TECHNICAL_SERVICE = 2,
  ASSISTANT = 3,
}

export { Role };
