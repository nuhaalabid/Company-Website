(() => {
  const ROOT = document.getElementById("cart-root");
  if (!ROOT) return;
  const KEY = "icap_cart";
  const money = n => `${(Math.round(n * 100) / 100).toLocaleString("sv-SE")} kr`;
  const getCart = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch { return []; }
  };
  const setCart = (items) => localStorage.setItem(KEY, JSON.stringify(items));
  const total = (cart) => cart.reduce((s, it) => s + (it.price || 0) * (it.qty || 0), 0);

  function updateQty(id, delta) {
    const cart = getCart();
    const i = cart.findIndex(x => x.id === id);
    if (i > -1) {
      const q = (cart[i].qty || 0) + delta;
      if (q <= 0) cart.splice(i, 1);
      else cart[i].qty = Math.min(999, q);
      setCart(cart);
      window.ICAP_CART?.updateCount();
      render();
    }
  }
  function setQty(id, qty) {
    qty = Number(qty);
    if (!Number.isFinite(qty)) return;
    const cart = getCart();
    const i = cart.findIndex(x => x.id === id);
    if (i > -1) {
      if (qty <= 0) cart.splice(i, 1);
      else cart[i].qty = Math.min(999, Math.round(qty));
      setCart(cart);
      window.ICAP_CART?.updateCount();
      render();
    }
  }
  function removeItem(id) {
    const cart = getCart().filter(x => x.id !== id);
    setCart(cart);
    window.ICAP_CART?.updateCount();
    render();
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  function render() {
    const cart = getCart();

    if (!cart.length) {
      ROOT.innerHTML = `
        <div class="cart-empty">
          <p>Din kundvagn är tom.</p>
          <a class="btn primary" href="products.html">Gå till produkter</a>
        </div>`;
      return;
    }
    const rows = cart.map(it => `
      <div class="cart-item">
        <img class="ci-thumb" src="${esc(it.img || 'assets/placeholder.png')}" alt="">
        <div class="ci-body">
          <div class="ci-top">
            <div class="ci-name">${esc(it.name || "Produkt")}</div>
            <button class="btn link remove" data-id="${esc(it.id)}">Ta bort</button>
          </div>
          <div class="ci-mid">
            <div class="ci-price">${money(it.price || 0)}</div>
            <div class="ci-qty">
              <button class="qty-btn dec" data-id="${esc(it.id)}" aria-label="Minska">−</button>
              <input class="qty-input" data-id="${esc(it.id)}" type="number" min="1" max="999" value="${it.qty || 1}">
              <button class="qty-btn inc" data-id="${esc(it.id)}" aria-label="Öka">+</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    ROOT.innerHTML = `
      <div class="cart-list">
        ${rows}
        <div class="cart-summary">
          <div class="total-line">
            <span>Totalt</span>
            <span class="total">${money(total(cart))}</span>
          </div>
          <a href="#" class="btn primary" id="checkout">Till kassan</a>
        </div>
      </div>
    `;

    ROOT.querySelectorAll(".qty-btn.inc").forEach(b =>
      b.addEventListener("click", () => updateQty(b.dataset.id, +1))
    );
    ROOT.querySelectorAll(".qty-btn.dec").forEach(b =>
      b.addEventListener("click", () => updateQty(b.dataset.id, -1))
    );
    ROOT.querySelectorAll(".qty-input").forEach(inp =>
      inp.addEventListener("change", () => setQty(inp.dataset.id, inp.value))
    );
    ROOT.querySelectorAll(".remove").forEach(btn =>
      btn.addEventListener("click", () => removeItem(btn.dataset.id))
    );
    ROOT.querySelector("#checkout")?.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Detta är en demo. Här skulle en riktig kassa starta.");
    });
  }

  render();
})();
