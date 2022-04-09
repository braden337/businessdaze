export abstract class DateCalculator {
  readonly #oneDayInMilliseconds: number;
  readonly #weekdays: Set<number>;

  abstract calculate(from: Date): number;

  constructor() {
    this.#oneDayInMilliseconds = 864e5;
    this.#weekdays = new Set(this.#range(5));
  }

  get ONE_DAY() {
    return this.#oneDayInMilliseconds;
  }
  
  isBusiness(day: Date): boolean {
    return this.#weekdays.has(day.getUTCDay());
  }

  inSameMonth(...days: Date[]): boolean {
    return new Set(days.map(day => day.getUTCMonth())).size === 1;
  }

  *#range(size: number): Generator<number> {
    let n = 1;

    while (n <= size) {
      yield n++;
    }
  }
}

export class BusinessDaysInMonth extends DateCalculator {
  calculate(from: Date): number {
    return this.#value(from) + this.#countNext(from) + this.#countPrevious(from);
  }

  #value(day: Date): number {
    return super.isBusiness(day) ? 1 : 0;
  }

  #countNext(day: Date): number {
    return this.#count(day, 1);
  }

  #countPrevious(day: Date): number {
    return this.#count(day, -1);
  }

  #count(day: Date, direction: number): number {
    const adjacent = new Date(+day + super.ONE_DAY * direction);

    return super.inSameMonth(day, adjacent) ? this.#value(adjacent) + this.#count(adjacent, direction) : 0;
  }
}
