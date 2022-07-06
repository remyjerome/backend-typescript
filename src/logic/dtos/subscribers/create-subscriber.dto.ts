export class CreateSubscriberDto {
  constructor(public readonly name: string, public readonly channel: string) {}

  static from(body: Partial<CreateSubscriberDto>): CreateSubscriberDto {
    if (!body.name) {
      throw new Error("missing properties")
    }
    if (!body.channel) {
      throw new Error("missing properties")
    }

    return new CreateSubscriberDto(body.name, body.channel)
  }
}
