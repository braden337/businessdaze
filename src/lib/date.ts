export function calculateBusinessDaysInMonth(startingFrom: Date): number {
  return value(startingFrom) + countNext(startingFrom) + countPrevious(startingFrom);
}

function value(day: Date): number {
  return isBusiness(day) ? 1 : 0;
}

function isBusiness(day: Date): boolean {
  return weekdays.has(day.getUTCDay());
}

const weekdays: Set<number> = new Set(range(5));

export function* range(size: number): Generator<number> {
  let n = 1;

  while (n <= size) {
    yield n++;
  }
}

function countNext(day: Date): number {
  return count(day);
}

function countPrevious(day: Date): number {
  return count(day, -1);
}

function count(day: Date, direction: number = 1): number {
  const next = new Date(+day + 864e5 * direction);

  return inSameMonth(day, next) ? value(next) + count(next, direction) : 0;
}

function inSameMonth(...days: Date[]): boolean {
  return new Set(days.map(day => day.getUTCMonth())).size === 1;
}
