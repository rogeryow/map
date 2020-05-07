function zoom(event, div, scale) {
	event.preventDefault()
	scale += (event.deltaY/5) * -0.01
	scale = Math.min(Math.max(1, scale), 4)
	div.style.transform = `scale(${scale})`
}

export { zoom }