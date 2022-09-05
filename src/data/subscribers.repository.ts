import { DBContext } from "@data/db.context"

import { ISubscriber } from "./subscribers.models"

export class SubscribersRepository {
  constructor(private readonly dbContext: DBContext) {}

  async all() {
    return this.dbContext.subscriber.find({})
  }

  async findOne(id: ISubscriber["_id"]) {
    return this.dbContext.subscriber.findById(id)
  }

  async create(entity: Partial<ISubscriber>) {
    return this.dbContext.subscriber.create<any>(entity)
  }

  async updateOne(payload: Partial<ISubscriber>) {
    const foundSubscriber = await this.dbContext.subscriber.findById(
      payload._id
    )

    if (!foundSubscriber) {
      throw new Error("subscriber does not exist")
    }

    if (payload.name) foundSubscriber.name = payload.name
    if (payload.channel) foundSubscriber.channel = payload.channel

    foundSubscriber.save()

    return foundSubscriber
  }

  async deleteOne(id: string) {
    return this.dbContext.subscriber.deleteOne({ _id: id })
  }
}
