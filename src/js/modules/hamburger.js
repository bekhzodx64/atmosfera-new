function hamburger() {
	const hamburgerButton = document.querySelector('.hamburger-button')
	const mobileMenu = document.querySelector('.mobile-menu')
	const mobileMenuLinks = document.querySelectorAll(
		'.mobile-menu__content li a'
	)

	hamburgerButton.addEventListener('click', () => {
		hamburgerButton.classList.toggle('active')

		mobileMenu.classList.toggle('show')
	})

	mobileMenuLinks.forEach((link) => {
		link.addEventListener('click', () => {
			mobileMenu.classList.remove('show')
			hamburgerButton.classList.remove('active')
		})
	})
}

export default hamburger
