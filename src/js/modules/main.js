import fullpage from 'fullpage.js'
// import AOS from 'aos'

import 'fullpage.js/dist/fullpage.css'
// import 'aos/dist/aos.css'

function page() {
	let data = []

	async function getData() {
		const response = await fetch('./files/data/data.json')
		data = await response.json()
	}

	const navLinks = document.querySelectorAll('.navigation ul li a')
	const sidebar = document.querySelector('.navigation ul')
	const distanceInfo = document.querySelectorAll('.distance-info')
	const slideDescription = document.querySelectorAll('.slide-description')
	const modalWindow = document.querySelector('.modal-window')
	const modalWindowOverlay = document.querySelector('.modal-window__overlay')

	const fullpageApi = new fullpage('#fullpage', {
		anchors: [
			'intro',
			'slide1',
			'slide2',
			'slide3',
			'slide4',
			'slide5',
			'slide6',
			'interesting',
		],
		menu: '#menu',
		autoScrolling: true,
		keyboardScrolling: false,
		css3: true,
		easing: 'cubic-bezier(0.9, -0.29, 0.09, 0.74)',
		easingcss3: 'cubic-bezier(0.9, -0.29, 0.09, 0.74)',
		credits: {
			enabled: false,
		},
		normalScrollElements: '.modal',
		// afterRender: function () {
		// 	AOS.init()
		// },
		onLeave: function (origin, destination, direction) {
			if (destination.index !== 0) {
				navLinks[0].classList.remove('hide')
				navLinks[navLinks.length - 1].classList.remove('hide')
				sidebar.classList.add('center')
			} else {
				navLinks[0].classList.add('hide')
				navLinks[navLinks.length - 1].classList.add('hide')
				sidebar.classList.remove('center')
			}
			if (
				destination.index === 5 ||
				destination.index === 6 ||
				destination.index === 7
			) {
				navLinks.forEach((link) => link.classList.add('dark'))
				distanceInfo.forEach((info) => info.classList.add('dark'))
				slideDescription.forEach((desc) => desc.classList.add('dark'))
				modalWindow.classList.add('light')
				modalWindowOverlay.classList.add('light')
				progressBar.classList.add('light')
			} else {
				navLinks.forEach((link) => link.classList.remove('dark'))
				distanceInfo.forEach((info) => info.classList.remove('dark'))
				modalWindow.classList.remove('light')
				modalWindowOverlay.classList.remove('light')
				progressBar.classList.remove('light')
				slideDescription.forEach((desc) =>
					desc.classList.remove('dark')
				)
			}
		},
	})

	// Readmore modal
	const readMoreButtons = document.querySelectorAll('.read-more')
	const modal = document.querySelector('.modal')
	const modalContent = document.querySelector('.modal-content')
	const closeModalButton = document.querySelector('.modal-close')

	// Modal progress bar
	const progressBar = document.querySelector('.progress-bar')
	const progressBarLine = document.querySelector('.progress-bar__line')
	const progressBarClose = document.querySelector('.progress-bar__close')

	modalContent.addEventListener('scroll', function () {
		const contentHeight =
			modalContent.scrollHeight - modalContent.clientHeight
		const scrollPosition = modalContent.scrollTop
		const progress = (scrollPosition / contentHeight) * 100
		progressBarLine.style.width = `${progress}%`
	})

	progressBarClose.addEventListener('click', () => {
		modal.classList.remove('show')
	})

	// modalContent.addEventListener('scroll', (e) => {
	// 	const target = e.target
	// 	const scrollHeight = target.scrollHeight
	// 	const currentScroll = target.scrollTop
	// 	const containerHeight = target.clientHeight

	// 	const isScrolledToEnd = currentScroll + containerHeight >= scrollHeight

	// 	if (isScrolledToEnd) {
	// 		modalWindowOverlay.classList.add('hide')
	// 	} else {
	// 		modalWindowOverlay.classList.remove('hide')
	// 	}
	// })

	readMoreButtons.forEach((button) => {
		button.addEventListener('click', () => {
			modal.classList.add('show')

			slideModal(button)
		})
	})

	closeModalButton.addEventListener('click', () => {
		modal.classList.remove('show')
	})

	modal.addEventListener('click', (e) => {
		const target = e.target

		if (target.classList.contains('modal')) {
			modal.classList.remove('show')
		}
	})

	// Slide description modal
	function slideModal(id) {
		const inputId = id.querySelector('input').value

		const modalDescription = data[inputId].description
		const paragraphs = modalDescription.split('\n')

		modalContent.scrollTo(0, 0)
		modalContent.innerHTML = ''
		paragraphs.forEach((paragraph) => {
			let p = document.createElement('p')
			p.textContent = paragraph
			modalContent.appendChild(p)
		})

		const modalNextButton = document.createElement('button')
		modalNextButton.classList.add('modal-next')
		modalNextButton.textContent = '*keyingi sfera'
		modalContent.appendChild(modalNextButton)

		modalNextButton.addEventListener('click', () => {
			modal.classList.remove('show')
			fullpageApi.moveSectionDown()
		})
	}

	getData()
}

export default page
