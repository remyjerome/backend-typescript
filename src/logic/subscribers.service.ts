import { SubscribersRepository } from "@data/subscribers.repository"
import {
  CreateSubscriberDto,
  GetOneSubscriberDto,
  SubscriberDto,
  UpdateSubscriberDto,
} from "@logic/dtos"
import { CouldNotFindSubscriberException } from "@logic/exceptions"

export class SubscribersService {
  constructor(private readonly _subscribersRepo: SubscribersRepository) {}

  async all() {
    const subscribers = await this._subscribersRepo.all()

    return SubscriberDto.fromMany(subscribers)
  }

  async findOne(getOneSubscriberDto: GetOneSubscriberDto) {
    const foundSubscriber = await this._subscribersRepo.findOne(
      getOneSubscriberDto.id
    )

    if (!foundSubscriber) {
      throw new CouldNotFindSubscriberException()
    }

    return SubscriberDto.from(foundSubscriber)
  }

  async create(createSubscriberDto: CreateSubscriberDto) {
    const createSubscriber = await this._subscribersRepo.create(
      createSubscriberDto
    )
    return SubscriberDto.from(createSubscriber)
  }

  async updateOne(updateSubscriberDto: UpdateSubscriberDto) {
    return this._subscribersRepo.updateOne(updateSubscriberDto)
  }

  async deleteOne({ id }: GetOneSubscriberDto) {
    return this._subscribersRepo.deleteOne(id)
  }
}
