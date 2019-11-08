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

const showResults = () => {
  const hideDeal = document.querySelector('.hit-button')
  hideDeal.classList.add('hide')
  const showResults = document.querySelector('.results')
  showResults.classList.remove('hide')
}

document.addEventListener('DOMContentLoaded', makeAndShuffleDeck)
document.querySelector('button').addEventListener('click', dealACardToPlayer)
