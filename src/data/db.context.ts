import mongoose from "mongoose"

import { ISubscriber, subscriberModel } from "@data/subscribers.models"

export class DBContext {
  private db: typeof mongoose

  async connect() {
    if (process.env.DB_URI)
      this.db = await mongoose.connect(process.env.DB_URI, {})

    console.log("succesfully connected to DB")
  }

  get subscriber() {
    return this.db.model<ISubscriber>("Subscriber", subscriberModel)
  }
}
