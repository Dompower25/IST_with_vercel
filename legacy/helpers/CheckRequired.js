export default function CheckRequired() {
  const reqFields = document.querySelectorAll('.required_field')
  const reqList = Array.from(reqFields)

  let resultsArr = []

  if (reqList.length > 0) {
    reqList.map((el) => {
      if (!el.validity.valid) {
        el.classList.add('invalid')
        resultsArr.push(false)
      } else {
        el.classList.remove('invalid')
        resultsArr.push(true)
      }
    })
  }

  return resultsArr.includes(false) ? false : true
}
