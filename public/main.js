const suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds']
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

const deck = []
const playerHand = []
const dealerHand = []
let dealerSum = 0
let playerSum = 0

const main = () => {
	shuffle()
	dealCards()
	dealCards()
}

const getValue = rank => {
	if (rank === 'Ace') {
		return 11
	} else if (rank === 'King' || rank === 'Queen' || rank === 'Jack') {
		return 10
	} else {
		return parseInt(rank)
	}
}

const shuffle = () => {
	for (let i = 0; i < suits.length; i++) {
		for (let j = 0; j < ranks.length; j++) {
			const card = {
				rank: ranks[j],
				suit: suits[i],
				value: getValue(ranks[j])
			}
			deck.push(card)
		}
	}
	for (let i = 0; i < deck.length; i++) {
		const j = Math.floor(Math.random() * 52)
		const temp = deck[i]
		deck[j] = deck[i]
		deck[j] = temp
	}
	console.log(deck)
}

const dealerDealCards = () => {
	const drawnCard = deck.pop()
	dealerHand.push(drawnCard)
	const cardDrawn = document.createElement('img')
	cardDrawn.src = '/images/' + drawnCard.rank + '_of_' + drawnCard.suit + '.svg'
	document.querySelector('.dealer-cards').appendChild(cardDrawn)

	let sum = 0
	for (let i = 0; i < dealerHand.length; i++) {
		sum += dealerHand[i].value
	}
	dealerSum = sum
	document.querySelector('.dealer-score').textContent = sum
}

const dealCards = () => {
	const drawnCard = deck.pop()
	playerHand.push(drawnCard)
	const cardDrawn = document.createElement('img')
	cardDrawn.src = '/images/' + drawnCard.rank + '_of_' + drawnCard.suit + '.svg'
	document.querySelector('.player-cards').appendChild(cardDrawn)

	let sum = 0
	for (let i = 0; i < playerHand.length; i++) {
		sum += playerHand[i].value
		if (sum >= 22) {
			document.querySelector('.player-result-message').textContent =
				'Bust! Player Loses'
			document.querySelector('.hit').disabled = true
		}
	}
	playerSum = sum
	document.querySelector('.player-score').textContent = sum
}

const stand = () => {
	dealerDealCards()
	dealerDealCards()

	while (dealerSum <= 16) {
		dealerDealCards()
	}
	if (dealerSum > 21) {
		document.querySelector('.player-result-message').textContent =
			'Player Wins!'
		document.querySelector('.dealer-result-message').textContent =
			'Dealer Busts'
	} else if (playerSum > dealerSum) {
		document.querySelector('.player-result-message').textContent =
			'Player Wins!'
		document.querySelector('.dealer-result-message').textContent =
			'Dealer Loses'
	} else if (playerSum < dealerSum) {
		document.querySelector('.player-result-message').textContent =
			'Player Loses'
		document.querySelector('.dealer-result-message').textContent = 'Dealer Wins'
	} else {
		document.querySelector('.player-result-message').textContent = 'Push'
		document.querySelector('.dealer-result-message').textContent = 'Push'
	}
}
document.addEventListener('DOMContentLoaded', main)
document.querySelector('.hit').addEventListener('click', dealCards)
document.querySelector('.stand').addEventListener('click', stand)
