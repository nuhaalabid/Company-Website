(function(){
  const form  = document.getElementById('booking-form');
  const okBox = document.getElementById('booking-success');
  if (!form) return;

  const nameEl  = form.elements['name'];
  const emailEl = form.elements['email'];
  const phoneEl = form.elements['phone'];
  const dateEl  = form.elements['date'];
  const timeEl  = form.elements['time'];

  const today = new Date();
  dateEl.min = today.toISOString().split('T')[0];

  const setErr = (name, msg='') => {
    const el = form.querySelector('[data-err="'+name+'"]');
    if (el) el.textContent = msg;
  };

  function validate(){
    let ok = true;
    setErr('name'); setErr('email'); setErr('phone'); setErr('date'); setErr('time');

    if (!nameEl.value.trim())  { setErr('name','Ange ditt namn'); ok=false; }
    if (!emailEl.validity.valid) { setErr('email','Ogiltig e-post'); ok=false; }
    if (!/^[\d\s+()-]{7,}$/.test(phoneEl.value.trim())) { setErr('phone','Ogiltigt telefonnummer'); ok=false; }
    if (!dateEl.value) { setErr('date','Välj datum'); ok=false; }
    if (!timeEl.value)  { setErr('time','Välj tid'); ok=false; }
    return ok;
  }

  function saveLocal(data){
    try{
      const KEY = 'icap_bookings';
      const list = JSON.parse(localStorage.getItem(KEY) || '[]');
      list.push(data);
      localStorage.setItem(KEY, JSON.stringify(list));
    }catch(_){}
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    const booking = {
      name: nameEl.value.trim(),
      email: emailEl.value.trim(),
      phone: phoneEl.value.trim(),
      date: dateEl.value,
      time: timeEl.value,
      message: form.elements['message'].value.trim(),
      createdAt: new Date().toISOString()
    };
    saveLocal(booking);
    form.classList.add('hide');
    okBox.classList.remove('hide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
