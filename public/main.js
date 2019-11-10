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
// getting values as a parallel array
// const values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
const suits = ['Spades', 'Diamonds', 'Clubs', 'Hearts']

const deck = []
const playerHand = []
const dealerHand = []
const show = true
const hide = false

// get values using a if statement
const getCardValue = rank => {
  if (rank === 'Ace') {
    return 11
  } else if (rank === 'King' || rank === 'Queen' || rank === 'Jack') {
    return 10
  } else {
    return parseInt(rank)
  }
}

const main = () => {
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
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * 52)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
  console.log(deck)
  beginGame()
}

const showSum = (hand, sumContainer) => {
  let playerSum = 0
  for (let i = 0; i < hand.length; i++) {
    playerSum += hand[i].value
  }
  document.querySelector(sumContainer).textContent = playerSum
}

const dealCard = (deckFrom, handTo, imageContainer, showHide) => {
  handTo.push(deckFrom.pop())

  const cardLi = document.createElement('li')
  const img = document.createElement('img')
  if (showHide) {
    img.src = './images/cards/' + handTo[handTo.length - 1].imageUrl
    img.alt = './images/red back.svg'
  } else {
    img.alt = './images/cards/' + handTo[handTo.length - 1].imageUrl
    img.src = './images/red back.svg'
  }
  cardLi.appendChild(img)
  document.querySelector(imageContainer).appendChild(cardLi)
}

const showDealerHand = () => {
  flipCard('.dealer-hand')
  showSum(dealerHand, '.dealer-sum')
}

const flipCard = imageContainer => {
  // console.log(document.querySelector(imageContainer).children.length)
  for (
    let i = 0;
    i < document.querySelector(imageContainer).children.length;
    i++
  ) {
    // console.log(document.querySelector(imageContainer).children[i].children[0])
    const img = document.querySelector(imageContainer).children[i].children[0]
    const temp = img.src
    img.src = img.alt
    img.alt = temp
  }
}

const hitPlayer = () => {
  const drawnCard = deck.pop()
  playerHand.push(drawnCard)
  const cardLi = document.createElement('li')
  const img = document.createElement('img')
  img.src = '/images/cards/' + drawnCard.imageUrl

  cardLi.appendChild(img)
  document.querySelector('.player-hand').appendChild(cardLi)
}

const hitDealer = () => {
  const drawnCard = deck.pop()
  dealerHand.push(drawnCard)
  const cardLi = document.createElement('li')
  const img = document.createElement('img')
  img.src = '/images/cards/' + drawnCard.imageUrl

  cardLi.appendChild(img)
  document.querySelector('.dealer-hand').appendChild(cardLi)
}

const beginGame = () => {
  dealCard(deck, playerHand, '.player-hand', show)
  dealCard(deck, dealerHand, '.dealer-hand', hide)
  dealCard(deck, playerHand, '.player-hand', show)
  dealCard(deck, dealerHand, '.dealer-hand', hide)

  showSum(playerHand, '.player-sum')
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.hit-button').addEventListener('click', hitPlayer)
document.querySelector('.dealer-hit').addEventListener('click', hitDealer)
document
  .querySelector('.stand-button')
  .addEventListener('click', showDealerHand)
