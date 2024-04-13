export default async function mapAsync<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
) {
  const result = await Promise.all(iterable.map(callbackFn));
  return result;
}
