import { SubscribersRepository } from "@data/subscribers.repository"
import {
  CreateSubscriberDto,
  GetOneSubscriberDto,
  SubscriberDto,
  UpdateSubscriberDto,
} from "@logic/dtos"
import { CouldNotFindSubscriberException } from "@logic/exceptions"

export class SubscribersService {
  constructor(private readonly subscribersRepo: SubscribersRepository) {}

  async all() {
    const subscribers = await this.subscribersRepo.all()

    return SubscriberDto.fromMany(subscribers)
  }

  async findOne(getOneSubscriberDto: GetOneSubscriberDto) {
    const foundSubscriber = await this.subscribersRepo.findOne(
      getOneSubscriberDto.id
    )

    if (!foundSubscriber) {
      throw new CouldNotFindSubscriberException()
    }

    return SubscriberDto.from(foundSubscriber)
  }

  async create(createSubscriberDto: CreateSubscriberDto) {
    const createSubscriber = await this.subscribersRepo.create(
      createSubscriberDto
    )
    return SubscriberDto.from(createSubscriber)
  }

  async updateOne(updateSubscriberDto: UpdateSubscriberDto) {
    return this.subscribersRepo.updateOne(updateSubscriberDto)
  }

  async deleteOne({ id }: GetOneSubscriberDto) {
    return this.subscribersRepo.deleteOne(id)
  }
}
