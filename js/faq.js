// FAQ Collapsible Functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const faqIcon = element.querySelector('.faq-icon');

    // Toggle active class
    faqItem.classList.toggle('active');

    // Update icon
    if (faqItem.classList.contains('active')) {
        faqIcon.textContent = '−';
    } else {
        faqIcon.textContent = '+';
    }

    // Track FAQ interactions for analytics
    if (typeof GrabbixAnalytics !== 'undefined') {
        const questionText = element.querySelector('h3').textContent;
        const action = faqItem.classList.contains('active') ? 'opened' : 'closed';

        GrabbixAnalytics.trackBusinessEvent('faq_interaction', {
            question: questionText,
            action: action
        });
    }
}

// Auto-initialize FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard accessibility
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        // Add tabindex for keyboard navigation
        question.setAttribute('tabindex', '0');

        // Add keyboard event listener
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(this);
            }
        });

        // Add focus styles
        question.addEventListener('focus', function() {
            this.style.outline = `2px solid var(--primary-green)`;
            this.style.outlineOffset = '2px';
        });

        question.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add smooth scrolling to FAQ section if linked
    if (window.location.hash === '#faq') {
        const faqSection = document.querySelector('.faq-section');
        if (faqSection) {
            setTimeout(() => {
                faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    // Add search functionality (optional enhancement)
    addFAQSearch();
});

// Optional: Add search functionality to FAQs
function addFAQSearch() {
    const faqSection = document.querySelector('.faq-section .container');
    if (!faqSection) return;

    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'faq-search';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" id="faq-search" placeholder="Search frequently asked questions..." />
            <span class="search-icon">🔍</span>
        </div>
    `;

    // Insert search before FAQ columns
    const faqTitle = faqSection.querySelector('h2');
    faqTitle.parentNode.insertBefore(searchContainer, faqTitle.nextSibling);

    // Add search functionality
    const searchInput = document.getElementById('faq-search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();

            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                // Highlight matching terms
                highlightSearchTerm(item, searchTerm);
            } else {
                item.style.display = 'none';
            }
        });

        // Track search interactions
        if (typeof GrabbixAnalytics !== 'undefined' && searchTerm.length > 2) {
            GrabbixAnalytics.trackBusinessEvent('faq_search', {
                search_term: searchTerm,
                results_count: document.querySelectorAll('.faq-item:not([style*="none"])').length
            });
        }
    });
}

function highlightSearchTerm(item, term) {
    if (!term || term.length < 2) return;

    const question = item.querySelector('h3');
    const answer = item.querySelector('.faq-answer p');

    // Remove existing highlights
    question.innerHTML = question.textContent;
    answer.innerHTML = answer.textContent;

    if (term.length >= 2) {
        const regex = new RegExp(`(${term})`, 'gi');

        question.innerHTML = question.textContent.replace(regex, '<mark style="background-color: var(--primary-green); color: white; padding: 0 0.25rem; border-radius: 3px;">$1</mark>');
        answer.innerHTML = answer.textContent.replace(regex, '<mark style="background-color: var(--primary-green); color: white; padding: 0 0.25rem; border-radius: 3px;">$1</mark>');
    }
}

// Add CSS for FAQ search
const faqStyles = document.createElement('style');
faqStyles.textContent = `
    .faq-search {
        margin: 2rem 0 3rem 0;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }

    .search-box {
        position: relative;
        display: flex;
        align-items: center;
    }

    #faq-search {
        width: 100%;
        padding: 1rem 3rem 1rem 1rem;
        border: 2px solid var(--border-gray);
        border-radius: 25px;
        font-size: 1rem;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    #faq-search:focus {
        outline: none;
        border-color: var(--primary-green);
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .search-icon {
        position: absolute;
        right: 1rem;
        color: #666;
        pointer-events: none;
    }

    /* Mobile responsiveness for FAQ */
    @media (max-width: 768px) {
        .faq-columns {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .faq-question {
            padding: 1rem 1.5rem;
        }

        .faq-question h3 {
            font-size: 1rem;
        }

        .faq-item.active .faq-answer {
            padding: 0 1.5rem 1rem 1.5rem;
        }

        .faq-search {
            margin: 1.5rem 0 2rem 0;
        }

        #faq-search {
            padding: 0.75rem 2.5rem 0.75rem 0.75rem;
            font-size: 0.9rem;
        }
    }
`;

document.head.appendChild(faqStyles);