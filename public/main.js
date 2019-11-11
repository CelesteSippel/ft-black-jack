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

let dealerTotal = 0
let playerTotal = 0
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

  showSum(playerHand, '.player-sum')
  gameEnd()
}

const hitDealer = () => {
  const drawnCard = deck.pop()
  dealerHand.push(drawnCard)
  const cardLi = document.createElement('li')
  const img = document.createElement('img')
  img.src = '/images/cards/' + drawnCard.imageUrl

  cardLi.appendChild(img)
  document.querySelector('.dealer-hand').appendChild(cardLi)

  showSum(dealerHand, '.dealer-sum')
  gameEnd()
}

const beginGame = () => {
  dealCard(deck, playerHand, '.player-hand', show)
  dealCard(deck, dealerHand, '.dealer-hand', hide)
  dealCard(deck, playerHand, '.player-hand', show)
  dealCard(deck, dealerHand, '.dealer-hand', hide)

  showSum(playerHand, '.player-sum')
}

const gameEnd = () => {
  const dealerTotal = document.querySelector('.dealer-sum').value
  const playerTotal = document.querySelector('.player-sum').value
  if (dealerTotal === 21) {
    document.querySelector('.is-dealer-winner').textContent = 'Dealer Wins'
    document.querySelector('.did-you-win').textContent = 'Player One Loses!'
  } else if (dealerTotal > 21) {
    document.querySelector('.is-dealer-winner').textContent =
      'Dealer Bust, Player One Wins'
    document.querySelector('.did-you-win').textContent =
      'House Busted, Player One Wins'
  } else if (dealerTotal === 21 && playerTotal === 21) {
    document.querySelector('.did-you-win').textContent = 'Player One Wins!'
    document.querySelector('.is-dealer-winner').textContent = 'Dealer Loses'
  } else if (playerTotal === 21) {
    document.querySelector('.did-you-win').textContent = 'Player One Wins!'
    document.querySelector('.is-dealer-winner').textContent = 'Dealer Loses'
  } else if (playerTotal > 21) {
    document.querySelector('.did-you-win').textContent =
      'Busted, Player One Wins'
    document.querySelector('is-dealer-winner').textContent =
      'Player One Busted, Dealer Wins'
  } else if (
    dealerTotal >= 12 &&
    playerTotal > dealerTotal &&
    playerTotal < 21
  ) {
    document.querySelector('.did-you-win').textContent = 'Player One Wins'
    document.querySelector('.is-dealer-winner').textContent = 'Dealer Loses'
  } else if (
    dealerTotal >= 12 &&
    playerTotal < dealerTotal &&
    playerTotal < 21
  ) {
    document.querySelector('.is-dealer-winner').textContent = 'Dealer Wins'
    document.querySelector('.did-you-win').textContent = 'Dealer Wins'
  } else if (
    dealerTotal >= 12 &&
    playerTotal === dealerTotal &&
    playerTotal < 21
  ) {
    document.querySelector('.is-dealer-winner').textContent =
      'Push -- No Winner'
    document.querySelector('.did-you-win').textContent = 'Push -- No Winner'
  }
  document.querySelector('.reset-button').classList.remove('hide')
  document.querySelector('.hit-button').disabled = true
  document.querySelector('.stand-button').disabled = true
  document.querySelector('.dealer-hit').disabled = true
}

// const resetGame = () => {
//   document.querySelector('.reset-button').classList.add('hide')
//   document.querySelector('.hit-button').disabled = false
//   document.querySelector('.stand-button').disabled = false
//   document.querySelector('.dealer-hit').disabled = false
//   let playerTotal = 0
//   let dealerTotal = 0

//   document.querySelector('.player-sum').textContent = playerTotal
//   document.querySelector('.dealer-sum').textContent = dealerTotal
// }
document.addEventListener('DOMContentLoaded', main)
document.querySelector('.hit-button').addEventListener('click', hitPlayer)
document.querySelector('.dealer-hit').addEventListener('click', hitDealer)
document
  .querySelector('.stand-button')
  .addEventListener('click', showDealerHand)
document.querySelector('.reset-button').addEventListener('click', resetGame)
