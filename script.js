/* =========================
   PROFILE LINKS
   Paste your URLs here. Links left empty are hidden automatically.
========================= */

const PROFILE = {
    github: "https://github.com/0808cl241108ies-prog",
    linkedin: "https://www.linkedin.com/in/manohar-kushwah-187455443/"
};

document.querySelectorAll("[data-profile]").forEach(el => {

    const url = PROFILE[el.dataset.profile];

    if (url) {
        el.href = url;

        const label = el.querySelector("strong");
        if (label) label.textContent = url.replace(/^https?:\/\/(www\.)?/, "");
    } else {
        el.hidden = true;
    }

});


/* =========================
   MOBILE MENU
========================= */

const mobileMenu = document.getElementById("mobileMenu");
const navMenu = document.querySelector(".nav-menu");

mobileMenu.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    mobileMenu.setAttribute("aria-expanded", String(open));
});


/* Close mobile menu after clicking */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-expanded", "false");
    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


/* =========================
   DARK MODE
========================= */

const themeToggle = document.getElementById("themeToggle");

const MOON_ICON = themeToggle.innerHTML;
const SUN_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeToggle.innerHTML = SUN_ICON;

        localStorage.setItem("theme", "dark");

    } else {

        themeToggle.innerHTML = MOON_ICON;

        localStorage.setItem("theme", "light");

    }

});


/* Load saved theme */

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeToggle.innerHTML = SUN_ICON;

}


/* =========================
   PROJECT MODAL
========================= */

const projectButton = document.getElementById("projectDetails");
const projectModal = document.getElementById("projectModal");
const closeProject = document.getElementById("closeProject");


projectButton.addEventListener("click", () => {

    projectModal.classList.add("active");

    document.body.style.overflow = "hidden";

});


closeProject.addEventListener("click", () => {

    projectModal.classList.remove("active");

    document.body.style.overflow = "";

});


projectModal.addEventListener("click", (event) => {

    if (event.target === projectModal) {

        projectModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});


/* ESC closes modal */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        projectModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".skill-card, .timeline-item, .project-card, .certificate-card"
);


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.7s ease";

    observer.observe(element);

});
