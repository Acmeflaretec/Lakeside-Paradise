// -----Country Code Selection
// $("#mobile_code").intlTelInput({
//     initialCountry: "ae",
//     separateDialCode: true,
//     // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
// });

$("#Register_Now").intlTelInput({
    initialCountry: "ae",
    separateDialCode: true,
    // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});
$("#Brochure").intlTelInput({
    initialCountry: "ae",
    separateDialCode: true,
    // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});
// document.addEventListener("DOMContentLoaded", function () {
//     const tabs = document.querySelectorAll(".accordion-tab");
//     const contents = document.querySelectorAll(".accordion-item");

//     tabs.forEach(tab => {
//         tab.addEventListener("click", function () {
//             const group = tab.getAttribute("data-actab-group");
//             const id = tab.getAttribute("data-actab-id");

//             // Remove active class from all tabs and contents
//             tabs.forEach(t => t.classList.remove("accordion-active"));
//             contents.forEach(c => c.classList.remove("accordion-active"));

//             // Add active class to the clicked tab and corresponding content
//             tab.classList.add("accordion-active");
//             document.querySelector(`.accordion-item[data-actab-group="${group}"][data-actab-id="${id}"]`).classList.add("accordion-active");
//         });
//     });
// });
document.querySelectorAll('.accordion-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const group = this.dataset.group;
        const id = this.dataset.id;

        // Hide all contents in the same group
        document.querySelectorAll(`.accordion-content[data-group="${group}"]`).forEach(content => {
            content.classList.remove('active-content');
        });

        // Deactivate all tabs in the same group
        document.querySelectorAll(`.accordion-tab[data-group="${group}"]`).forEach(tab => {
            tab.classList.remove('active-tab');
        });

        // Show clicked tab content and activate the tab
        document.querySelector(`.accordion-content[data-group="${group}"][data-id="${id}"]`).classList.add('active-content');
        this.classList.add('active-tab');
    });
});
