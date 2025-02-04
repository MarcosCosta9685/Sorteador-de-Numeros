// Função para sortear um Número aleatório
function roll(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para criar os dados com os números sorteador
function addRoll(roll) {
  const rollDiv = document.createElement('div')
  rollDiv.classList.add('roll')

  const diceDiv = document.createElement('div')
  diceDiv.classList.add('dice')

  const diceBoxDiv = document.createElement('div')
  diceBoxDiv.classList.add('dice-box')

  const diceTextSpan = document.createElement('span')
  diceTextSpan.classList.add('dice-text')
  diceTextSpan.textContent = roll

  diceBoxDiv.appendChild(diceTextSpan)
  rollDiv.appendChild(diceDiv)
  rollDiv.appendChild(diceBoxDiv)

  rollsContainer.appendChild(rollDiv)

  diceDiv.style.animation = 'diceAnimation 3s';
  return
}

// Selecionando botões (sortear e sortear novamente)
const submitForm = document.querySelector('form')
const rollAgain = document.getElementById('roll_again')

// Selecionando texto da quantidade de resultados
const interationsQuantity = document.querySelector('.text span')

// Selecionando os valores colocados nas opções (Quantidade de sorteios, valor mínimo e valor máximo)
const amount_value = document.querySelector('#amount')
const min_value = document.querySelector('#min_value')
const max_value = document.querySelector('#max_value')

// Selecionando o local onde vão ficar os resultados dos sorteios
const rollsContainer = document.querySelector('.rolls')

// Selecionando as telas que irão sumir e aparecer (Quero sortear e Resultado do sorteio)
const selectBoard = document.querySelector('.select')
const rollingBoard = document.querySelector('.board')

// Código para selecionar todo o texto quando clicar nos inputs
amount.addEventListener(`focus`, () => amount.select());
min_value.addEventListener(`focus`, () => min_value.select());
max_value.addEventListener(`focus`, () => max_value.select());

// Número de sorteios inicial
let interations = 1

// Evento que acontece ao clicar em Sortear
submitForm.onsubmit = (event) => {
  // Evita que a página recarregue ao clicar no botão sortear
  event.preventDefault()

  // Transformando os valores colocados nas opções de String para Number
  const amount = Number(amount_value.value)
  const min = Number(min_value.value)
  const max = Number(max_value.value)

  // Vendo se o checkbox para números não repetidos foi selecionado
  const repeat = document.getElementById('repeat')

  //Trocando a tela de Quero Sortear para Resultado do Sorteio
  selectBoard.classList.add('hide')
  rollingBoard.classList.remove('hide')

  // Fazendo o sorteio caso o usuario tenha selecionado para não ter números repetidos
  if (repeat.checked) {
    // Criando uma lista de números que não pode ser repetidos
    const numbersRolled = new Set()

    // Criando a condição: enquanto a quantidade de números sorteados for menor que a quantidade desejada, o programa repete
    while (numbersRolled.size < amount) {
      // Acionando a função de sortear um número
      const rolled = roll(min, max)

      // Adicionando o número sorteado a lista de números que não podem ser repetidos. Caso seja sorteado um número repetido, ele não irá entrar aqui
      numbersRolled.add(rolled)
    }

    // Transformando a lista de números que não podem ser repetidos em um Array
    const numberList = Array.from(numbersRolled)

    // Criando uma estrutura para passar por todos os números no Array
    for (let i = 0; i < numberList.length; i++) {
      // Acionando a função para criar os dados com os valores. O valor criado será o que estiver passando pelo Array
      const add = addRoll(numberList[i])
    }
  }

  // Fazendo o sorteio caso o usuario não tenha selecionado para não ter números repetidos
  else {

    // Criando uma estrutura para sortear a quantidade certa de números selecionado pelo usuario
    for (let i = 0; i < amount; i++) {
      // Acionando a função de sortear um número
      const rolled = roll(min, max)

      // Acionando a função para criar os dados com os valores. O valor criado será o que tiver sido selecionado pela função anterior
      const add = addRoll(rolled)
    }
  }
}

// Evento que acontece ao clicar em Sortear Novamente
rollAgain.addEventListener('click', function (event) {
  // Trocando a tela de Resultado do Sorteio para Quero Sortear
  rollingBoard.classList.add('hide')
  selectBoard.classList.remove('hide')

  // Aumentando e modificando na tela o número de sorteios realizados na tela Resultado do Sorteio
  interations = interations + 1
  interationsQuantity.textContent = `${interations}º resultado`

  // Removendo os dados com os valores para poder sortear novamente
  while (rollsContainer.firstChild) {
    rollsContainer.removeChild(rollsContainer.firstChild);
  }
})