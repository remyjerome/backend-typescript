import mongoose from "mongoose"

export interface ISubscriber {
  _id: string
  name: string
  channel: string
  createdAt: Date
}

export const subscriberModel = new mongoose.Schema<ISubscriber>({
  name: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

// export type Subscriber = typeof subscriberModel
