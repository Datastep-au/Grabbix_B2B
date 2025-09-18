// Google Tag Manager Setup and Analytics Configuration
// This file sets up GTM and provides analytics tracking functions

// Configuration - Update these with your actual GTM container ID
const GTM_CONFIG = {
    containerId: 'GTM-M4MVFCG6', // Your GTM container ID
    dataLayerName: 'dataLayer'
};

// Initialize Google Tag Manager
function initializeGTM() {
    // Create dataLayer if it doesn't exist
    window[GTM_CONFIG.dataLayerName] = window[GTM_CONFIG.dataLayerName] || [];

    // GTM script loading function
    function gtag() {
        window[GTM_CONFIG.dataLayerName].push(arguments);
    }

    // Set up gtag as global function
    window.gtag = gtag;

    // Configure GTM
    gtag('js', new Date());
    gtag('config', GTM_CONFIG.containerId);

    // Load GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_CONFIG.containerId}`;
    document.head.insertBefore(script, document.head.firstChild);
}

// Enhanced ecommerce and event tracking functions
const GrabbixAnalytics = {
    // Page view tracking
    trackPageView: function(page_title, page_location) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: page_title || document.title,
                page_location: page_location || window.location.href,
                custom_map: {
                    dimension1: 'grabbix_b2b_site'
                }
            });
        }
    },

    // Form interactions
    trackFormStart: function(form_name) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_start', {
                form_name: form_name,
                engagement_time_msec: Date.now()
            });
        }
    },

    trackFormSubmit: function(form_name, form_data = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                form_name: form_name,
                ...form_data
            });
        }
    },

    trackFormError: function(form_name, error_message) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_error', {
                form_name: form_name,
                error_message: error_message
            });
        }
    },

    // ROI Calculator interactions
    trackCalculatorUsage: function(action, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'calculator_interaction', {
                action: action,
                ...parameters
            });
        }
    },

    // CTA button clicks
    trackCTAClick: function(cta_text, cta_location) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                cta_text: cta_text,
                cta_location: cta_location,
                page_location: window.location.href
            });
        }
    },

    // Video interactions
    trackVideoPlay: function(video_title, video_url) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'video_play', {
                video_title: video_title,
                video_url: video_url
            });
        }
    },

    // Scroll depth tracking
    trackScrollDepth: function(scroll_depth) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
                percent_scrolled: scroll_depth
            });
        }
    },

    // Lead generation events
    trackLead: function(lead_source, lead_value = 0) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'generate_lead', {
                currency: 'AUD',
                value: lead_value,
                lead_source: lead_source
            });
        }
    },

    // Custom events for business insights
    trackBusinessEvent: function(event_name, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', event_name, {
                event_category: 'business_interaction',
                ...parameters
            });
        }
    }
};

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if GTM container ID is configured
    if (GTM_CONFIG.containerId !== 'GTM-XXXXXXX') {
        initializeGTM();

        // Track initial page view
        GrabbixAnalytics.trackPageView();

        // Set up automatic event tracking
        setupAutomaticTracking();
    } else {
        console.warn('Google Tag Manager container ID not configured. Please update GTM_CONFIG.containerId in gtm-setup.js');
    }
});

// Automatic event tracking setup
function setupAutomaticTracking() {
    // Track all CTA button clicks
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.btn');
        if (button) {
            const cta_text = button.textContent.trim();
            const cta_location = getElementLocation(button);
            GrabbixAnalytics.trackCTAClick(cta_text, cta_location);
        }
    });

    // Track form submissions
    document.addEventListener('submit', function(e) {
        const form = e.target;
        if (form.tagName === 'FORM') {
            const form_name = form.id || form.className || 'unnamed_form';
            GrabbixAnalytics.trackFormSubmit(form_name);
        }
    });

    // Track form starts (first interaction)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        let formStarted = false;
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (!formStarted) {
                    formStarted = true;
                    const form_name = form.id || form.className || 'unnamed_form';
                    GrabbixAnalytics.trackFormStart(form_name);
                }
            });
        });
    });

    // Track scroll depth
    let maxScroll = 0;
    let scrollTimeouts = {};

    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;

            // Track at 25%, 50%, 75%, 100% milestones
            [25, 50, 75, 100].forEach(milestone => {
                if (scrollPercent >= milestone && !scrollTimeouts[milestone]) {
                    scrollTimeouts[milestone] = setTimeout(() => {
                        GrabbixAnalytics.trackScrollDepth(milestone);
                    }, 1000); // Debounce scroll tracking
                }
            });
        }
    });

    // Track video plays (YouTube embeds)
    const videoIframes = document.querySelectorAll('iframe[src*="youtube"]');
    videoIframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            // Note: YouTube iframe API would be needed for detailed video tracking
            GrabbixAnalytics.trackVideoPlay('Hero Video', this.src);
        });
    });

    // Track ROI calculator usage
    const calculatorSliders = document.querySelectorAll('#footTraffic, #conversionRate, #basketValue, #profitMargin');
    calculatorSliders.forEach(slider => {
        let interactionStarted = false;

        slider.addEventListener('input', function() {
            if (!interactionStarted) {
                interactionStarted = true;
                GrabbixAnalytics.trackCalculatorUsage('calculator_start');
            }
        });

        slider.addEventListener('change', function() {
            GrabbixAnalytics.trackCalculatorUsage('parameter_change', {
                parameter: this.id,
                value: this.value
            });
        });
    });

    // Track outbound links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.hostname !== window.location.hostname) {
            GrabbixAnalytics.trackBusinessEvent('outbound_click', {
                link_url: link.href,
                link_text: link.textContent.trim()
            });
        }
    });

    // Track navigation clicks
    document.addEventListener('click', function(e) {
        const navLink = e.target.closest('.nav-menu a');
        if (navLink) {
            GrabbixAnalytics.trackBusinessEvent('navigation_click', {
                nav_item: navLink.textContent.trim(),
                destination: navLink.href
            });
        }
    });
}

// Utility function to get element location context
function getElementLocation(element) {
    const section = element.closest('section');
    if (section) {
        return section.className || section.id || 'unknown_section';
    }

    const header = element.closest('header');
    if (header) {
        return 'header';
    }

    const footer = element.closest('footer');
    if (footer) {
        return 'footer';
    }

    return 'page_body';
}

// Enhanced ecommerce tracking for lead qualification
function trackLeadQualification(leadData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase', {
            transaction_id: 'lead_' + Date.now(),
            value: 100, // Estimated lead value
            currency: 'AUD',
            items: [{
                item_id: 'demo_request',
                item_name: 'Demo Request',
                item_category: 'Lead Generation',
                item_variant: leadData.region || 'unknown',
                quantity: 1,
                price: 100
            }]
        });
    }
}

// Export for global usage
window.GrabbixAnalytics = GrabbixAnalytics;
window.trackLeadQualification = trackLeadQualification;

// Debug mode for development
if (window.location.hostname === 'localhost' || window.location.hostname.includes('staging')) {
    window.GADebug = {
        trackEvent: function(event, parameters) {
            console.log('Analytics Event:', event, parameters);
            if (typeof gtag !== 'undefined') {
                gtag('event', event, parameters);
            }
        },
        dataLayer: function() {
            return window[GTM_CONFIG.dataLayerName] || [];
        }
    };
}