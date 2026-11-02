
document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    const currentYear = document.getElementById("currentYear");



    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        navItems.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }

});