// Pricing tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length === 0) return; // Exit if no tabs found

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding tab panel
            const targetPanel = document.getElementById(targetTab + '-tab');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // Track tab interactions for analytics
            if (typeof GrabbixAnalytics !== 'undefined') {
                GrabbixAnalytics.trackBusinessEvent('pricing_tab_switch', {
                    tab: targetTab,
                    timestamp: new Date().toISOString()
                });
            }
        });
    });
});