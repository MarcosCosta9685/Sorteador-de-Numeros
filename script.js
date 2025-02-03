function roll (min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

const submitForm = document.querySelector('form')
const rollAgain = document.getElementById('roll_again')

const amount_value = document.querySelector('#amount')
const min_value = document.querySelector('#min_value')
const max_value = document.querySelector('#max_value')

const boardRolls = document.querySelector('.rolls')
const selectBoard = document.querySelector('.select')
const rollingBoard = document.querySelector('.board')

amount.addEventListener(`focus`, () => amount.select());
min_value.addEventListener(`focus`, () => min_value.select());
max_value.addEventListener(`focus`, () => max_value.select());

let interations = 1


submitForm.onsubmit = (event) => {
  event.preventDefault()
  
  const amount = Number(amount_value.value)
  const min = Number(min_value.value)
  const max = Number(max_value.value)
  
  const repeat = document.getElementById('repeat')
  selectBoard.classList.add('hide')
  rollingBoard.classList.remove('hide')


  if (repeat.checked) {
    const numbersRolled = new Set()

    while (numbersRolled.size < amount) {
      const rolled = roll(min,  max)
      numbersRolled.add(rolled)
    }
    
    const numberList = Array.from(numbersRolled)
    
    for (let i = 0; i < numberList.length; i++) {
      const newRoll = document.createElement('div')
      newRoll.classList.add('roll')
      newRoll.append(numberList[i])

      boardRolls.appendChild(newRoll)
    }
  }

  else {
    for (let i = 0; i < amount; i++) {
      const rolled = roll(min,  max)

      const newRoll = document.createElement('div')
      newRoll.classList.add('roll')
      newRoll.append(rolled)

      boardRolls.appendChild(newRoll)
    }
  }

  rollAgain.addEventListener('click', function(event) {
    rollingBoard.classList.add('hide')
    selectBoard.classList.remove('hide')

    while (boardRolls.firstChild) {
      boardRolls.removeChild(boardRolls.firstChild);
    }
  })
}