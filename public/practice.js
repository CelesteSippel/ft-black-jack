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

let playerSum = 0
let dealerSum = 0
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


const getPlayerSum = () => {
  let playerSum = 0
  for (let i = 0; i < hand.length; i++) {
    playerSum += hand[i].value
  }
  document.querySelector('.player-sum').textContent = playerSum
}

const getDealerSum = () => {
  let dealerSum = 0
  for (let i = 0; i < hand.length; i++) {
    dealerSum += hand[i].value
  }
  document.querySelector('.dealer-sum').textContent = dealerSum
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
}

const hitDealer = () => {
  let i = 0
  while showSum(dealerSum,<= 17) {
    const drawnCard = deck.pop()
    dealerHand.push(drawnCard)
    const cardLi = document.createElement('li')
    const img = document.createElement('img')
    img.src = '/images/cards/' + drawnCard.imageUrl
    cardLi.appendChild(img)
    document.querySelector('.dealerHand').appendChild(cardLi)
    dealerSum += dealerHand[i].value
    document.querySelector('.dealerSum').textContent = dealerSum
    i++
  }
  if (dealerSum > 21) {
    document.querySelector('.did-you-win').textContent = 'WINNER'
    document.querySelector('.is-dealer-winner').textContent = 'BUST'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
    document.querySelector('.dealer-hit').disabled = true
  } else if (dealerSum === 21) {
    document.querySelector('.did-you-win').textContent = 'BUST'
    document.querySelector('.is-dealer-winner').textContent = 'WINNER'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
    document.querySelector('.dealer-hit').disabled = true
  } else if (dealerSum > userSum) {
    document.querySelector('.did-you-win').textContent = 'BUST'
    document.querySelector('.is-dealer-winner').textContent = 'WINNER'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
    document.querySelector('.dealer-hit').disabled = true
  }
}

const beginGame = () => {
  dealCard(deck, playerHand, '.player-hand', show)
  dealCard(deck, dealerHand, '.dealer-hand', hide)
  dealCard(deck, playerHand, '.player-hand', show)
  dealCard(deck, dealerHand, '.dealer-hand', hide)

  showSum(playerHand, '.player-sum')
}

const resetGame = () => {
  location.reload()
}
document.addEventListener('DOMContentLoaded', main)
document.querySelector('.hit-button').addEventListener('click', hitPlayer)
document.querySelector('.dealer-hit').addEventListener('click', hitDealer)
document
  .querySelector('.stand-button')
  .addEventListener('click', showDealerHand)
document.querySelector('.reset-button').addEventListener('click', resetGame)


// last option i am working on
const deck = []
const suits = ['Spades', 'Diamonds', 'Clubs', 'Hearts']
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

const playerHand = []
const dealerHand = []
let playerSum = 0
let dealerSum = 0

// hide the backs of the cards on page load since they are displayed in the html file

const main = () => {
  document.querySelector('.backOfCards').classList.add('hide')
  document.querySelector('.backOfCards1').classList.add('hide')
}

const deal = () => {
  createDeck()
  shuffleDeck()
  dealPlayerHand()
  dealDealerHand()
}

const getCardValue = ranks => {
  if (ranks === 'Ace') {
    return 11
  } else if (ranks === 'King' || ranks === 'Queen' || ranks === 'Jack') {
    return 10
  } else {
    return parseInt(ranks)
  }
}

const createDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let m = 0; m < ranks.length; m++) {
      const card = {
        rank: ranks[m],
        suit: suits[i],
        value: getCardValue(ranks[m]),
        imageUrl: ranks[m] + '_of_' + suits[i] + '.svg'
      }
      deck.push(card)
    }
  }
}
const shuffleDeck = () => {
  for (let z = 51; z >= 1; z--) {
    const j = Math.floor(Math.random() * z)

    const swapper = deck[j]
    deck[j] = deck[z]
    deck[z] = swapper
  }
  console.log(deck)
}

const dealDealerHand = () => {
  for (let i = 0; i < 2; i++) {
    document.querySelector('.backOfCards').classList.remove('hide')
    document.querySelector('.backOfCards1').classList.remove('hide')
  }
}

const dealPlayerHand = () => {
  for (let i = 0; i < 2; i++) {
    const drawnUserCard = deck.pop()
    playerHand.push(drawnUserCard)
    const playerHandLi = document.createElement('li')
    const img = document.createElement('img')
    img.src = './images/cards' + drawnUserCard.imageUrl
    playerHandLi.appendChild(img)
    document.querySelector('.playerHand').appendChild(playerHandLi)
    playerSum += playerHand[i].value
    document.querySelector('.player-sum').textContent = playerSum
  }

  if (playerSum > 21) {
    document.querySelector('.did-you-win').textContent = 'BUST'
    document.querySelector('.is-dealer-winner').textContent = 'WINNER'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
    document.querySelector('.dealer-hit').disabled = true
  } else if (playerSum === 21) {
    document.querySelector('.did-you-win').textContent = 'WINNER'
    document.querySelector('.is-dealer-winner').textContent = 'BUST'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
    document.querySelector('.dealer-hit').disabled = true
  }
}

const hitMe = () => {
  for (let n = 0; n < 1; n++) {
    const drawnCard = deck.pop()
    playerHand.push(drawnCard)
    const cardLi = document.createElement('li')
    const img = document.createElement('img')
    img.src = './images/cards' + drawnCard.imageUrl
    cardLi.appendChild(img)
    document.querySelector('.playerHand').appendChild(cardLi)
    playerSum += drawnCard.value
    document.querySelector('.player-sum').textContent = playerSum
  }
  if (playerSum > 21) {
    document.querySelector('.did-you-win').textContent = 'BUST'
    document.querySelector('.is-dealer-winner').textContent = 'WINNER'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
    document.querySelector('.deal').disabled = true
  } else if (playerSum === 21) {
    document.querySelector('.did-you-win').textContent = 'WINNER'
    document.querySelector('.is-dealer-winner').textContent = 'BUST'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
    document.querySelector('.deal').disabled = true
  }
}

const hitDealer = () => {
  let i = 0
  while (dealerSum <= 17) {
    document.querySelector('.backOfCards').classList.add('hide')
    document.querySelector('.backOfCards1').classList.add('hide')
    const drawnDealerCard = deck.pop()
    dealerHand.push(drawnDealerCard)
    const dealerHandLi = document.createElement('li')
    const img = document.createElement('img')
    img.src = './images/cards' + drawnDealerCard.imageUrl
    dealerHandLi.appendChild(img)
    document.querySelector('.dealerHand').appendChild(dealerHandLi)
    dealerSum += dealerHand[i].value
    document.querySelector('.dealerSum').textContent = dealerSum
    i++
  }
  if (dealerSum > 21) {
    document.querySelector('.did-you-win').textContent = 'WINNER'
    document.querySelector('.is-dealer-winner').textContent = 'BUST'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
    document.querySelector('.deal').disabled = true
  } else if (dealerSum === 21) {
    document.querySelector('.did-you-win').textContent = 'BUST'
    document.querySelector('.is-dealer-winner').textContent = 'WINNER'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
    document.querySelector('.deal').disabled = true
  } else if (dealerSum > playerSum) {
    document.querySelector('.did-you-win').textContent = 'BUST'
    document.querySelector('.is-dealer-winner').textContent = 'WINNER'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
    document.querySelector('.deal').disabled = true
  }
}

const reset = () => {
  location.reload()
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.deal').addEventListener('click', deal)
document.querySelector('.stand-button').addEventListener('click', hitDealer)
document.querySelector('.hit-button').addEventListener('click', hitMe)
document.querySelector('.reset-button').addEventListener('click', reset)


// const hitDealer = () => {
//   const drawnCard = deck.pop()
//   dealerHand.push(drawnCard)
//   const cardLi = document.createElement('li')
//   const img = document.createElement('img')
//   img.src = '/images/cards/' + drawnCard.imageUrl

//   cardLi.appendChild(img)
//   document.querySelector('.dealer-hand').appendChild(cardLi)

//   showSum(dealerHand, '.dealer-sum')

// }

// document.querySelector('.reset-button').classList.remove('hide')
// document.querySelector('.hit-button').disabled = true
// document.querySelector('.stand-button').disabled = true
// document.querySelector('.dealer-hit').disabled = true

// const resetGame = () => {
//   location.reload()
// }
// document.addEventListener('DOMContentLoaded', main)
// document.querySelector('.hit-button').addEventListener('click', hitPlayer)
// document.querySelector('.dealer-hit').addEventListener('click', hitDealer)
// document
//   .querySelector('.stand-button')
//   .addEventListener('click', showDealerHand)
// document.querySelector('.reset-button').addEventListener('click', resetGame)


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

let dealerSum = 0
let playerSum = 0

const enableHitButton = document.querySelector('.hit-button')
const enableStandButton = document.querySelector('.stand-button')
const enableResetButton = document.querySelector('.reset-button')
const disableDealerHitButton = document.querySelector('.dealer-hit').disabled

// get values
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

    document.querySelector(sumContainer).textContent = playerSum
  }
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
  document.querySelector('.stand-button').disabled = true
  document.querySelector('.hit-button').disabled = true
  console.log(showDealerHand)
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

// const hitPlayer = () => {
//   for (let )
//   const drawnCard = deck.pop()
//   playerHand.push(drawnCard)
//   const cardLi = document.createElement('li')
//   const img = document.createElement('img')
//   img.src = '/images/cards/' + drawnCard.imageUrl
//   cardLi.appendChild(img)
//   document.querySelector('.player-hand').appendChild(cardLi)

//   showSum(playerHand, '.player-sum')

// }

const hitPlayer = () => {
  for (let n = 0; n < 1; n++) {
    const hitPlayerHand = deck.pop()
    playerHand.push(hitPlayerHand)
    const playerHandLiTwo = document.createElement('li')
    const imgTwo = document.createElement('img')
    imgTwo.src = '/images/cards/' + hitPlayerHand.imageUrl
    playerHandLiTwo.appendChild(imgTwo)
    document.querySelector('.player-hand').appendChild(playerHandLiTwo)
    showSum(playerHand, '.player-sum')
  }
  if (playerHand > 21) {
    document.querySelector('.player-sum').textContent = 'BUST'
    document.querySelector('.dealer-sum').textContent = 'WINNER'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.dealer-hit').disabled = true
    document.querySelector('.stand-button').disabled = true
  } else if (showSum === 21) {
    document.querySelector(h3).textContent = 'WINNER'
    document.querySelector(h3).textContent = 'BUST'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
  }
}

const beginGame = () => {
  dealCard(deck, playerHand, '.player-hand', show)
  dealCard(deck, dealerHand, '.dealer-hand', hide)
  dealCard(deck, playerHand, '.player-hand', show)
  dealCard(deck, dealerHand, '.dealer-hand', hide)

  showSum(playerHand, '.player-sum')
}

const hitDealer = () => {
  for (let i = 0; i < 1; i++) {
    const hitDealerHand = deck.pop()
    dealerHand.push(hitDealerHand)
    const dealerHandLiTwo = document.createElement('li')
    const imgTwo = document.createElement('img')
    imgTwo.src = '/images/cards/' + hitDealerHand.imageUrl
    dealerHandLiTwo.appendChild(imgTwo)
    document.querySelector('.dealer-hand').appendChild(dealerHandLiTwo)
    showSum(dealerHand, '.dealer-sum')
  }
}

// while (dealerSum <= 17)
if (dealerSum < 17) {
  document.querySelector('.dealer-hit-button').disabled = false
}
if (dealerSum > 21) {
  document.querySelector('.player-hand').textContent = 'WINNER'
  document.querySelector('.dealer-hand').textContent = 'BUST'
  document.querySelector('.hit-button').disabled = true
  document.querySelector('.stand-button').disabled = true
  document.querySelector('.dealer-hit').disabled = true
} else if (dealerSum === 21) {
  document.querySelector('.player-hand').textContent = 'BUST'
  document.querySelector('.is-dealer-winner').textContent = 'WINNER'
  document.querySelector('.hit-button').disabled = true
  document.querySelector('.stand-button').disabled = true
  document.querySelector('.dealer-hit').disabled = true
} else if (dealerSum > playerSum) {
  document.querySelector('.player-hand').textContent = 'BUST'
  document.querySelector('.dealer-hand').textContent = 'WINNER'
  document.querySelector('.hit-button').disabled = true
  document.querySelector('.stand-button').disabled = true
  document.querySelector('.dealer-hit').disabled = true
}

const resetGame = () => {
  location.reload()
}

document.addEventListener('DOMContentLoaded', main)
document
  .querySelector('.stand-button')
  .addEventListener('click', showDealerHand)
document.querySelector('.hit-button').addEventListener('click', hitPlayer)
document.querySelector('.dealer-hit').addEventListener('click', hitDealer)
document.querySelector('.reset-button').addEventListener('click', resetGame)



//last place it worked end game
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
  dealerTotal >= 17 &&
  playerTotal > dealerTotal &&
  playerTotal < 21
) {
  document.querySelector('.did-you-win').textContent = 'Player One Wins'
  document.querySelector('.is-dealer-winner').textContent = 'Dealer Loses'
} else if (
  dealerTotal >= 17 &&
  playerTotal < dealerTotal &&
  playerTotal < 21
) {
  document.querySelector('.is-dealer-winner').textContent = 'Dealer Wins'
  document.querySelector('.did-you-win').textContent = 'Dealer Wins'
} else if (
  dealerTotal >= 17 &&
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