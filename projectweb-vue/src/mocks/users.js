import { mock } from "mockjs";
import users from '@/mocks/data/users.json'
mock.mock('/api/users','get',()=>{
  return {
    code:200,
    message:'success',
    data: users,
  }
})