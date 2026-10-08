const menuToggle = document.querySelector("#menu");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const resumeModal = document.querySelector("#resumeModal");
const openResumeButtons = document.querySelectorAll("[data-open-resume]");
const closeResumeButtons = document.querySelectorAll("[data-close-resume]");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector(".form-status");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuToggle) {
      menuToggle.checked = false;
    }

    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    link.classList.add("active");
  });
});

const setActiveLink = () => {
  let currentId = "home";
  const viewportPoint = window.innerHeight / 2;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= viewportPoint && rect.bottom >= viewportPoint) {
      currentId = section.id;
    }
  });

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    currentId = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

const openResumeModal = () => {
  resumeModal.classList.add("is-open");
  resumeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeResumeModal = () => {
  resumeModal.classList.remove("is-open");
  resumeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

openResumeButtons.forEach((button) => {
  button.addEventListener("click", openResumeModal);
});

closeResumeButtons.forEach((button) => {
  button.addEventListener("click", closeResumeModal);
});

resumeModal.addEventListener("click", (event) => {
  if (event.target === resumeModal) {
    closeResumeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && resumeModal.classList.contains("is-open")) {
    closeResumeModal();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Message ready! Connect this form to your email service to receive submissions.";
  contactForm.reset();

  window.setTimeout(() => {
    formStatus.textContent = "";
  }, 4500);
});

window.addEventListener("scroll", setActiveLink);
window.addEventListener("hashchange", setActiveLink);
window.addEventListener("load", setActiveLink);
