function XMLRequest(url) {
	return new Promise(function(resolve, reject) {
		const xhr = new XMLHttpRequest()

		xhr.onload = function() {
			if(this.readyState == 4 && this.status == 200){
				const response = JSON.parse(this.responseText)
				resolve(response)
			}
		}

		xhr.onerror = function() {
			reject(new Error('Network Error'))
		}

		xhr.open('GET', url, true)
		xhr.send()
	})	
}

function zoom(event) {
	event.preventDefault()

	console.log(this)
	let scale = returnOnlyNumbers(this.style.transform) || 1
	console.log(scale)
	scale += (event.deltaY/5) * -0.01
	scale = Math.min(Math.max(1, scale), 4)
	console.log(scale)
	this.style.transform = `scale(${scale})`
}

function returnOnlyNumbers(string) {
	return string.replace(/\D/g, '')
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

export { 
	XMLRequest, 
	zoom,
	returnOnlyNumbers,
	getFullScreen,
	toggleFullScreen, 
}