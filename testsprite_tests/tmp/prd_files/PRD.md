# Pizza Express - Product Requirements Document

## Overview
Pizza Express is a web-based pizza delivery application that allows customers to browse menus, add items to cart, place orders, and track delivery status in real-time.

## Core Features

### 1. Homepage
- Hero section with call-to-action buttons
- Featured pizza showcase
- Company information and features
- Location finder functionality

### 2. Menu System
- Complete pizza menu with categories (Pizzas, Appetizers, Drinks, Desserts)
- Filter functionality by category
- Size selection for pizzas (Small, Medium, Large)
- Add to cart functionality
- Price display for all items

### 3. Shopping Cart
- View cart items with quantities
- Modify item quantities (increase/decrease)
- Remove items from cart
- Calculate subtotal, tax, delivery fee, and total
- Promo code application
- Delivery vs Pickup options
- Checkout process with customer information form

### 4. Order Tracking
- Order lookup by order number and phone
- Real-time order status tracking
- Progress visualization (Confirmed → Preparing → Baking → Out for Delivery → Delivered)
- Driver information when out for delivery
- Order details display

## User Flows

### Primary Flow: Order Pizza
1. User visits homepage
2. Navigates to menu
3. Selects pizza size and adds to cart
4. Reviews cart and proceeds to checkout
5. Fills in delivery information
6. Places order
7. Receives order confirmation
8. Tracks order status

### Secondary Flows
- Browse menu without ordering
- Find store locations
- Apply promo codes
- Track existing orders

## Technical Requirements
- Responsive design (mobile-friendly)
- Local storage for cart persistence
- Form validation
- Interactive UI with Bootstrap and Tailwind CSS
- JavaScript-based cart management

## Success Criteria
- Users can successfully place orders
- Cart functionality works correctly
- Order tracking provides accurate status
- Forms validate properly
- Navigation works seamlessly
- Mobile responsiveness maintained