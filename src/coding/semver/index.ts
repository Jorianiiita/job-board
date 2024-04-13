export default function compare(v1: string, v2: string) {
  if (v1 === v2) return 0;
  const v1Arr = v1.split('.').map(Number);
  const v2Arr = v2.split('.').map(Number);
  for (let i = 0; i < v1Arr.length; i++) {
    if (v1Arr[i] > v2Arr[i]) {
      return 1;
    }
    if (v1Arr[i] < v2Arr[i]) {
      return -1;
    }
  }
  return 0;
}
