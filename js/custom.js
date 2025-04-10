function showUnitPlanPopup() {
    const popup = document.getElementById('unitPlanPopup');
    if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideUnitPlanPopup() {
    const popup = document.getElementById('unitPlanPopup');
    if (popup) {
        popup.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const masterPlanImage = document.getElementById('masterPlanImage');
    const form = document.getElementById('submit-form');
    const imageOverlay = document.getElementById('imageOverlay');
    const localStorageKey = 'masterPlanFormSubmitted';
    const popupDelay = 20000; // 20 seconds
    const popupAutoCloseTimer = 15000; // Auto-close popup after 15 seconds
    let autoCloseTimeout;

    // Add click event to the master plan image
    masterPlanImage.addEventListener('click', function () {
        if (!localStorage.getItem(localStorageKey)) {
            showUnitPlanPopup();
        } else {
            // Image is already unblurred
            masterPlanImage.style.filter = 'none';
        }
    });

    // Handle form submission
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the form from refreshing the page

            // Use the unified form submission handler from EnquiryForm.js
            handleFormSubmission(form, true);

            // Unblur the master plan image
            masterPlanImage.style.filter = 'none';
            masterPlanImage.style.transition = 'filter 0.5s ease';

            // Hide the overlay
            if (imageOverlay) {
                imageOverlay.style.display = 'none';
            }

            // Close the popup
            hideUnitPlanPopup();

            // Store submission state in localStorage
            localStorage.setItem(localStorageKey, 'true');
        });
    }

    // Automatically show popup after 20 seconds on page load
    function showPopupOnLoad() {
        if (!localStorage.getItem(localStorageKey)) {
            setTimeout(() => {
                showUnitPlanPopup();
                autoCloseTimeout = setTimeout(() => {
                    hideUnitPlanPopup(); // Auto-close the popup after 15 seconds
                }, popupAutoCloseTimer);
            }, popupDelay);
        }
    }

    // Check localStorage on page load
    if (localStorage.getItem(localStorageKey) === 'true') {
        masterPlanImage.style.filter = 'none';
        if (imageOverlay) {
            imageOverlay.style.display = 'none';
        }
    } else {
        // Show popup after 20 seconds if form not submitted
        showPopupOnLoad();
    }

    // Cancel auto-close timer if user interacts with the popup
    const popup = document.getElementById('unitPlanPopup');
    if (popup) {
        popup.addEventListener('mouseenter', () => {
            clearTimeout(autoCloseTimeout);
        });
    }
});
