// PizzaExpress - JavaScript functionality for Pizza Delivery App

// Global variables
let cart = JSON.parse(localStorage.getItem('pizzaCart')) || [];
let orders = JSON.parse(localStorage.getItem('pizzaOrders')) || [];

// Promo codes
const promoCodes = {
    'WELCOME10': { discount: 0.10, description: '10% off your order' },
    'PIZZA20': { discount: 0.20, description: '20% off your order' },
    'FREESHIP': { discount: 0, description: 'Free delivery', freeShipping: true }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    updateCartCount();
    setupGlobalEventListeners();
    
    // Page-specific initializations
    const currentPage = getCurrentPage();
    if (currentPage === 'cart') {
        initializeCartPage();
    } else if (currentPage === 'menu') {
        initializeMenuPage();
    } else if (currentPage === 'order-tracking') {
        initializeTrackingPage();
    }
}

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('menu.html')) return 'menu';
    if (path.includes('cart.html')) return 'cart';
    if (path.includes('order-tracking.html')) return 'order-tracking';
    return 'index';
}

// Setup global event listeners
function setupGlobalEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // Location form
    const locationForm = document.getElementById('locationForm');
    if (locationForm) {
        locationForm.addEventListener('submit', handleLocationSearch);
    }
}

// Cart functionality
function handleAddToCart(event) {
    const button = event.target.closest('.add-to-cart');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const size = button.getAttribute('data-size') || 'Regular';
    
    const cartItem = {
        id: generateId(),
        name: name,
        price: price,
        size: size,
        quantity: 1,
        timestamp: Date.now()
    };
    
    // Check if item already exists
    const existingItemIndex = cart.findIndex(item => 
        item.name === name && item.size === size
    );
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }
    
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'position-fixed bottom-0 end-0 m-4 alert alert-success alert-dismissible fade show';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initialize cart page
function initializeCartPage() {
    displayCartItems();
    updateCartSummary();
    setupCartEventListeners();
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        return;
    }
    
    emptyCart.style.display = 'none';
    
    const cartHTML = cart.map(item => `
        <div class="cart-item p-4 d-flex align-items-center" data-id="${item.id}">
            <img src="${getItemImage(item.name)}" alt="${item.name}" class="cart-item-image me-3">
            <div class="flex-grow-1">
                <h6 class="mb-1 fw-bold">${item.name}</h6>
                <p class="text-muted mb-1 small">${item.size !== 'Regular' ? `Size: ${item.size}` : ''}</p>
                <p class="text-red-600 fw-bold mb-0">$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls me-3">
                <button class="quantity-btn decrease-qty" data-id="${item.id}">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="quantity-btn increase-qty" data-id="${item.id}">+</button>
            </div>
            <div class="text-end">
                <p class="fw-bold mb-2">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="btn btn-outline-danger btn-sm remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    cartItemsContainer.innerHTML = cartHTML;
}

// Get item image
function getItemImage(itemName) {
    const imageMap = {
        'Classic Margherita': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop'
    };
    return imageMap[itemName] || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop';
}

// Setup cart event listeners
function setupCartEventListeners() {
    const cartContainer = document.getElementById('cart-items');
    if (cartContainer) {
        cartContainer.addEventListener('click', handleCartActions);
    }
    
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }
    
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

// Handle cart actions
function handleCartActions(event) {
    const target = event.target.closest('button');
    if (!target) return;
    
    const itemId = target.getAttribute('data-id');
    
    if (target.classList.contains('remove-item')) {
        removeFromCart(itemId);
    } else if (target.classList.contains('increase-qty')) {
        updateQuantity(itemId, 1);
    } else if (target.classList.contains('decrease-qty')) {
        updateQuantity(itemId, -1);
    }
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
    displayCartItems();
    updateCartSummary();
    updateCartCount();
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        localStorage.setItem('pizzaCart', JSON.stringify(cart));
        displayCartItems();
        updateCartSummary();
        updateCartCount();
    }
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 3.99;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('delivery-fee').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

// Open checkout modal
function openCheckoutModal() {
    const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    modal.show();
}

// Handle checkout
function handleCheckout(event) {
    event.preventDefault();
    
    const orderNumber = generateOrderNumber();
    
    // Clear cart
    cart = [];
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
    
    // Show success
    showOrderSuccess(orderNumber);
    updateCartCount();
}

// Show order success
function showOrderSuccess(orderNumber) {
    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    if (checkoutModal) checkoutModal.hide();
    
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('delivery-time').textContent = '25-35 minutes';
    successModal.show();
}

// Initialize menu page
function initializeMenuPage() {
    setupMenuFilters();
}

// Setup menu filters
function setupMenuFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            menuCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                category.style.display = (filter === 'all' || filter === categoryType) ? 'block' : 'none';
            });
        });
    });
}

// Initialize tracking page
function initializeTrackingPage() {
    const orderLookupForm = document.getElementById('order-lookup-form');
    if (orderLookupForm) {
        orderLookupForm.addEventListener('submit', handleOrderLookup);
    }
}

// Handle order lookup
function handleOrderLookup(event) {
    event.preventDefault();
    
    const orderNumber = document.getElementById('orderNumber').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    
    // Simulate order found
    if (orderNumber && phoneNumber) {
        displayOrderTracking(orderNumber);
    } else {
        showOrderNotFound();
    }
}

// Display order tracking
function displayOrderTracking(orderNumber) {
    document.getElementById('order-lookup-card').style.display = 'none';
    document.getElementById('order-tracking-section').style.display = 'block';
    
    document.getElementById('display-order-number').textContent = orderNumber;
    document.getElementById('order-date').textContent = new Date().toLocaleDateString();
    document.getElementById('customer-name').textContent = 'John Doe';
    document.getElementById('customer-phone').textContent = '(555) 123-4567';
    document.getElementById('customer-email').textContent = 'john@example.com';
    document.getElementById('delivery-address').textContent = '123 Main St, City, State 12345';
    document.getElementById('estimated-time').textContent = '7:30 PM';
    document.getElementById('order-total').textContent = '$24.99';
    
    // Activate progress steps
    document.getElementById('step-confirmed').classList.add('active');
    document.getElementById('step-preparing').classList.add('active');
}

// Show order not found
function showOrderNotFound() {
    document.getElementById('error-message').style.display = 'block';
    setTimeout(() => {
        document.getElementById('error-message').style.display = 'none';
    }, 5000);
}

// Location search handler
function handleLocationSearch(event) {
    event.preventDefault();
    
    const zipCode = document.getElementById('zipCode').value;
    const resultsContainer = document.getElementById('locationResults');
    
    resultsContainer.innerHTML = `
        <div class="mt-4">
            <h6 class="fw-bold">Locations near ${zipCode}:</h6>
            <div class="list-group">
                <div class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-1">PizzaExpress Downtown</h6>
                            <p class="mb-1 small text-muted">123 Main St - 0.5 miles away</p>
                            <small class="text-success">Open until 11 PM</small>
                        </div>
                        <button class="btn btn-red btn-sm">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper functions
function generateOrderNumber() {
    return 'PE' + Date.now().toString().slice(-6);
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function updateElement(id, content) {
    const element = document.getElementById(id);
    if (element) element.textContent = content;
}