export default function setCancellableInterval(
  callback: () => void,
  delay?: number,
  ...args: Array<unknown>
): () => void {
  const timerId = setInterval(callback, delay, ...args);
  return function () {
    clearInterval(timerId);
  };
}
