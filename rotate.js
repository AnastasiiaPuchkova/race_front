const cards = document.querySelectorAll('.player_card_img');
const battleZone = document.getElementById('player_battle');

// Добавляем dragstart только для карт из .player_cards
cards.forEach(card => {
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.src);
    e.dataTransfer.setData('text/id', e.target.alt);
    e.target.classList.add('dragging');
  });
});

battleZone.addEventListener('dragover', (e) => {
  e.preventDefault(); // нужно, чтобы drop работал
});

battleZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const src = e.dataTransfer.getData('text/plain');
  const id = e.dataTransfer.getData('text/id');

  // Проверка: если карта с этим alt уже есть в .player_battle, ничего не делаем
  const exists = [...battleZone.querySelectorAll('img')].some(img => img.alt === id);
  if (exists) return;

  // Создаём новую карту
  const newCard = document.createElement('img');
  newCard.src = src;
  newCard.alt = id;
  newCard.className = 'player_battle_card';
  newCard.setAttribute('draggable', 'true');

  // Добавим возможность dragstart для уже перемещённой карты
  newCard.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.src);
    e.dataTransfer.setData('text/id', e.target.alt);
  });

  battleZone.appendChild(newCard);

  // Удаляем оригинальную карту из .player_cards
  const draggedCard = document.querySelector(`.player_cards .player_card_img[alt="${id}"]`);
  if (draggedCard) {
    draggedCard.remove();
  }
});
