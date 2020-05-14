import * as util from './util.js'

window.addEventListener('DOMContentLoaded', (event) => {
    startMap()
	keyBoardEvents()
	fullScreenChange()
})

function startMap() {
	const map = document.getElementById('map-davao')
	const states = document.querySelectorAll('path') 

	// map.addEventListener('wheel', util.zoom)
	
	let barangayList = [
		'kapatagan',
		'dulangan',
		'soong',
		'balabag',
		'goma',
		'binaton',
		'ruparan',
		'kiagot',
		'sinawilan',
		'tres de mayo',
		'san agustin',
		'mahayahay',
		'lungag',
		'san roque',
		'matti',
		'zone 1',
		'zone 2',
		'zone 3',
		'cogon',
		'aplaya',
		'san miguel',
		'san jose',
		'dawis',
		'tiguman',
		'colorado',
		'igpit',
	]

	util.XMLRequest('../data/json/digos.json')
	.then((data) => {
		data.forEach((value) => {
			if(barangayList.includes(value.barangay)) {
				let barangayNode = document.querySelector(`[data-name='${value.barangay}']`)

				for (let key in value.statistics) {
					if (value.statistics.hasOwnProperty(key)) {
						barangayNode.setAttribute(key, value.statistics[key])
					}
				}

			}
		})

		// for now start
		states.forEach((state) => {
			console.log(state)
			const stats = []
			if(state.hasAttribute('red')) {
				stats.red = state.getAttribute('red')
			}
			if(state.hasAttribute('yellow')) {
				stats.yellow = state.getAttribute('yellow')
			}
			if(state.hasAttribute('green')) {
				stats.green = state.getAttribute('green')
			}
			if(state.hasAttribute('blue')) {
				stats.blue = state.getAttribute('blue')
			}

			if(stats.red || stats.yellow || stats.green || stats.blue) {
				const max = Object.keys(stats).reduce((a, b) => stats[a] > stats[b] ? a : b )
				console.log(stats)
				console.log(max)
				if(max == 'red') {
					state.style.fill = '#ED5564'
				}else if(max == 'yellow') {
					state.style.fill = '#FFCE54'
				}else  if(max == 'green') {
					state.style.fill = '#A0D568'
				}else if(max == 'blue') {
					state.style.fill = '#4FC1E8'
				}
			}

			state.addEventListener('click', function() {
				console.log(state.getAttribute('data-name'))
			})

			state.addEventListener('mouseover', function() {
				// state.style.fill = '#FF9800'
			})

			state.addEventListener('mouseout', function() {
				// state.style.fill = 'f3f3f3'
			})
		})
		// for now end

	})
	.catch((message) => {
		console.log(message)
	})
	
}

function keyBoardEvents() {
	document.addEventListener('keypress', function (event) {
		const key = event.keyCode 
		if (key === 102) {
			util.toggleFullScreen()	
		}
	}, false)	
}

function fullScreenChange() {
	document.addEventListener('fullscreenchange', function () {
		// todo
	})
}