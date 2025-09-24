(function () {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const products = [
    {
      id: 'p1',
      name: 'Hörlurar till WorldPenScan Go USB-C',
      price: 99,
      img: 'assets/Hörlurar.jpg',          
      desc: 'Komplettera din WorldPenScan Go med ett par hörlurar som ger dig möjlighet att lyssna på inspelningar oavsett miljö. USB-C-anslutning.'
    }
  ];
  const money = n => n.toLocaleString('sv-SE') + ' kr';
  function card(p) {
    const el = document.createElement('article');
    el.className = 'product-card';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="content">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="meta">
          <span class="price">${money(p.price)}</span>
          <button class="btn primary add-btn">Lägg i kundvagn</button>
        </div>
      </div>
    `;
    el.querySelector('.add-btn').addEventListener('click', () => {
      ICAP_CART.add({ id: p.id, name: p.name, price: p.price, img: p.img });
    });
    return el;
  }

  products.forEach(p => grid.appendChild(card(p)));
})();
