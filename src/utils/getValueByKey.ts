export default function getValueByKey(array: any[], key: string | number): any {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value == key) {
      return array[i].label;
    }
  }
  return null;
}
