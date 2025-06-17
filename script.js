document.body.style.userSelect = 'none';
document.addEventListener("DOMContentLoaded", () => {
  const text = 'start "welcome"';
  const typedText = document.getElementById("typed-text");
  const cursor = document.getElementById("cursor");
  const content = document.getElementById("content");
  const secondLine = document.getElementById("second-line");

  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      typedText.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 100);
    } else {
      setTimeout(() => {
        cursor.style.display = "none";
        content.classList.remove("hidden");
        content.classList.add("fade-in");
        setTimeout(() => {
          secondLine.classList.remove("hidden");
        }, 1000);
      }, 1000);
    }
  }

  setTimeout(typeEffect, 1000);

  const toggle = document.getElementById("language-toggle");
  const options = document.getElementById("language-options");

  let isOpen = false;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    options.classList.toggle("visible", isOpen);
  });

  document.addEventListener("click", (e) => {
    if (!options.contains(e.target) && e.target !== toggle) {
      isOpen = false;
      options.classList.remove("visible");
    }
  });

  document.querySelectorAll(".language-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      const lang = opt.dataset.lang;
      localStorage.setItem("lang", lang);
      applyLanguage(lang);
      highlightActiveLanguage(lang);
      isOpen = false;
      options.classList.remove("visible");
    });
  });

  function applyLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.innerHTML = translations[lang][el.dataset.i18n];
    });
  }

  function highlightActiveLanguage(lang) {
    document.querySelectorAll(".language-option").forEach((opt) => {
      opt.classList.remove("active");
      if (opt.dataset.lang === lang) {
        opt.classList.add("active");
      }
    });
  }

  const savedLang = localStorage.getItem("lang") || "en";
  applyLanguage(savedLang);
  highlightActiveLanguage(savedLang);
});

const translations = {
  en: {
    title: "OperatingSystem by TheCreatorOfClearCode",
    description:
      'OperatingSystem by TheCreatorOfClearCode is a modular, minimalistic operating system written in C# using <a href="https://github.com/CosmosOS" class="link" target="_blank" rel="noopener noreferrer">Cosmos</a>.',
    feature1: "Modular architecture",
    feature2: "Console Shell",
    feature3: "Basic commands and utilities",
    download: "Download",
    source: "Source Code"
  },
  ru: {
    title: "Операционная система от TheCreatorOfClearCode",
    description:
      'Операционная система от TheCreatorOfClearCode — модульная минималистичная операционная система, написанная на C# с использованием <a href="https://github.com/CosmosOS" class="link" target="_blank" rel="noopener noreferrer">Cosmos</a>.',
    feature1: "Модульная архитектура",
    feature2: "Консольная оболочка",
    feature3: "Базовые команды и утилиты",
    download: "Скачать",
    source: "Исходный код"
  }
};