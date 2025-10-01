export interface LoginForm{
  user : {
  _id?:string,
  email:string,
  password:string,
  isAdmin:boolean
  },
  token : string
}
