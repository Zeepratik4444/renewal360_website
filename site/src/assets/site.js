(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var API = document.documentElement.getAttribute("data-api") || "https://copilot.renewal360.in";

  // Header border once the page scrolls
  var header = document.querySelector(".site-header");
  var onScroll = function () { header && header.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("mobile-nav");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.hidden = open;
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.01 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // LinkedIn ad click id, kept for 30 days so a trial can be credited to the ad.
  var AD_KEY = "r360_li_fat_id";
  try {
    var li = new URLSearchParams(location.search).get("li_fat_id");
    if (li) localStorage.setItem(AD_KEY, JSON.stringify({ id: li, t: Date.now() }));
  } catch (e) { /* storage blocked */ }
  var adClick = function () {
    try {
      var v = JSON.parse(localStorage.getItem(AD_KEY) || "null");
      if (v && Date.now() - v.t < 30 * 864e5) return { li_fat_id: v.id };
    } catch (e) { /* storage blocked */ }
    return null;
  };

  var noteOf = function (form) {
    var note = form.querySelector(".form-note");
    return function (msg, cls) { note.textContent = msg; note.className = "form-note " + (cls || ""); };
  };
  var emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); };
  var markBad = function (f, bad) { f.closest(".field").classList.toggle("invalid", bad); };
  var post = function (path, body) {
    return fetch(API + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (d) {
          if (!r.ok) throw new Error(d.message || d.detail || "That did not go through. Please try again.");
          return d;
        });
      });
  };

  // Start a trial: work email + company, or Google. Terms must be ticked first.
  var trial = document.getElementById("trial-form");
  if (trial) {
    var say = noteOf(trial);
    var terms = trial.querySelector("#t-terms");
    var submit = trial.querySelector("button[type=submit]");
    var google = document.getElementById("google-signup");
    var syncTerms = function () {
      submit.disabled = !terms.checked;
      if (google) {
        google.setAttribute("aria-disabled", String(!terms.checked));
        var p = new URLSearchParams({ terms: "1" });
        var ad = adClick();
        if (ad) p.set("li_fat_id", ad.li_fat_id);
        google.href = terms.checked ? API + "/api/auth/sso/google/signup?" + p.toString() : "#";
      }
    };
    terms.addEventListener("change", syncTerms);
    syncTerms();
    trial.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (trial.website.value) return;
      var email = trial.email, company = trial.company;
      var bad1 = !emailOk(email.value), bad2 = !company.value.trim();
      markBad(email, bad1); markBad(company, bad2);
      if (bad1 || bad2) { (bad1 ? email : company).focus(); return say("Please add your work email and company.", "err"); }
      submit.disabled = true;
      say("Setting up your trial...");
      post("/api/request-demo", { company_name: company.value.trim(), email_address: email.value.trim(), accepted_terms: terms.checked, ad_click: adClick() })
        .then(function (d) { trial.reset(); say(d.message || "Check your inbox for the link to set your password.", "ok"); })
        .catch(function (e) { say(e.message + " You can also write to hello@renewal360.in.", "err"); })
        .finally(function () { syncTerms(); });
    });
  }

  // Talk to us: reaches a person.
  var talk = document.getElementById("talk-form");
  if (talk) {
    var sayT = noteOf(talk);
    talk.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (talk.website.value) return;
      var bad = false;
      ["name", "email", "company"].forEach(function (n) {
        var f = talk[n];
        var b = !f.value.trim() || (n === "email" && !emailOk(f.value));
        markBad(f, b);
        if (b && !bad) { f.focus(); bad = true; }
      });
      if (bad) return sayT("Please fill in your name, work email and company.", "err");
      var b2 = talk.querySelector("button[type=submit]");
      b2.disabled = true;
      sayT("Sending...");
      post("/api/talk-to-us", {
        company_name: talk.company.value.trim(), contact_person_name: talk.name.value.trim(),
        email_address: talk.email.value.trim(), phone_number: talk.phone.value.trim() || null, message: talk.message.value.trim() || null,
      })
        .then(function (d) { talk.reset(); sayT(d.message || "Thanks. We will reply within one business day.", "ok"); })
        .catch(function (e) { sayT(e.message + " You can also write to hello@renewal360.in.", "err"); })
        .finally(function () { b2.disabled = false; });
    });
  }

  // Set password (link from the trial email)
  var pw = document.getElementById("password-form");
  if (pw) {
    var sayP = noteOf(pw);
    var token = new URLSearchParams(location.search).get("token");
    if (!token) sayP("This page needs the link from your email. Open it from there.", "err");
    pw.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!token) return sayP("This page needs the link from your email. Open it from there.", "err");
      var a = pw.password.value, b = pw.confirm.value;
      if (a.length < 8) { markBad(pw.password, true); return sayP("Use at least 8 characters.", "err"); }
      markBad(pw.password, false);
      if (a !== b) { markBad(pw.confirm, true); return sayP("The two passwords do not match.", "err"); }
      markBad(pw.confirm, false);
      var b3 = pw.querySelector("button[type=submit]");
      b3.disabled = true;
      post("/api/trial/set-password", { token: token, password: a })
        .then(function () { pw.reset(); pw.querySelector(".fields").hidden = true; sayP("Your password is set. You can sign in now.", "ok"); document.getElementById("pw-signin").hidden = false; })
        .catch(function (e) { sayP(e.message, "err"); })
        .finally(function () { b3.disabled = false; });
    });
  }

  // Pricing: currency (guessed from the time zone, changeable) and monthly or yearly.
  var plans = document.getElementById("plans");
  if (plans) {
    var data = JSON.parse(document.getElementById("price-data").textContent);
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) { /* old browser */ }
    var cur = /Kolkata|Calcutta/.test(tz) ? "INR" : /^Europe\/London/.test(tz) ? "GBP" : /^Europe\//.test(tz) ? "EUR" : "USD";
    var yearly = false;
    var render = function () {
      Object.keys(data.plans[cur]).forEach(function (name) {
        var p = data.plans[cur][name];
        var card = plans.querySelector('[data-plan="' + name + '"]');
        if (!card) return;
        card.querySelector(".amount").textContent = yearly ? p.y : p.m;
        card.querySelector(".per").textContent = name === "Free" ? "free forever" : yearly ? "per month, billed yearly (" + p.yt + " a year)" : "per month";
      });
      var add = document.getElementById("addon-price");
      if (add) add.textContent = data.addon[cur];
      document.querySelectorAll("[data-cur]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-cur") === cur)); });
      document.querySelectorAll("[data-cycle]").forEach(function (b) { b.setAttribute("aria-pressed", String((b.getAttribute("data-cycle") === "yearly") === yearly)); });
    };
    document.querySelectorAll("[data-cur]").forEach(function (b) { b.addEventListener("click", function () { cur = b.getAttribute("data-cur"); render(); }); });
    document.querySelectorAll("[data-cycle]").forEach(function (b) { b.addEventListener("click", function () { yearly = b.getAttribute("data-cycle") === "yearly"; render(); }); });
    document.querySelectorAll(".price-controls").forEach(function (c) { c.hidden = false; });
    render();
  }

  // Video chapters: links like #t=90 jump the player.
  var player = document.getElementById("tour-video");
  if (player) {
    document.querySelectorAll("[data-seek]").forEach(function (a) {
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        var t = Number(a.getAttribute("data-seek"));
        // preload="none": the time only sticks once the video's metadata has loaded.
        if (player.readyState >= 1) player.currentTime = t;
        else player.addEventListener("loadedmetadata", function () { player.currentTime = t; }, { once: true });
        player.play().catch(function () { /* autoplay blocked: the time is set when it loads */ });
        player.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }
})();
