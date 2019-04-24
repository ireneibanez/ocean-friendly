export interface User {
  id: string,
  name: string,
  email: string,
  password?: number,
  salt: string,
  role: string,
  createdAt: any
}
