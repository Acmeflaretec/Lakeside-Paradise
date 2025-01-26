// Add this function at the top level of your script
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

function showSharedPlanPopup() {
    const popup = document.getElementById('sharedPlanPopup');
    if (popup) {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function hideSharedPlanPopup() {
    const popup = document.getElementById('sharedPlanPopup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Add this JavaScript for handling the button clicks and image switching
document.addEventListener('DOMContentLoaded', function() {
    // Clear any previous submission state
    localStorage.removeItem('formSubmitted');
    
    const planImages = document.querySelectorAll('.plan-image img');
    const viewButtons = document.querySelectorAll('.view-text');
    
    // Initially blur all images
    planImages.forEach(img => {
        img.style.filter = 'blur(5px)';
    });

    // Add click event to the "VIEW FLOOR PLAN" button
    document.querySelector('.view-text').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showSharedPlanPopup();
    });

    // Plan switching functionality only
    const planBtns = document.querySelectorAll('.plan-btn');
    const planContents = document.querySelectorAll('.plan-content');

    planBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            planBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const group = this.getAttribute('data-group');
            const id = this.getAttribute('data-id');

            // Hide all plan contents
            planContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show selected plan content
            const activeContent = document.querySelector(
                `.plan-content[data-group="${group}"][data-id="${id}"]`
            );
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });

    // Form submission handler
    const formShared = document.getElementById('shared-form');
    if (formShared) {
        formShared.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Unblur all images
            planImages.forEach(img => {
                img.style.filter = 'none';
                img.style.transition = 'filter 0.5s ease';
            });
            
            // Hide all view buttons
            viewButtons.forEach(button => {
                button.style.display = 'none';
            });
            
            // Hide the popup
            hideSharedPlanPopup();
            
            // Store submission status
            localStorage.setItem('formSubmitted', 'true');
        });
    }

    // Close popup when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('sharedPlanPopup')) {
            hideSharedPlanPopup();
        }
    });

    // Close popup when clicking close button
    const closeButton = document.querySelector('.popup-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            hideSharedPlanPopup();
        });
    }

    // Check if form was previously submitted
    if (localStorage.getItem('formSubmitted') === 'true') {
        planImages.forEach(img => {
            img.style.filter = 'none';
        });
        viewButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
}); 