const progressBar = document.querySelector(".progress-bar");
const navLinks = Array.from(document.querySelectorAll(".pill-nav a"));
const navTargets = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const updateScrollState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    let activeId = navTargets[0] ? navTargets[0].id : "";

    navTargets.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + scrollTop;

        if (scrollTop >= sectionTop - 160) {
            activeId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("is-active", isActive);
    });
};

document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        const isExpanded = trigger.getAttribute("aria-expanded") === "true";

        trigger.setAttribute("aria-expanded", String(!isExpanded));

        if (panel) {
            panel.hidden = isExpanded;
            panel.classList.toggle("is-open", !isExpanded);
        }
    });
});

document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const tabButtons = Array.from(tabs.querySelectorAll('[role="tab"]'));
    const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("aria-controls");

            tabButtons.forEach((item) => {
                item.setAttribute("aria-selected", String(item === button));
            });

            tabPanels.forEach((panel) => {
                const isTarget = panel.id === targetId;
                panel.hidden = !isTarget;
                panel.classList.toggle("is-active", isTarget);
            });
        });
    });
});

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
updateScrollState();
