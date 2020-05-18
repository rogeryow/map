import * as util from './util.js'

window.addEventListener('DOMContentLoaded', (event) => {
    startMap()
	keyBoardEvents()
	util.fullScreenChange(test)
})

function test() {
	console.log('test')
}

function startMap() {
	const map = document.getElementById('map-davao')
	const states = document.querySelectorAll('path') 

	// map.addEventListener('wheel', util.zoom)
	const stats = [{
		total: {
			red: 0,
			yellow: 0,
			green: 0,
			blue: 0,
		} 
	}]

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
	.then((barangays) => {
		setMapAttribute(barangays)
		setMapColor(barangays)
		addMapClick()

		function setMapAttribute(barangays) {
			barangays.forEach(({barangay, statistics}) => {
				if(barangayList.includes(barangay)) {
					let barangayNode = document.querySelector(`[data-name='${barangay}']`)

					for (let key in statistics) {
						if (statistics.hasOwnProperty(key)) {
							barangayNode.setAttribute(key, statistics[key])
						}
					}
				}
			})
		}
		
		function setMapColor(barangays) {
			barangays.forEach(({barangay, statistics}) => {
				const getBarangayMaxStat = Object.keys(statistics).reduce((now, current) => statistics[now] > statistics[current] ? now : current )
				fillColor(barangay, getBarangayMaxStat)
			})
		}

		function fillColor(barangay, color) {
			const barangayNode = document.querySelector(`[data-name='${barangay}']`)

			switch(color) {
				case 'red': barangayNode.style.fill = '#ED5564'
					break
				case 'yellow': barangayNode.style.fill = '#FFCE54'
					break
				case 'green': barangayNode.style.fill = '#A0D568'
					break
				case 'blue': barangayNode.style.fill = '#4FC1E8'
					break
				default: barangayNode.style.fill = 'grey'
			}
		}
			
		function addMapClick() {
			states.addEventListener('click', function() {
				console.log(states.getAttribute('data-name'))
			})	
		}
		

		// 	state.addEventListener('mouseover', function() {
		// 		// state.style.fill = '#FF9800'
		// 	})

		// 	state.addEventListener('mouseout', function() {
		// 		// state.style.fill = 'f3f3f3'
		// 	})
		// })
		// for now end

	})
	.catch((errorMessage) => {
		console.log(errorMessage)
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

