export abstract class HttpRepository<P, T> {
  abstract execute(props: P): Promise<T>;
}
