export class EntityIdsUtil {

  public static i: number = 1;

  constructor() {
  }

  public static getEntityId(): number {
    return this.i++;
  }

}
