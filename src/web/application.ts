import { SubscribersRepository } from "@data/subscribers.repository"
import { SubscribersService } from "@logic/subscribers.service"
import express from "express"
import { DBContext } from "@data/db.context"
import { Application } from "@web/lib/abstract-application"
import { BaseHttpResponse } from "@web/lib/base-http-response"

import { ValidationException } from "@logic/exceptions"

import { routerSubscribers } from "@web/router/index"

export class App extends Application {
  async setup() {
    // const _db = this.container.get(DBContext)

    // await _db.connect()

    const db = new DBContext()

    await db.connect()

    const app = express()

    app.use(express.json())

    app.use((err: any, req: any, res: any, next: any) => {
      if (err instanceof ValidationException) {
        const response = BaseHttpResponse.failed(err.message, 419)
        res.status(response.statusCode).json(response)
      }

      next()
    })

    app.use("/api/v1/subscribers", routerSubscribers(db))

    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`)
    })
  }
}
