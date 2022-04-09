export function calculateBusinessDaysInMonth(date: Date): number {
  return dayValue(date) + countNextDay(date) + countPreviousDay(date);
}

function dayValue(date: Date): number {
  return isBusinessDay(date) ? 1 : 0;
}

function isBusinessDay(date: Date): boolean {
  return weekdays.has(date.getUTCDay());
}

const weekdays: Set<number> = new Set(range(5));

export function* range(size: number): Generator<number> {
  let n = 1;

  while (n <= size) {
    yield n++;
  }
}

function countNextDay(date: Date): number {
  return countDay(date);
}

function countPreviousDay(date: Date): number {
  return countDay(date, -1);
}

function countDay(date: Date, direction: number = 1): number {
  const next = new Date(+date + 864e5 * direction);

  return isSameMonth(date, next) ? dayValue(next) + countDay(next, direction) : 0;
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getUTCMonth() === b.getUTCMonth();
}
