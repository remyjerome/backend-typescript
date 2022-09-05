import { NextFunction, Request, Response } from "express"

import { BaseMiddleware } from "@web/lib/base-middleware"

export class ValidateRequestMiddleware extends BaseMiddleware {
  constructor(
    private readonly DtoClass: any,
    private readonly withParams = false
  ) {
    super()
  }

  public execute(
    req: Request,
    _: Response,
    next: NextFunction
  ): void | Promise<void> {
    if (this.withParams) {
      req.body = {
        ...req.body,
        ...req.params,
      }
    }
    req.body = this.DtoClass.from(req.body)
    next()
  }

  static with(dto: any) {
    return new ValidateRequestMiddleware(dto, false).execute
  }

  static withParams(dto: any) {
    return new ValidateRequestMiddleware(dto, true).execute
  }
}
