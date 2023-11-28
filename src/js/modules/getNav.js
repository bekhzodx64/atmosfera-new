async function getData() {
	const response = await fetch('../files/navigation.json')
	const data = await response.json()

	const sidebar = document.querySelector('#menu ul')

	// data.map((item) => {
	// 	sidebar.innerHTML += `<li><a href="${item.anchor}" data-menuanchor="${item.anchor}" draggable="false">${item.title}</a></li>`
	// })

	// data.forEach((item) => {
	// 	sidebar.innerHTML += `<li><a href="${item.anchor}" data-menuanchor="${item.anchor}" draggable="false">${item.title}</a></li>`
	// })
}

export default getData
