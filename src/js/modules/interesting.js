async function interesting() {
	const interestingFacts = document.querySelector('.interesting-facts')

	const response = await fetch('../files/data/interesting.json')
	const data = await response.json()

	data.map((item) => {
		interestingFacts.innerHTML += `
			<div class='interesting-row'>
				<span></span>
				<div class="interesting-row__cards">
					${item?.cards
						?.map(
							(card) => `
						<div class="interesting-card">
							<div class="interesting-card__image">
								<img src="${card?.image}" alt="${card?.title}" draggable="false" loading="lazy">
							</div>
							<div class="interesting-card__content">
								<h3 class="interesting-card__title">${card?.title}</h3>
								<p class="interesting-card__distance">${card?.distance}</p>
							</div>
						</div>
					`
						)
						.join('')}
				</div>

				<div class="interesting-row__distance">${item.distance}</div>
			</div>
		`
	})
}

export default interesting
