(function () {
  const KEY = "icap_user";

  const getUser = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); }
    catch { return null; }
  };
  const setUser   = (u) => localStorage.setItem(KEY, JSON.stringify(u));
  const clearUser = () => localStorage.removeItem(KEY);

  const user = getUser();
  const needsAuth = document.body?.hasAttribute("data-require-auth");
  if (needsAuth && !user) {
    const next = encodeURIComponent(location.href);
    location.href = `login.html?next=${next}`;
    return;
  }
  const actions = document.querySelector(".header-actions");
  if (actions) {
    if (user) {
      if (!actions.querySelector("#btn-logout")) {
        const btn = document.createElement("button");
        btn.id = "btn-logout";
        btn.className = "btn";
        btn.textContent = "Logga ut";
        btn.addEventListener("click", () => { clearUser(); location.reload(); });
        actions.appendChild(btn);
      }
    } else {
      if (!actions.querySelector(".btn-login")) {
        const a = document.createElement("a");
        a.className = "btn btn-login";
        a.textContent = "Logga in";
        a.href = `login.html?next=${encodeURIComponent(location.href)}`;
        actions.appendChild(a);
      }
    }
  }
  window.ICAP_AUTH = { getUser, setUser, clearUser };
})();
