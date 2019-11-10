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
  console.log(deck)
}
const shuffleDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
  console.log(deck)
}

const main = () => {
  makeDeck()
  shuffleDeck()
  startGame()
}

const startGame = () => {
  // deal 2 cards to player
  dealACardToPlayer()
  dealACardToPlayer()
  // deal 2 cards to the dealer
  dealACardToDealer()
  dealACardToDealer()
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
}

const getPlayerHandSum = () => {
  let playerHandSum = 0
  for (let i = 0; i < playerHand.length; i++) {
    const card = playerHand[i]
    playerHandSum += card.value
    document.querySelector('.player-sum').textContent = playerHandSum.toString()
  }
  if (playerHandSum > 21) {
    document.querySelector('h3').textContent = 'BUST'
    document.querySelector('.reset-game').classList.remove('.hide')
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
  }
  console.log(playerHandSum)
}

const dealACardToDealer = () => {
  const drawnCard = deck.pop()
  dealerHand.push(drawnCard)
  const cardLi = document.createElement('li')
  const p = document.createElement('p')
  p.textContent = drawnCard.rank + 'of' + drawnCard.suit
  const img = document.createElement('img')
  img.src = '/images/cards/' + drawnCard.imageUrl
  cardLi.appendChild(p)
  cardLi.appendChild(img)
  document.querySelector('.dealer-hand').appendChild(cardLi)

  getDealerHandSum()
}

const getDealerHandSum = () => {
  let dealerHandSum = 0
  for (let i = 0; i < dealerHand.length; i++) {
    const card = dealerHand[i]
    dealerHandSum += card.value
    document.querySelector('.dealer-sum').textContent = dealerHandSum.toString()
  }

  console.log(dealerHandSum)
}

const printDealerCards = document
  .querySelector('.dealer-sum')
  .classList.remove('.hide')

document.addEventListener('DOMContentLoaded', main)
document.querySelector('button').addEventListener('click', dealACardToPlayer)

document
  .querySelector('.stand-button')
  .addEventListener('click', printDealerCards)
