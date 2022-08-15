import { Request, Response } from "express"
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils"
import { SubscribersService } from "@logic/subscribers.service"
import {
  CreateSubscriberDto,
  SubscriberDto,
  UpdateSubscriberDto,
} from "@logic/dtos"
import { ValidateRequestMiddleware } from "@web/lib/middlewares"
import { GetOneSubscriberDto } from "@logic/dtos/subscribers/get-one-subscriber.dto"
import { BaseHttpResponse } from "@web/lib/base-http-response"

@controller("/subscribers")
export class SubscribersController {
  constructor(private readonly _service: SubscribersService) {}

  @httpGet("/")
  async index(req: Request, res: Response) {
    const subscribers = await this._service.all()
    const response = BaseHttpResponse.sucess(subscribers)
    res.json(response)
  }

  @httpGet("/:id", ValidateRequestMiddleware.withParams(GetOneSubscriberDto))
  async show(req: Request, res: Response) {
    const subscriber = await this._service.findOne(req.body)
    const response = BaseHttpResponse.sucess(subscriber)
    res.json(response)
  }

  @httpPost("/", ValidateRequestMiddleware.with(CreateSubscriberDto))
  async store(req: Request, res: Response) {
    const subscriber = await this._service.create(req.body)
    const response = BaseHttpResponse.sucess(subscriber, 201)
    res.status(response.statusCode).json(response)
  }

  @httpPatch("/:id", ValidateRequestMiddleware.withParams(UpdateSubscriberDto))
  async update(req: Request, res: Response) {
    const updatedSubscriber = await this._service.updateOne(req.body)

    const response = BaseHttpResponse.sucess(updatedSubscriber, 204)

    if (!updatedSubscriber) res.send(401)
    else {
      res.sendStatus(response.statusCode).json(response)
    }
  }

  @httpDelete("/:id", ValidateRequestMiddleware.withParams(GetOneSubscriberDto))
  async destroy(req: Request, res: Response) {
    const deleted = await this._service.deleteOne(req.body)
    const response = BaseHttpResponse.sucess(deleted, 204)
    res.sendStatus(response.statusCode).json(response)
  }
}
