;(function (Function_prototype) {
  Function_prototype.debounce = function (delay, ctx) {
    let fn = this,
      timer
    return function () {
      let args = arguments,
        that = this
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(ctx || that, args)
      }, delay)
    }
  }
})(Function.prototype)

export default function AsyncDelay(ms) {
  return new Promise((r) => setTimeout(() => r(), ms))
}
