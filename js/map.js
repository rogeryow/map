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
		addMapHoverOver()
		addMapHoverOut()
		addMapColorfilter()

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
		
		function setMapColor(barangays, option = {red: true, yellow: true, green: true, blue: true}) {
			for (const [index, {barangay, statistics}] of barangays.entries()) {
				const filteredStat = {}
				if(option.red) filteredStat.red = statistics.red
				if(option.yellow) filteredStat.yellow = statistics.yellow
				if(option.green) filteredStat.green = statistics.green
				if(option.blue) filteredStat.blue = statistics.blue

				const getBarangayMaxStat = Object.keys(filteredStat).reduce((now, current) => filteredStat[now] > filteredStat[current] ? now : current )
				fillColor(barangay, getBarangayMaxStat)
			}
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
			map.addEventListener('click', function({target}) {
				console.log(target.getAttribute('data-name'))
			})	
		}
		
		function addMapHoverOver() {
				map.addEventListener('mouseover', function({target}) {
				let data = getMapData(target) 
				if(data) formatText(data)

				// todo
			})
		}

		function addMapHoverOut() {
			map.addEventListener('mouseout', function({target}) {
				target.style.stroke = '#aeaeaf'
				target.style.strokeWidth = '1px'
			})
		}

		function getMapData(target) {
			if(target.getAttribute('data-name') == null) return

			let data = {}
			let stats = {}

			data.barangay = target.getAttribute('data-name')
			stats.red = parseInt(target.getAttribute('red')) || 0 
			stats.yellow = parseInt(target.getAttribute('yellow')) || 0 
			stats.green = parseInt(target.getAttribute('green')) || 0 
			stats.blue = parseInt(target.getAttribute('blue')) || 0 
			
			data.stats = stats

			return data
		}

		function formatText(data) {
			const {barangay, stats} = data

			const barangayText = document.getElementById('barangay-text')
			const redText = document.getElementById('red-text')
			const yellowText = document.getElementById('yellow-text')
			const greenText = document.getElementById('green-text')
			const blueText = document.getElementById('blue-text')

			barangayText.innerHTML = barangay
			redText.innerHTML = stats.red
			yellowText.innerHTML = stats.yellow
			greenText.innerHTML = stats.green
			blueText.innerHTML = stats.blue
		}

		function addMapColorfilter() {
			const checkNodes = Array.from(document.getElementsByClassName('filter-color'))
			const option = {}

			checkNodes.forEach((node) => {
				node.addEventListener('click', function() {
					console.log('clicked')
					checkNodes.map((node) => {
						let color = node.getAttribute('color')
						if(node.checked) option[color] = true
						else option[color] = false
					})
					setMapColor(barangays, option)
				})
			})
		}

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

