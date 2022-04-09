import { range } from './util';

export abstract class DateCalculator {
  readonly #weekdays = new Set(range(5));
  readonly #millisecondMap = new Map([
    ['second', 1000],
    ['minute', 6e5],
    ['hour', 36e5],
    ['day', 864e5],
    ['week', 6048e5],
  ]);

  abstract calculate(from: Date): number;

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
}
