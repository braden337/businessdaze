export default abstract class DateCalculator {
  readonly #weekdays: Set<number>;
  readonly #millisecondMap: Map<string, number>;

  abstract calculate(from: Date): number;

  constructor() {
    this.#weekdays = new Set(this.#range(5));
    this.#millisecondMap = new Map([
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
    return new Date(+day + this.#milliseconds(unit) * amount);
  }

  inSameMonth(...days: Date[]): boolean {
    return new Set(days.map(day => day.getUTCMonth())).size === 1;
  }

  #milliseconds(unit: string): number {
    const ms = this.#millisecondMap.get(unit);

    if (ms === undefined) {
      throw new Error(`${unit} is not an accepted unit`);
    }

    return ms;
  }

  *#range(size: number): Generator<number> {
    let n = 1;

    while (n <= size) {
      yield n++;
    }
  }
}
