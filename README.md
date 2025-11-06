# 🍕 PizzaExpress - Pizza Delivery Website

A modern, responsive pizza delivery website built with HTML5, CSS3, and JavaScript. Features a complete ordering system with real-time cart management, checkout process, and order tracking.

![PizzaExpress Homepage](https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop)

## ✨ Features

### 🏠 Homepage
- **Hero Section** with compelling call-to-actions
- **Featured Pizzas** showcase
- **Company Features** highlighting delivery speed, fresh ingredients, and easy ordering
- **Location Finder** modal for store locator

### 🍽️ Menu System
- **Categorized Menu** (Pizzas, Appetizers, Drinks, Desserts)
- **Dynamic Filtering** by category
- **Size Selection** for pizzas (Small, Medium, Large)
- **Real-time Pricing** with size-based calculations

### 🛒 Shopping Cart
- **Add to Cart** functionality with size and quantity selection
- **Cart Management** - modify quantities, remove items
- **Price Calculations** - subtotal, tax, delivery fee
- **Promo Code System** with discount application
- **Delivery Options** - delivery vs pickup selection

### 💳 Checkout Process
- **Customer Information** form with validation
- **Delivery Address** input for delivery orders
- **Payment Processing** interface
- **Order Confirmation** with order number generation

### 📱 Order Tracking
- **Order Lookup** by order number and phone
- **Real-time Progress** tracking (Confirmed → Preparing → Baking → Out for Delivery → Delivered)
- **Driver Information** display when out for delivery
- **Order Details** comprehensive view

### 📱 Responsive Design
- **Mobile-First** design approach
- **Bootstrap 5.3** + **Tailwind CSS 2.2** for styling
- **Responsive Navigation** with collapsible mobile menu
- **Cross-device Compatibility**

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Bootstrap 5.3.0, Tailwind CSS 2.2.19
- **Icons**: Font Awesome 6.0.0
- **Storage**: Local Storage for cart persistence
- **Images**: Unsplash API for high-quality food images

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Local web server (Python, Node.js, or any HTTP server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pizza-delivery-website.git
   cd pizza-delivery-website
   ```

2. **Start a local server**
   
   **Option 1: Python**
   ```bash
   # Python 3
   python3 -m http.server 8080
   
   # Python 2
   python -m SimpleHTTPServer 8080
   ```
   
   **Option 2: Node.js**
   ```bash
   npx http-server -p 8080
   ```
   
   **Option 3: PHP**
   ```bash
   php -S localhost:8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

## 📁 Project Structure

```
pizza-delivery-website/
├── index.html              # Homepage
├── menu.html               # Menu page
├── cart.html               # Shopping cart page
├── order-tracking.html     # Order tracking page
├── script.js               # Main JavaScript functionality
├── styles.css              # Custom CSS styles
├── PRD.md                  # Product Requirements Document
├── package.json            # NPM configuration
├── testsprite_tests/       # TestSprite automated test results
│   ├── testsprite-mcp-test-report.md
│   └── tmp/
│       ├── code_summary.json
│       └── report_prompt.json
└── README.md               # This file
```

## 🎯 Key Features Breakdown

### Cart Management
- **Persistent Storage**: Cart data saved in localStorage
- **Cross-page Sync**: Cart count updates across all pages
- **Size Handling**: Different prices for Small/Medium/Large pizzas
- **Quantity Controls**: Increment/decrement with real-time price updates

### Promo Code System
```javascript
const promoCodes = {
    'WELCOME10': { discount: 0.10, description: '10% off your order' },
    'PIZZA20': { discount: 0.20, description: '20% off your order' },
    'FREESHIP': { discount: 0, description: 'Free delivery', freeShipping: true }
};
```

### Order Tracking Simulation
- **5-Stage Progress**: Confirmed → Preparing → Baking → Out for Delivery → Delivered
- **Driver Information**: Displayed when order is out for delivery
- **Estimated Times**: Dynamic delivery time calculations

## 🧪 Testing

This project includes comprehensive automated testing with **TestSprite**:

- **13 Test Cases** covering all major functionality
- **UI Component Testing** for responsive design
- **Form Validation Testing** for edge cases
- **User Flow Testing** for complete order process
- **Cross-browser Compatibility** testing

### Running Tests

```bash
# Install TestSprite (if not already installed)
npm install @testsprite/testsprite-mcp --save-dev

# Run automated tests
npm run test
```

View the complete test report: `testsprite_tests/testsprite-mcp-test-report.md`

## 📱 Mobile Responsive

- **Breakpoints**: Mobile-first design with Bootstrap grid system
- **Navigation**: Collapsible hamburger menu for mobile
- **Touch-Friendly**: Large buttons and touch targets
- **Optimized Images**: Responsive images with proper aspect ratios

## 🎨 Design Features

- **Modern UI**: Clean, professional design with red/orange theme
- **Typography**: Clear hierarchy with appropriate font weights
- **Imagery**: High-quality food photography from Unsplash
- **Animations**: Smooth hover effects and transitions
- **Accessibility**: Proper ARIA labels and semantic HTML

## 🔧 Configuration

### Promo Codes
Edit the `promoCodes` object in `script.js` to add/modify promotional offers.

### Menu Items
Menu items are hardcoded in HTML files. To add new items, follow the existing card structure in `menu.html`.

### Styling
- **Bootstrap**: Utility classes for layout and components
- **Tailwind**: Additional utility classes for styling
- **Custom CSS**: `styles.css` for project-specific styles

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select source branch (main/master)
4. Your site will be available at `https://yourusername.github.io/pizza-delivery-website`

### Netlify
1. Connect your GitHub repository
2. Build settings: None required (static site)
3. Deploy automatically on commits

### Vercel
1. Import project from GitHub
2. Framework preset: None
3. Deploy with zero configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bootstrap** for the responsive framework
- **Tailwind CSS** for utility-first styling
- **Font Awesome** for beautiful icons
- **Unsplash** for high-quality food photography
- **TestSprite** for automated testing capabilities

## 📞 Support

If you have any questions or need help with the project:

- **Email**: hello@pizzaexpress.com
- **Phone**: (555) 123-PIZZA
- **Hours**: Mon-Sun: 11AM-11PM

---

**Made with ❤️ for pizza lovers everywhere! 🍕**