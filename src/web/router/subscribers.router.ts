import express, { Router } from "express"
import { SubscribersRepository } from "@data/subscribers.repository"
import { SubscribersService } from "@logic/subscribers.service"
import { DBContext } from "@data/db.context"
import { SubscribersController } from "@web/controllers/subscribers.controller"
import { ValidateRequestMiddleware } from "@web/lib/middlewares"
import {
  CreateSubscriberDto,
  GetOneSubscriberDto,
  UpdateSubscriberDto,
} from "@logic/dtos/subscribers"

const router = express.Router()

export const routerSubscribers = (db: DBContext): Router => {
  const subscriberRepository = new SubscribersRepository(db)
  const subscribersService = new SubscribersService(subscriberRepository)
  const subscribersController = new SubscribersController(subscribersService)

  router
    .route("/")
    .get(subscribersController.index)
    .post(
      ValidateRequestMiddleware.with(CreateSubscriberDto),
      subscribersController.store
    )

  router
    .route("/:id")
    .get(
      ValidateRequestMiddleware.withParams(GetOneSubscriberDto),
      subscribersController.show
    )
    .patch(
      ValidateRequestMiddleware.withParams(UpdateSubscriberDto),
      subscribersController.update
    )
    .delete(
      ValidateRequestMiddleware.withParams(GetOneSubscriberDto),
      subscribersController.destroy
    )

  return router
}
