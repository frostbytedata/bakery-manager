export class PaginationOptions {
  readonly take: number;
  readonly skip: number;

  constructor(page: number, amount: number) {
    this.take = +amount || 10;
    this.skip = ((+page <= 0 ? 1 : +page) - 1) * +amount || 0;
  }

  query(maxReturned: number = 100) {
    console.info('maxReturned: ', maxReturned);
    return {
      take: this.take <= maxReturned ? this.take : maxReturned,
      skip: this.skip,
    };
  }
}
