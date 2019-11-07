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
const playerHand = []

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

  let sum = 0
  for (let i = 0; i < playerHand.length; i++) {
    sum += playerHand[i].value
  }

  document.querySelector('.player-sum').textContent = sum
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

const makeAndShuffleDeck = () => {
  makeDeck()
  shuffleDeck()
}

document.addEventListener('DOMContentLoaded', makeAndShuffleDeck)
document.querySelector('button').addEventListener('click', dealACardToPlayer)
