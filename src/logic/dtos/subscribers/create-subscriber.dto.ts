import { ValidationException } from "@logic/exceptions"

export class CreateSubscriberDto {
  constructor(public readonly name: string, public readonly channel: string) {}

  static from(body: Partial<CreateSubscriberDto>): CreateSubscriberDto {
    if (!body.name) {
      throw new ValidationException("missing property name")
    }
    if (!body.channel) {
      throw new ValidationException("missing property channel")
    }

    return new CreateSubscriberDto(body.name, body.channel)
  }
}
