import "dotenv/config"
import "reflect-metadata"
import { App } from "./web/application"

import "./web/controllers/subscribers.controller"

// export class SubscriberEntity {
//   constructor(public readonly name: string, public readonly subscribedToChannel: string) {}
// }

// export class SubscriberRequestDto {
//   constructor(public readonly name: string, public readonly subscribedToChannel: string) {}

//   static from(body: Partial<SubscriberRequestDto>): SubscriberRequestDto {
//     if(!body.name || !body.subscribedToChannel) {
//       throw new Error('missing properties')
//     }

//     return new SubscriberRequestDto(
//       body.name,
//       body.subscribedToChannel
//     )
//   }
// }
// export class SubscriberResponseDto {
//   constructor(public readonly name: string, public readonly subscribedToChannel: string) {}

//   static from(entity: SubscriberEntity) {
//     return new SubscriberResponseDto(entity.name, entity.subscribedToChannel)
//   }
// }

export async function bootstrap() {
  new App().setup()
}

bootstrap()
