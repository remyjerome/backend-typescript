import { Request, Response } from "express"
import { SubscribersService } from "@logic/subscribers.service"
import { BaseHttpResponse } from "@web/lib/base-http-response"

export class SubscribersController {
  constructor(public readonly _service: SubscribersService) {
    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
    this.store = this.store.bind(this)
    this.update = this.update.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  async index(req: Request, res: Response) {
    const subscribers = await this._service.all()
    const response = BaseHttpResponse.sucess(subscribers)
    return res.json(response)
  }

  async show(req: Request, res: Response) {
    const subscriber = await this._service.findOne(req.body)
    const response = BaseHttpResponse.sucess(subscriber)
    res.json(response)
  }

  async store(req: Request, res: Response) {
    const subscriber = await this._service.create(req.body)
    const response = BaseHttpResponse.sucess(subscriber, 201)
    res.status(response.statusCode).json(response)
  }

  async update(req: Request, res: Response) {
    const updatedSubscriber = await this._service.updateOne(req.body)

    const response = BaseHttpResponse.sucess(updatedSubscriber, 204)

    if (!updatedSubscriber) res.send(401)
    else {
      res.sendStatus(response.statusCode).json(response)
    }
  }

  async destroy(req: Request, res: Response) {
    const deleted = await this._service.deleteOne(req.body)
    const response = BaseHttpResponse.sucess(deleted, 204)
    res.sendStatus(response.statusCode).json(response)
  }
}
