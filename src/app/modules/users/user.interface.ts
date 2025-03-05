export type TUser= {
  _id?: string;
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  status?: 'in-progress' | 'blocked';
  role?: "superAdmin" | "admin" | "customer";
  isDeleted?:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
