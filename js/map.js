window.addEventListener('DOMContentLoaded', (event) => {
    initMap()
	keyEvents()
})

function initMap() {
	let scale = 1
	const map = document.getElementById('map-davao')
	const states = document.querySelectorAll('path') 

	mapEvents()

	map.addEventListener('wheel', zoom)
	
	function zoom(event) {
		event.preventDefault()
		scale += (event.deltaY/5) * -0.01
		scale = Math.min(Math.max(1, scale), 4)
		this.style.transform = `scale(${scale})`
	}

	function mapEvents() {
		states.forEach((state) => {
			state.addEventListener('click', function() {
				// console.log(this.getAttribute('data-name'))
			})

			state.addEventListener('mouseover', function() {
				this.style.fill = '#FF9800'
			})

			state.addEventListener('mouseout', function() {
				this.style.fill = 'f3f3f3'
			})
		})
	}
}

function keyEvents() {
	document.addEventListener('keypress', function (event) {
		const key = event.keyCode 
		if (key === 102) {
			toggleFullScreen()	
		}
	}, false)	
}



function getFullScreen() {
	return document.fullscreenElement
		|| document.webkitfullscreenElement
		|| document.mozfullscreenElement
		|| document.msfullscreenElement
}

function toggleFullScreen() {
	if (getFullScreen()) {
		document.exitFullscreen()
	} else {
		document.getElementById('map').requestFullscreen()
	}
}

document.addEventListener('fullscreenchange', function () {
	console.log('full screen changed')
})