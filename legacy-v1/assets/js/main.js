/* DVATE site script: mobile menu, services dropdown, service request form. */

(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector(".menu-button");
  var nav = document.getElementById("main-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.textContent = open ? "Close" : "Menu";
    });
  }

  /* ---------- Services dropdown (click / keyboard) ---------- */
  document.querySelectorAll(".nav-toggle-sub").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var li = btn.closest(".has-sub");
      var open = li.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".has-sub.open").forEach(function (li) {
      if (!li.contains(e.target)) {
        li.classList.remove("open");
        var b = li.querySelector(".nav-toggle-sub");
        if (b) b.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".has-sub.open").forEach(function (li) {
      li.classList.remove("open");
      var b = li.querySelector(".nav-toggle-sub");
      if (b) { b.setAttribute("aria-expanded", "false"); b.focus(); }
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Pre-select service from ?service= in the URL ---------- */
  var params = new URLSearchParams(window.location.search);
  var preset = params.get("service");
  if (preset) {
    var box = document.querySelector('input[name="services"][value="' + preset + '"]');
    if (box) box.checked = true;
  }

  /* ---------- Service request form ----------
     If the form has a data-endpoint (for example a Formspree URL), the form posts there.
     With no endpoint, it opens the visitor's email app with the request filled in,
     addressed to the address in data-mailto. */
  var form = document.getElementById("request-form");
  if (!form) return;
  var status = document.getElementById("form-status");

  function setStatus(msg, ok) {
    status.textContent = msg;
    status.className = "form-status " + (ok ? "ok" : "err");
  }

  function validate() {
    var firstBad = null;
    form.querySelectorAll("[required]").forEach(function (el) {
      var bad = !el.value.trim() || (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
      el.setAttribute("aria-invalid", bad ? "true" : "false");
      if (bad && !firstBad) firstBad = el;
    });
    if (firstBad) {
      var label = form.querySelector('label[for="' + firstBad.id + '"]');
      var name = label ? label.childNodes[0].textContent.trim() : "this field";
      setStatus("Add " + name.toLowerCase() + " to send your request.", false);
      firstBad.focus();
      return false;
    }
    return true;
  }

  function collect() {
    var data = new FormData(form);
    var services = data.getAll("services");
    var lines = [
      "Facility: " + (data.get("facility") || ""),
      "Facility type: " + (data.get("facility_type") || ""),
      "City and state: " + (data.get("location") || ""),
      "Contact: " + (data.get("name") || "") + (data.get("role") ? " (" + data.get("role") + ")" : ""),
      "Email: " + (data.get("email") || ""),
      "Phone: " + (data.get("phone") || ""),
      "Services of interest: " + (services.length ? services.join(", ") : "Not specified"),
      "Expected monthly volume: " + (data.get("volume") || "Not specified"),
      "Best way to reach me: " + (data.get("contact_pref") || ""),
      "",
      "Notes:",
      data.get("message") || ""
    ];
    return { data: data, text: lines.join("\n") };
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.querySelector('input[name="_gotcha"]').value) return; // spam trap
    if (!validate()) return;

    var c = collect();
    var endpoint = form.getAttribute("data-endpoint");
    var btn = form.querySelector('button[type="submit"]');

    if (endpoint) {
      btn.disabled = true;
      btn.textContent = "Sending request";
      fetch(endpoint, { method: "POST", body: c.data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("bad status");
          form.reset();
          setStatus("Request sent. A DVATE team member will contact you to confirm the details.", true);
        })
        .catch(function () {
          setStatus("The request did not go through. Call (772) 867-4818 or email amisha.b@mschealthcare.org and we will take it from there.", false);
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = "Send request";
        });
      return;
    }

    var to = form.getAttribute("data-mailto");
    var subject = "Service request: " + (c.data.get("facility") || "New facility");
    window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(c.text);
    setStatus("Your email app should open with the request filled in. Press send there to reach our team.", true);
  });
})();
