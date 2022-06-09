export class UserResponse {
  message:string = '';
  token:string = '';
  userId:number = 0;
  role:Roles = 'ADMIN';
}

export type Roles = 'SUSCRIPTOR' | 'ADMIN';
