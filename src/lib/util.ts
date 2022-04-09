export function* range(size: number): Generator<number> {
  let n = 1;

  while (n <= size) {
    yield n++;
  }
}
