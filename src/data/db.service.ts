import { injectable } from "inversify"
import mongoose from "mongoose"

import { subscriberModel } from "./subscribers.models"

@injectable()
export class DBService {
  private _db: typeof mongoose

  async connect() {
    if (process.env.DB_URI)
      this._db = await mongoose.connect(process.env.DB_URI)

    console.log("succesfully connected to DB")
  }

  get subscriber() {
    return this._db.model("Subscribers", subscriberModel)
  }
}
