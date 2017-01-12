export default function getIterator(obj){
  const iterator = obj.getIterator();
  iterator[Symbol.iterator] = function () {
    let current;
    let last = this.STOP_ITERATION;
    return {
      next() {
        current = iterator.getNext();
        if (current !== last) {
          return {
            done: false,
            value: current
          };
        } else {
          return {
            done: true
          };
        }
      }
    }
  };
  return iterator
}