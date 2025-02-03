const submitForm = document.querySelector('form')
const amount = document.querySelector('#amount')
const min_value = document.querySelector('#min_value')
const max_value = document.querySelector('#max_value')

amount.addEventListener(`focus`, () => amount.select());
min_value.addEventListener(`focus`, () => min_value.select());
max_value.addEventListener(`focus`, () => max_value.select());



submitForm.onsubmit = (event) => {
  event.preventDefault()
  console.log(amount.value)
  console.log(min_value.value)
  console.log(max_value.value)

  const checkbox = document.getElementById("repeat").checked;
  console.log(checkbox)
}