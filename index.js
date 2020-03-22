let fruits = [
	{id: 1, title: 'Яблоки', price: 20, img: 'http://pngimg.com/uploads/apple/apple_PNG12507.png'},
	{id: 2, title: 'Апельсины', price: 30, img: 'http://pngimg.com/uploads/orange/orange_PNG805.png'},
	{id: 3, title: 'Бананы', price: 40, img: 'http://pngimg.com/uploads/banana/banana_PNG849.png'}
]

const toHTML = fruit => `
	<div class="col">
		<div class="card" style="width: 18rem;">
		  <img src="${fruit.img}" alt="${fruit.title}" class="card-img-top" style='height: 220px'>
		  <div class="card-body">
		    <h5 class="card-title">${fruit.title}</h5>
		    <a href="#" class="btn btn-primary" data-btn='price' data-id='${fruit.id}'>Посмотреть цену</a>
		    <a href="#" class="btn btn-danger" data-btn='remove' data-id='${fruit.id}'>Удалить</a>
		  </div>
		</div>
	</div>
	`


function render() {
	const html = fruits.map(toHTML).join('')
	document.querySelector('#fruits').innerHTML = html;
}

render();


const priceModal = $.modal({
	title: 'Цена на товар',
	closable: true,
	width: '400px',
	footerButtons: [
		{text: 'Закрыть', type: 'primary', handler() {
			priceModal.close()
		}}
	]
});



document.addEventListener('click', event => {
	event.preventDefault();
	const btnType = event.target.dataset.btn;
	const id = +event.target.dataset.id;
	const fruit = fruits.find(fruit => fruit.id === id);
		
	if(btnType === 'price') {
		priceModal.setContent(` 
			<p>Цена за ${fruit.title}: <strong>${fruit.price}$</strong></p>
		 `)
		priceModal.open();
	}else if(btnType === 'remove') {
		$.confirm({
			title: 'Вы уверены?',
			content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
		}).then(() => {
			fruits = fruits.filter(f => f.id !== id)
			render()
		}).catch(() => {
			console.log('cancel')
		})
	}
});

