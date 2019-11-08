const suits = ['hearts', 'diamonds', 'spades', 'clubs']
const ranks = [
  'Ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King'
]
const values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
const deck = []
const dealerHand = []
const playerHand = []
let dealerHandSum = 0
let playerHandSum = 0

const loserMessage = document.createElement('h3')
loserMessage.textContent = 'LOSER!!'
const blackJackMessage = document.createElement('h3')
blackJackMessage.textContent = 'BLACKJACK!!'
const winnerMessage = document.createElement('h3')
winnerMessage.textContent = 'WINNER! WINNER!'
const drawMessage = document.createElement('h3')
drawMessage.textContent = 'DRAW'
const enableHitButton = document.querySelector('.hit-button')
const enableStandButton = document.querySelector('.stand-button')
const enableResetGame = document.querySelector('.reset-game')

const getCardValue = rank => {
  if (rank === 'Ace') {
    return 11
  } else if (rank === 'King' || rank === 'Queen' || rank === 'Jack') {
    return 10
  } else {
    return parseInt(rank)
  }
}

const makeDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const card = {
        rank: ranks[j],
        suit: suits[i],
        value: getCardValue(ranks[j]),
        imageUrl: ranks[j] + '_of_' + suits[i] + '.svg'
      }
      deck.push(card)
    }
  }
}
const shuffleDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
  console.log(shuffleDeck)
}

const makeAndShuffleDeck = () => {
  makeDeck()
  shuffleDeck()
  startGame()
}
const dealACardToPlayer = () => {
  const drawnCard = deck.pop()
  playerHand.push(drawnCard)
  const cardLi = document.createElement('li')
  const p = document.createElement('p')
  p.textContent = drawnCard.rank + 'of' + drawnCard.suit
  const img = document.createElement('img')
  img.src = '/images/cards/' + drawnCard.imageUrl
  cardLi.appendChild(p)
  cardLi.appendChild(img)
  document.querySelector('.player-hand').appendChild(cardLi)

  getPlayerHandSum()

  if (playerHandSum === 21) {
    showResults()
    document.querySelector('.results').appendChild(blackJackMessage)
  } else if (playerHandSum > 21) {
    showResults()
    document.querySelector('.results').appendChild(loserMessage)
  } else if (playerHandSum < 21) {
    enableHitButton.addEventListener('click', dealACardToPlayer)
  }
}

const getPlayerHandSum = () => {
  let playerHandSum = 0
  for (let i = 0; i < playerHand.length; i++) {
    const card = playerHand[i]
    playerHandSum += card.value
    document.querySelector('.player-sum').textContent = playerHandSum.toString()
  }
  console.log(playerHandSum)
}

const dealACardToDealer = () => {
  for (let i = 0; i < 1; i++) {
    const drawnCard = deck.pop()
    dealerHand.push(drawnCard)
    getDealerHandSum()
  }
}

const getDealerHandSum = () => {
  let dealerHandSum = 0
  for (let i = 0; i < dealerHand.length; i++) {
    const card = dealerHand[i]
    dealerHandSum += card.value
  }
}

const printDealerCards = () => {
  for (let i = 0; i < 1; i++) {
    const drawnCard = dealerHand[i]
    const cardLi = document.createElement('li')
    const p = document.createElement('p')
    p.textContent = drawnCard.rank + 'of' + drawnCard.suit
    const img = document.createElement('img')
    img.src = '/images/cards/' + drawnCard.imageUrl
    cardLi.appendChild(p)
    cardLi.appendChild(img)
    document.querySelector('.dealer-cards').appendChild(cardLi)
    document
      .querySelector('.stand-button')
      .addEventListener('click', printDealerCards)
  }
  if (dealerHandSum > playerHandSum && dealerHandSum < 22) {
    // do this
    showResults()
    document.querySelector('.results').appendChild(loserMessage)
  } else if (dealerHandSum < playerHandSum) {
    showResults()
    document.querySelector('.results').appendChild(winnerMessage)
  } else if (dealerHandSum === playerHandSum) {
    document.querySelector('.results').appendChild(drawMessage)
  }
}

const showTotal = document.querySelector('.dealer-sum')
showTotal.textContent = dealerHandSum.toString()

const showResults = () => {
  const hideDeal = document.querySelector('.hit-button')
  hideDeal.classList.add('.hide')
  const hideStand = document.querySelector('.stand-button')
  hideStand.classList.add('.hide')
  const showResults = document.querySelector('.results')
  showResults.classList.remove('.hide')
}

const hideResults = () => {
  const hideDeal = document.querySelector('.hit-button')
  hideDeal.classList.remove('.hide')
  const hideStand = document.querySelector('.stand-button')
  hideStand.classList.remove('.hide')
  const showResults = document.querySelector('.results')
  showResults.classList.add('.hide')
}

const startGame = () => {
  // deal 2 cards to player
  dealACardToPlayer()
  dealACardToPlayer()
  // deal 2 cards to the dealer
  dealACardToDealer()
  dealACardToDealer()
}

document.addEventListener('DOMContentLoaded', makeAndShuffleDeck)
document.querySelector('button').addEventListener('click', dealACardToPlayer)

document
  .querySelector('.stand-button')
  .addEventListener('click', printDealerCards)
