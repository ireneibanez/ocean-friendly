export interface User {
  name: string,
  email: string,
  password?: number,
  salt: string,
  role: string,
  createdAt: any
}
