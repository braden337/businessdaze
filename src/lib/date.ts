export abstract class DateCalculator {
  readonly #weekdays: Set<number>;
  readonly #unitsInMilliseconds: Map<string, number>;

  abstract calculate(from: Date): number;

  constructor() {
    this.#weekdays = new Set(this.#range(5));
    this.#unitsInMilliseconds = new Map([
      ['second', 1000],
      ['minute', 6e5],
      ['hour', 36e5],
      ['day', 864e5],
      ['week', 6048e5],
    ]);
  }

  isBusiness(day: Date): boolean {
    return this.#weekdays.has(day.getUTCDay());
  }

  add(day: Date, amount: number, unit: string): Date {
    const milliseconds = this.#unitsInMilliseconds.get(unit);

    if (milliseconds === undefined) {
      throw new Error(`${unit} is not an accepted unit`);
    }

    return new Date(+day + milliseconds * amount);
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
    const adjacent = super.add(day, direction, 'day');

    if (!super.inSameMonth(day, adjacent)) {
      return 0;
    }

    return this.#value(adjacent) + this.#count(adjacent, direction);
  }
}
