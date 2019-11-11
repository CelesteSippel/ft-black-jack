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
