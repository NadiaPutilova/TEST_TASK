document.querySelectorAll('.qty__item').forEach(el => {
	el.setAttribute('min', 0)
})

const totalQtyElem = document.getElementById('totalQty')
const totalSumElem = document.getElementById('totalSum')

const cartTotal = (item) => {
	let totalQty = 0
	let totalSum = 0
	const items = document.querySelectorAll('.product-box__meta')
	items.forEach(el => {
		let cost = parseInt(el.querySelector('p').innerText)
		let qty = parseInt(el.querySelector('.qty__item').value) || 0
		
		totalQty += qty
		totalSum += cost * qty
	})

	totalQtyElem.innerText = totalQty
	totalSumElem.innerText = totalSum
}

const btnClick = document.querySelectorAll('.product-box__btn')
btnClick.forEach(el => {
	el.addEventListener('click', function (e) {
		cartTotal()
	})
})

let categories_map = {
	1: 'breakfast',
	2: 'first',
	3: 'garnish'
}

const category = document.querySelector('.select-box .select-control')
const price = document.querySelector('.price-select-box .select-control')
const select = document.querySelectorAll('.select-control')

select.forEach(el => {
	el.addEventListener('change', (e) => {
		let selectedCategory = category.value
		let selectedPrice = +price.value

		if (!Object.keys(categories_map).includes(selectedCategory)) {
			document.querySelectorAll('.product-box__item').forEach(el => {
				let itemPrice = parseInt(el.querySelector('p').innerText)

				if (!selectedPrice) {
					el.style.display = 'block'
				}
				else {
					if (itemPrice < selectedPrice) {
						el.style.display = 'block'
					}
					else {
						el.style.display = 'none'
					}
				}
				
			})
		}
		else {
			document.querySelectorAll('.product-box__item').forEach(el => {
				let itemPrice = parseInt(el.querySelector('p').innerText)
				let itemCategory = el.getAttribute('data-category')
				if (!selectedPrice) {
					if (itemCategory === categories_map[selectedCategory]) {
						el.style.display = 'block'
					}
					else {
						el.style.display = 'none'
					}
				}
				else if (itemCategory === categories_map[selectedCategory] && itemPrice < selectedPrice) {
						el.style.display = 'block'
					}
					else {
						el.style.display = 'none'
					}
			})
		}
	})
})


////////////////////
// Order
const modal = document.querySelector('.modal')
const btnCheck = document.querySelector('.btn-check')
const btnClose = document.querySelectorAll('.btn-close')
const btnOrder = document.querySelector('.btn-order')

btnCheck.addEventListener('click', function (e) {
	modal.classList.add('active')
})

btnClose.forEach(el => {
	el.addEventListener('click', function (e) {
		modal.classList.remove('active')
	})
})

btnOrder.addEventListener('click', function (e) {
	const input = document.querySelectorAll('.form-control')

	let errors = false

	input.forEach(el => {
		let content = el.value.trim()
		if (content.length === 0) {
			errors = true
		}
	})

	if (errors) {
		alert('Не все поля заполнены. Проверьте заполнение.')
	}
	else {
		modal.classList.remove('active')
		alert('Благодарим за заказ. В ближайшее время мы с Вами свяжемся.')

		totalQtyElem.innerText = totalSumElem.innerText = 'XXX'
	}
})

