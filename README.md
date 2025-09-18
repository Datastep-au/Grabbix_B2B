# Grabbix B2B Website

A fast, conversion-focused sales site for Grabbix smart vending units targeting Australian buyers.

## Features

- **Responsive Design**: Mobile-first approach with clean, premium styling
- **Interactive ROI Calculator**: Real-time calculations with customizable parameters
- **Form Integration**: Ready for HubSpot forms API integration
- **Analytics Ready**: Google Tag Manager integration included
- **Modern Tech Stack**: Pure HTML, CSS, and JavaScript - no framework dependencies

## Setup Instructions

### 1. Configuration

Before going live, update the following configuration files:

#### Google Tag Manager
- ✅ **Configured**: GTM container ID `GTM-M4MVFCG6` is set up
- Analytics tracking active for page views, form submissions, CTA clicks
- ROI calculator interactions and scroll depth tracking enabled

#### HubSpot Forms
- Edit `js/form-handler.js`
- Replace `YOUR_HUBSPOT_PORTAL_ID` and `YOUR_HUBSPOT_FORM_GUID` with your actual HubSpot credentials
- Uncomment the actual HubSpot API submission code

### 2. Image Optimization

The following images are included:
- Hero images: `images/Images/Grabbix_hero.jpg`
- Product shots: `images/Images/Empty Machine.png`, `images/Images/full_machine.png`
- Process diagram: `images/Images/Shopping process.jpg`
- Logos: Various sizes in `images/Logo/`

**Missing images to create:**
- Software dashboard screenshots (placeholder currently shows)
- Additional lifestyle shots in office lobbies, gyms, apartment foyers
- Close-up shots of smart lock, payment terminal, display screen

### 3. Content Customization

#### Contact Information
Update contact details in:
- `js/form-handler.js` (error message contact info)
- Footer sections across all HTML files

#### Pricing
Current pricing in `pricing.html`:
- Buy outright: $8,999 AUD
- Lease: $500 AUD/month for 24 months + $1,000 buyout
- Software: $30 AUD/month + $0.10/transaction

#### ROI Calculator Defaults
In `js/roi-calculator.js`:
- Daily foot traffic: 120
- Conversion rate: 6%
- Average basket value: $6
- Profit margin: 60%

## File Structure

```
├── index.html              # Home page - "Grabbix Smart Store"
├── why-now.html           # "Perfect Time to Start" page
├── pricing.html           # Pricing & ROI Calculator
├── specifications.html     # Specs & FAQ
├── book-demo.html         # Contact form
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── main.js           # Core functionality
│   ├── roi-calculator.js # ROI calculator logic
│   ├── form-handler.js   # Form submission & HubSpot
│   └── gtm-setup.js      # Analytics integration
└── images/
    ├── Images/           # Product and lifestyle photos
    └── Logo/            # Brand assets
```

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Performance Optimizations

- Lazy loading for images
- Debounced form validation
- Minified CSS and optimized images recommended for production
- CDN delivery recommended for assets

## SEO

- Semantic HTML structure
- Meta tags configured
- Open Graph tags ready to add
- Structured data markup recommended

## Development

To run locally:
1. Serve files through a local web server (not file:// protocol)
2. Use tools like Live Server extension in VS Code
3. Test forms with actual HubSpot integration in staging environment

## Going Live Checklist

- [ ] Update GTM container ID
- [ ] Configure HubSpot forms integration
- [ ] Add missing lifestyle images
- [ ] Test all forms and calculators
- [ ] Verify analytics tracking
- [ ] Test on mobile devices
- [ ] Check loading speeds
- [ ] Validate HTML/CSS
- [ ] Set up SSL certificate
- [ ] Configure domain and hosting

## Support

For questions about implementation:
- Review specification document: `grabbix_b2b_site.md`
- Check browser console for JavaScript errors
- Validate markup at validator.w3.org

Built for Grabbix B2B - Smart Vending Solutions