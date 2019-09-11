import { Document, Schema, Model, model } from 'mongoose'

const BlogSchema: Schema = new Schema({
  title: {
    type: String
  },
  sub_title: {
    type: String
  },
  tag: {
    type: String
  },
  tagName: {
    type: String
  },
  classify: {
    type: String
  },
  classifyName: {
    type: String
  },
  series: {
    type: String
  },
  content: {
    type: String
  },
  render_content: {
    type: String
  },
  createTime: {
    type: String,
    default: new Date()
  },
  cover: {
    type: String
  },
  status: {
    type: String,
    default: '0'
  }
})

interface IBlog extends Document {
  title: string
  sub_title: string
  tag: string
  tagName: string
  classify: string
  classifyName: string
  series: string
  content: string
  render_content: string
  createTime: string
  cover: string
  status: string
}

export default model<IBlog>('blog', BlogSchema)
