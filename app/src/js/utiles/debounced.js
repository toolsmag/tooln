export default function (fn, delay) {
  var timerID = null;

  return (...args) => {
    if (timerID) {
      clearTimeout(timerID);
    }

    timerID = setTimeout(() => {
      fn(...args);
      timerID = null;
    }, delay);
  };
}
