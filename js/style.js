document.addEventListener("DOMContentLoaded", () => {
    const styleCards = document.querySelectorAll(".style-card");
    const continueButton = document.querySelector(".continue-button");
    const selectionMessage = document.querySelector(".selection-message");

    let selectedStyle = sessionStorage.getItem("selectedStyle");

    function selectStyle(card) {
        // Remove selection from all cards
        styleCards.forEach((item) => {
            item.classList.remove("selected");
            item.setAttribute("aria-pressed", "false");
        });

        // Select clicked card
        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");

        // Save selected style
        selectedStyle = card.dataset.style;
        sessionStorage.setItem("selectedStyle", selectedStyle);

        // Enable continue button
        if (continueButton) {
            continueButton.disabled = false;
        }

        if (selectionMessage) {
            selectionMessage.textContent =
                `${card.querySelector("h2").textContent} selected!`;
        }
    }

    // Add click event to every card
    styleCards.forEach((card) => {
        card.addEventListener("click", () => {
            selectStyle(card);
        });
    });

    // Restore previous selection
    if (selectedStyle) {
        const savedCard = document.querySelector(
            `.style-card[data-style="${selectedStyle}"]`
        );

        if (savedCard) {
            selectStyle(savedCard);
        }
    }

    // Continue to photobooth
    if (continueButton) {
        continueButton.addEventListener("click", () => {
            if (!selectedStyle) return;

            window.location.href = "booth.html";
        });
    }

    // Update footer year
    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});