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
const show = true
const hide = false

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
  const img = document.createElement('img')
  if (showHide) {
    img.src = './images/cards/' + drawnCard.imageUrl
    img.alt = './images/red back.svg'
  } else {
    img.alt = './images/ red back.svg'
    img.src = './images/cards/' + drawnCard.imageUrl
  }
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

document.addEventListener('DOMContentLoaded', main)
document.querySelector('button').addEventListener('click', dealACardToPlayer)

document
  .querySelector('.stand-button')
  .addEventListener('click', showDealerHand)
const gameEnd = () => {
  // valueOfDealerHand()
  // document.querySelector('.dealer-total').textContent = dealerTotal
  // valueOfPlayerOneHand()
  // document.querySelector('.player-one-win').textContent = playerOneTotal
  if (dealerHand === 21) {
    document.querySelector('.is-dealer-winner').textContent = 'Dealer Wins'
    document.querySelector('.did-you-win').textContent = 'Player One Loses!'
  } else if (dealerHand > 21) {
    document.querySelector('.is-dealer-winner').textContent =
      'Dealer Bust, Player One Wins'
    document.querySelector('.did-you-win').textContent =
      'House Busted, Player One Wins'
  } else if (dealerHand === 21 && playerHand === 21) {
    document.querySelector('.did-you-win').textContent = 'Player One Wins!'
    document.querySelector('.is-dealer-winner').textContent = 'Dealer Loses'
  } else if (playerHand === 21) {
    document.querySelector('.did-you-win').textContent = 'Player One Wins!'
    document.querySelector('.is-dealer-winner').textContent = 'Dealer Loses'
  } else if (playerHand > 21) {
    document.querySelector('.did-you-win').textContent =
      'Busted, Player One Wins'
    document.querySelector('is-dealer-winner').textContent =
      'Player One Busted, Dealer Wins'
  } else if (dealerHand >= 12 && playerHand > dealerHand && playerHand < 21) {
    document.querySelector('.did-you-win').textContent = 'Player One Wins'
    document.querySelector('.is-dealer-winner').textContent = 'Dealer Loses'
  } else if (dealerHand >= 12 && playerHand < dealerHand && playerHand < 21) {
    document.querySelector('.is-dealer-winner').textContent = 'Dealer Wins'
    document.querySelector('.did-you-win').textContent = 'Dealer Wins'
  } else if (dealerHand >= 12 && playerHand === dealerHand && playerHand < 21) {
    document.querySelector('.is-dealer-winner').textContent =
      'Push -- No Winner'
    document.querySelector('.did-you-win').textContent = 'Push -- No Winner'
  }
  document.querySelector('.reset-button').classList.remove('hide-me')
  document.querySelector('.hit-button').disabled = true
  document.querySelector('.stand-button').disabled = true
  document.querySelector('.dealer-hit').disabled = true
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

const hitDealer = () => {
  const drawnCard = deck.pop()
  dealerHand.push(drawnCard)
  const cardLi = document.createElement('li')
  const img = document.createElement('img')
  img.src = '/images/cards/' + drawnCard.imageUrl

  cardLi.appendChild(img)
  document.querySelector('.dealer-hand').appendChild(cardLi)

  showSum(dealerHand, '.dealer-sum')
}
