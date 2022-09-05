export abstract class Application {
  constructor(options: any) {
    this.setup()
  }

  abstract setup(): Promise<void> | void
}
