document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  mainNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Abrir menu");
    });
  });

  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Copia a chave Pix informada. Confirme com a instituição se este CNPJ está habilitado como chave Pix.
  const copyButton = document.getElementById("copy-pix");
  const pixKey = document.getElementById("pix-key");
  const copyFeedback = document.getElementById("copy-feedback");
  copyButton?.addEventListener("click", async () => {
    const value = pixKey.textContent.trim();
    try {
      await navigator.clipboard.writeText(value);
      copyFeedback.textContent = "Chave Pix copiada. Confira os dados do beneficiário no banco.";
    } catch {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "absolute";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      copyFeedback.textContent = copied
        ? "Chave Pix copiada. Confira os dados do beneficiário no banco."
        : "Não foi possível copiar automaticamente. Selecione e copie a chave manualmente.";
    }
  });

  // Carrossel com botões, swipe nativo e autoplay pausado quando há interação.
  const slider = document.querySelector(".campaign-slider");
  const cards = [...document.querySelectorAll(".campaign-card")];
  const dotsWrap = document.querySelector(".slider-dots");
  let currentSlide = 0;
  let autoplay;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function visibleCards() {
    if (window.innerWidth <= 520) return 1;
    if (window.innerWidth <= 820) return 2;
    return 3;
  }
  function maxSlide() {
    return Math.max(0, cards.length - visibleCards());
  }
  function makeDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= maxSlide(); i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot" + (i === currentSlide ? " active" : "");
      dot.setAttribute("aria-label", `Mostrar grupo de campanhas ${i + 1}`);
      dot.addEventListener("click", () => { goTo(i); restartAutoplay(); });
      dotsWrap.appendChild(dot);
    }
  }
  function goTo(index) {
    if (!slider || !cards.length) return;
    currentSlide = Math.max(0, Math.min(index, maxSlide()));
    const card = cards[currentSlide];
    slider.scrollTo({ left: card.offsetLeft - cards[0].offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
    makeDots();
  }
  document.querySelectorAll("[data-slide]").forEach(button => {
    button.addEventListener("click", () => {
      goTo(currentSlide + (button.dataset.slide === "next" ? 1 : -1));
      restartAutoplay();
    });
  });
  function stopAutoplay() { if (autoplay) clearInterval(autoplay); }
  function startAutoplay() {
    stopAutoplay();
    if (!reducedMotion && cards.length > visibleCards()) {
      autoplay = setInterval(() => goTo(currentSlide >= maxSlide() ? 0 : currentSlide + 1), 5000);
    }
  }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }
  slider?.addEventListener("mouseenter", stopAutoplay);
  slider?.addEventListener("mouseleave", startAutoplay);
  slider?.addEventListener("focusin", stopAutoplay);
  slider?.addEventListener("focusout", startAutoplay);
  slider?.addEventListener("scroll", () => {
    if (!slider || !cards.length) return;
    const closest = cards.reduce((best, card, index) => {
      const distance = Math.abs((card.offsetLeft - cards[0].offsetLeft) - slider.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity });
    if (closest.index !== currentSlide && closest.index <= maxSlide()) {
      currentSlide = closest.index;
      makeDots();
    }
  }, { passive: true });
  window.addEventListener("resize", () => { currentSlide = Math.min(currentSlide, maxSlide()); makeDots(); goTo(currentSlide); restartAutoplay(); });
  makeDots();
  startAutoplay();

  // Modais de interesse.
  const contactModal = document.getElementById("contact-modal");
  const privacyModal = document.getElementById("privacy-modal");
  const form = document.getElementById("interest-form");
  const typeInput = document.getElementById("interest-type");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const profession = document.getElementById("profession");
  const professionLabel = document.getElementById("profession-label");
  const formFeedback = document.getElementById("form-feedback");
  const formNames = {
    "amigao": ["Quero ser Amigão", "Deixe seus dados para demonstrar interesse em apoiar a causa."],
    "super-amigo": ["Quero ser Super Amigo", "Conte como gostaria de contribuir com o Instituto."],
    "profissional": ["Amigo Profissional", "Conte sua área de atuação e como pode oferecer apoio profissional."],
    "parceiro": ["Seja um parceiro", "Compartilhe seus dados para conversarmos sobre uma parceria."],
    "voluntario": ["Quero ser voluntário", "Conte um pouco sobre sua disponibilidade e como gostaria de ajudar."]
  };
  document.querySelectorAll(".modal-trigger").forEach(button => {
    button.addEventListener("click", () => {
      const type = button.dataset.form || "voluntario";
      const [title, description] = formNames[type] || formNames.voluntario;
      typeInput.value = type;
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      professionLabel.querySelector("span").textContent = "*";
      profession.required = true;
      professionLabel.firstChild.textContent = type === "profissional" ? "Profissão / área de atuação " : "Como pretende ajudar ";
      formFeedback.textContent = "";
      form.reset();
      typeInput.value = type;
      contactModal.showModal();
    });
  });

  document.querySelectorAll(".modal-close").forEach(button => {
    button.addEventListener("click", () => button.closest("dialog")?.close());
  });
  document.querySelector(".modal-close-action")?.addEventListener("click", () => privacyModal.close());
  document.querySelectorAll(".privacy-trigger").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      contactModal.close();
      privacyModal.showModal();
    });
  });
  [contactModal, privacyModal].forEach(dialog => {
    dialog?.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  });

  // Validação no navegador. Para receber os dados, conecte o submit a um backend ou serviço de formulários.
  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const phoneDigits = document.getElementById("whatsapp").value.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      formFeedback.textContent = "Informe um WhatsApp válido com DDD.";
      document.getElementById("whatsapp").focus();
      return;
    }
    formFeedback.textContent = "Validação concluída! Este modelo ainda não envia os dados. Conecte um serviço de formulário para concluir o cadastro.";
  });
});
