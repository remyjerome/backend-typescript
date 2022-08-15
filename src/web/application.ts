import { SubscribersRepository } from "@data/subscribers.repository"
import { SubscribersService } from "@logic/subscribers.service"
import express from "express"
import { Container } from "inversify"
import { InversifyExpressServer, next } from "inversify-express-utils"
import { DBContext } from "@data/db.context"
import { Application } from "@web/lib/abstract-application"
import { BaseHttpResponse } from "@web/lib/base-http-response"

import "@web/controllers/subscribers.controller"
import { ValidationException } from "@logic/exceptions"

export class App extends Application {
  configureServices(container: Container): void {
    container.bind(DBContext).toSelf()
    container.bind(SubscribersRepository).toSelf()
    container.bind(SubscribersService).toSelf()
  }
  async setup() {
    const _db = this.container.get(DBContext)

    await _db.connect()

    const server = new InversifyExpressServer(this.container)

    server.setErrorConfig((app) => {
      app.use((err: any, req: any, res: any, next: any) => {
        if (err instanceof ValidationException) {
          const response = BaseHttpResponse.failed(err.message, 419)
          res.status(response.statusCode).json(response)
        }

        next()
      })
    })

    server.setConfig((app) => {
      app.use(express.json())
    })

    const app = server.build()

    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`)
    })
  }
}
