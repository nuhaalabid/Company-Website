(function(){
  const KEY = 'icap_cart';

  function getCart(){
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch(_) { return []; }
  }
  function setCart(items){ localStorage.setItem(KEY, JSON.stringify(items)); }

  function updateCount(){
    const n = getCart().reduce((sum, item) => sum + (item.qty || 0), 0);
    document.querySelectorAll('#cart-count, .badge').forEach(b => b.textContent = n);
  }
  function add(item){
    const cart = getCart();
    const i = cart.findIndex(x => x.id === item.id);
    if (i > -1) {
      cart[i].qty += 1;                      
      if (!cart[i].img && item.img) cart[i].img = item.img;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img || '',                
        qty: 1
      });
    }
    setCart(cart);
    updateCount();
  }

  window.ICAP_CART = { add, updateCount };
  updateCount(); 
})();
