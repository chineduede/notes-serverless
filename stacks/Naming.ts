export class NamingStrategy {
  constructor(
    private readonly app: string,
    private readonly stage: string,
  ) {}

  public name(name: string, splitter = '-') {
    return [this.app, name, this.stage].join(splitter);
  }
}

export const namingStrategy = new NamingStrategy('sired-notes', 'dev');
