(() => {
  const KEY = 'icap_user';
  const $ = (sel) => document.querySelector(sel);
  const show = (el, yes) => el && el.classList[yes ? 'remove' : 'add']('hide');

  const form   = $('#login-form');
  const email  = $('#email');
  const pass   = $('#password');
  const msg    = $('#msg');
  const logged = $('#logged');
  const who    = $('#who');
  const logout = $('#logout');

  const next = new URL(location.href).searchParams.get('next');

  function render() {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) {
      if (who) who.textContent = saved.email;
      show(form, false);
      show(logged, true);
    } else {
      show(form, true);
      show(logged, false);
    }
  }
  render();
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (msg) msg.textContent = '';

    if (!email.value.trim() || !pass.value.trim()) {
      if (msg) msg.textContent = 'Fyll i e-post och lösenord.';
      return;
    }

    localStorage.setItem(KEY, JSON.stringify({ email: email.value.trim() }));

    if (next) {
      location.href = next;
    } else {
      if (who) who.textContent = email.value.trim();
      show(form, false);
      show(logged, true);
    }
  });

  logout?.addEventListener('click', () => {
    localStorage.removeItem(KEY);
    email.value = '';
    pass.value  = '';
    show(form, true);
    show(logged, false);
    if (msg) msg.textContent = '';
  });
})();
