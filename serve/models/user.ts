import { Document, Schema, model } from 'mongoose'

export enum User {
  admin = 0,
  web = 1
}

interface IUser extends Document {
  username: string
  pwd: string
  name: string
  createTime: string
  loginTime: string
  avatar: string
  roles: User[]
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  createTime: {
    type: Date,
    default: new Date()
  },
  loginTime: {
    type: Date
  },
  avatar: {
    type: String
  },
  roles: {
    type: Array,
    default: [0]
  }
})

export default model<IUser>('user', UserSchema)