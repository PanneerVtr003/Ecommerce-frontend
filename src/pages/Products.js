import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Products.css';

// Enhanced product service with HD images
const productService = {
  getAllProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          // Electronics Category (Expanded)
          { 
            id: '1', 
            name: "Wireless Bluetooth Headphones", 
            price: 89.99, 
            originalPrice: 129.99,
            description: "Noise-cancelling wireless headphones with 30-hour battery life and premium sound quality. Perfect for travel and work.", 
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Electronics",
            rating: 4.5,
            reviews: 128,
            tags: ["Best Seller", "Wireless", "Noise Cancelling"],
            features: ["30hr Battery", "Active Noise Cancellation", "Quick Charge"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '2', 
            name: "Smart Watch Series 5", 
            price: 249.99, 
            originalPrice: 299.99,
            description: "Advanced fitness tracker with heart rate monitor, GPS, and 7-day battery life. Track your health and stay connected.", 
            image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Electronics",
            rating: 4.3,
            reviews: 89,
            tags: ["New", "Fitness", "Smart"],
            features: ["Heart Rate Monitor", "GPS", "Water Resistant"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '3', 
            name: "Wireless Earbuds Pro", 
            price: 129.99, 
            description: "True wireless earbuds with active noise cancellation and 24-hour battery. Immersive sound experience.", 
            image: "https://images.unsplash.com/photo-1574920162043-b872873f19c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8V2lyZWxlc3MlMjBFYXJidWRzJTIwUHJvfGVufDB8fDB8fHww",
            category: "Electronics",
            rating: 4.7,
            reviews: 203,
            tags: ["Popular", "True Wireless"],
            features: ["Active Noise Cancellation", "24hr Battery", "Wireless Charging"],
            inStock: true,
            fastDelivery: false
          },
          { 
            id: '4', 
            name: "4K Ultra HD Smart TV", 
            price: 699.99, 
            originalPrice: 899.99,
            description: "55-inch 4K Smart TV with HDR and built-in streaming apps. Cinematic experience at home.", 
            image: "https://plus.unsplash.com/premium_photo-1683121217848-44dde7d393e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8NEslMjBVbHRyYSUyMEhEJTIwU21hcnQlMjBUVnxlbnwwfHwwfHx8MA%3D%3D",
            category: "Electronics",
            rating: 4.4,
            reviews: 67,
            tags: ["Smart TV", "4K", "HDR"],
            features: ["4K Resolution", "HDR", "Smart Features"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '5', 
            name: "Gaming Laptop Pro", 
            price: 1299.99, 
            description: "High-performance gaming laptop with RTX graphics and 16GB RAM. Ultimate gaming experience.", 
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Electronics",
            rating: 4.8,
            reviews: 156,
            tags: ["Gaming", "High Performance"],
            features: ["RTX Graphics", "16GB RAM", "144Hz Display"],
            inStock: false,
            fastDelivery: false
          },
          { 
            id: '6', 
            name: "Tablet Pro 12.9", 
            price: 899.99, 
            description: "Professional tablet with stunning display and powerful performance for work and creativity.", 
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Electronics",
            rating: 4.6,
            reviews: 92,
            tags: ["Pro", "Portable"],
            features: ["12.9 Display", "Powerful Processor", "Stylus Support"],
            inStock: true,
            fastDelivery: true
          },

          // Fashion Category (Expanded)
          { 
            id: '7', 
            name: "Premium Leather Jacket", 
            price: 199.99, 
            originalPrice: 249.99,
            description: "Genuine leather jacket with premium stitching and comfortable fit. Timeless style.", 
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Fashion",
            rating: 4.6,
            reviews: 92,
            tags: ["Leather", "Premium"],
            features: ["Genuine Leather", "Comfortable Fit"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '8', 
            name: "Designer Running Shoes", 
            price: 129.99, 
            description: "Lightweight running shoes with advanced cushioning technology. Perfect for athletes.", 
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Fashion",
            rating: 4.2,
            reviews: 145,
            tags: ["Running", "Comfort"],
            features: ["Lightweight", "Advanced Cushioning"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '9', 
            name: "Classic Wristwatch", 
            price: 159.99, 
            originalPrice: 199.99,
            description: "Elegant analog wristwatch with leather strap and water resistance. Classic timepiece.", 
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Fashion",
            rating: 4.5,
            reviews: 78,
            tags: ["Classic", "Elegant"],
            features: ["Leather Strap", "Water Resistant"],
            inStock: true,
            fastDelivery: false
          },
          { 
            id: '10', 
            name: "Designer Handbag", 
            price: 299.99, 
            description: "Luxury leather handbag with multiple compartments and elegant design. Fashion statement.", 
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Fashion",
            rating: 4.7,
            reviews: 112,
            tags: ["Luxury", "Leather"],
            features: ["Multiple Compartments", "Premium Material"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '11', 
            name: "Sunglasses Collection", 
            price: 89.99, 
            description: "UV protection sunglasses with polarized lenses and stylish frames. Eye protection in style.", 
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Fashion",
            rating: 4.3,
            reviews: 201,
            tags: ["UV Protection", "Polarized"],
            features: ["Polarized Lenses", "UV Protection"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '12', 
            name: "Casual Sneakers", 
            price: 79.99, 
            originalPrice: 99.99,
            description: "Comfortable casual sneakers for everyday wear. Style meets comfort.", 
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Fashion",
            rating: 4.4,
            reviews: 167,
            tags: ["Casual", "Comfort"],
            features: ["Comfortable", "Everyday Wear"],
            inStock: true,
            fastDelivery: true
          },

          // Home & Kitchen Category (Expanded)
          { 
            id: '13', 
            name: "Stainless Steel Cookware Set", 
            price: 199.99, 
            originalPrice: 249.99,
            description: "10-piece non-stick cookware set with induction compatibility. Professional cooking at home.", 
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Home & Kitchen",
            rating: 4.4,
            reviews: 134,
            tags: ["Cookware", "Non-Stick"],
            features: ["10 Pieces", "Induction Compatible"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '14', 
            name: "Smart Coffee Maker", 
            price: 149.99, 
            description: "Programmable coffee maker with Wi-Fi connectivity and built-in grinder. Perfect brew every time.", 
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Home & Kitchen",
            rating: 4.6,
            reviews: 89,
            tags: ["Smart", "Programmable"],
            features: ["Wi-Fi Connected", "Built-in Grinder"],
            inStock: true,
            fastDelivery: false
          },
          { 
            id: '15', 
            name: "Air Purifier Pro", 
            price: 179.99, 
            description: "HEPA air purifier with smart sensors and auto mode. Breathe cleaner air.", 
            image: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/leap-petite-global/direct-journey/products/air-treatment/tp10/TP10-PDP-PWC-2-3.jpg?$responsive$&cropPathE=desktop&fit=stretch,1&wid=1920",
            category: "Home & Kitchen",
            rating: 4.2,
            reviews: 67,
            tags: ["HEPA", "Smart Sensors"],
            features: ["HEPA Filter", "Auto Mode"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '16', 
            name: "Robot Vacuum Cleaner", 
            price: 299.99, 
            description: "Smart robot vacuum with mapping technology and app control. Effortless cleaning.", 
            image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Um9ib3QlMjBWYWN1dW0lMjBDbGVhbmVyfGVufDB8fDB8fHww",
            category: "Home & Kitchen",
            rating: 4.5,
            reviews: 178,
            tags: ["Robot", "Smart"],
            features: ["Mapping Technology", "App Control"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '17', 
            name: "Electric Standing Desk", 
            price: 399.99, 
            description: "Height-adjustable standing desk with memory settings and USB ports. Work comfortably.", 
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Home & Kitchen",
            rating: 4.7,
            reviews: 95,
            tags: ["Adjustable", "Ergonomic"],
            features: ["Height Adjustable", "Memory Settings"],
            inStock: false,
            fastDelivery: false
          },
          { 
            id: '18', 
            name: "Smart Home Hub", 
            price: 129.99, 
            description: "Central control for all your smart home devices. Voice control compatible.", 
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Home & Kitchen",
            rating: 4.3,
            reviews: 143,
            tags: ["Smart Home", "Voice Control"],
            features: ["Voice Control", "Central Hub"],
            inStock: true,
            fastDelivery: true
          },

          // Sports & Outdoors Category (Expanded)
          { 
            id: '19', 
            name: "Mountain Bike Pro", 
            price: 599.99, 
            originalPrice: 749.99,
            description: "21-speed mountain bike with aluminum frame and front suspension. Adventure ready.", 
            image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Sports & Outdoors",
            rating: 4.8,
            reviews: 56,
            tags: ["Mountain", "21-Speed"],
            features: ["Aluminum Frame", "Front Suspension"],
            inStock: true,
            fastDelivery: false
          },
          { 
            id: '20', 
            name: "Yoga Mat Premium", 
            price: 49.99, 
            description: "Eco-friendly yoga mat with excellent grip and cushioning. Perfect for practice.", 
            image: "https://t4.ftcdn.net/jpg/00/91/30/73/360_F_91307353_FRkn48ljgBWFLd40NZlXEYsz7illMwZS.jpg",
            category: "Sports & Outdoors",
            rating: 4.3,
            reviews: 212,
            tags: ["Eco-Friendly", "Non-Slip"],
            features: ["Eco-friendly", "Excellent Grip"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '21', 
            name: "Camping Tent 4-Person", 
            price: 199.99, 
            description: "Weather-resistant camping tent with easy setup and ventilation. Outdoor adventures made easy.", 
            image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Sports & Outdoors",
            rating: 4.1,
            reviews: 78,
            tags: ["Camping", "Weather Resistant"],
            features: ["Easy Setup", "Weather Resistant"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '22', 
            name: "Fitness Tracker Pro", 
            price: 79.99, 
            description: "Waterproof fitness tracker with heart rate monitor and sleep tracking. Track your fitness journey.", 
            image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Sports & Outdoors",
            rating: 4.4,
            reviews: 189,
            tags: ["Fitness", "Waterproof"],
            features: ["Heart Rate Monitor", "Sleep Tracking"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '23', 
            name: "Portable Bluetooth Speaker", 
            price: 89.99, 
            description: "Waterproof portable speaker with 360° sound and 20-hour battery. Music anywhere.", 
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Sports & Outdoors",
            rating: 4.6,
            reviews: 145,
            tags: ["Portable", "Waterproof"],
            features: ["360° Sound", "20hr Battery"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '24', 
            name: "Running Shoes Elite", 
            price: 149.99, 
            description: "Professional running shoes with advanced cushioning and support. Run like a pro.", 
            image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Sports & Outdoors",
            rating: 4.7,
            reviews: 98,
            tags: ["Running", "Professional"],
            features: ["Advanced Cushioning", "Professional Support"],
            inStock: true,
            fastDelivery: true
          },

          // New Categories: Health & Beauty
          { 
            id: '25', 
            name: "Skincare Set Premium", 
            price: 79.99, 
            originalPrice: 99.99,
            description: "Complete skincare routine with cleanser, toner, and moisturizer. Radiant skin care.", 
            image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Health & Beauty",
            rating: 4.6,
            reviews: 178,
            tags: ["Skincare", "Premium"],
            features: ["Complete Routine", "Natural Ingredients"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '26', 
            name: "Hair Dryer Professional", 
            price: 89.99, 
            description: "Ionic hair dryer with multiple heat settings and cool shot. Salon-quality results.", 
            image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Health & Beauty",
            rating: 4.4,
            reviews: 123,
            tags: ["Hair Care", "Professional"],
            features: ["Ionic Technology", "Multiple Settings"],
            inStock: true,
            fastDelivery: true
          },

          // New Categories: Books & Media
          { 
            id: '27', 
            name: "E-Reader Pro", 
            price: 129.99, 
            description: "High-resolution e-reader with built-in light and waterproof design. Read anywhere.", 
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Books & Media",
            rating: 4.5,
            reviews: 87,
            tags: ["E-Reader", "Waterproof"],
            features: ["High Resolution", "Waterproof"],
            inStock: true,
            fastDelivery: false
          },
          { 
            id: '28', 
            name: "Noise Cancelling Headphones", 
            price: 199.99, 
            description: "Premium over-ear headphones with exceptional sound quality and comfort.", 
            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Electronics",
            rating: 4.8,
            reviews: 234,
            tags: ["Premium", "Noise Cancelling"],
            features: ["Over-ear", "Premium Sound"],
            inStock: true,
            fastDelivery: true
          },

          // New Categories: Toys & Games
          { 
            id: '29', 
            name: "Educational Robot Kit", 
            price: 149.99, 
            description: "STEM learning robot kit for kids with coding capabilities. Learn while having fun.", 
            image: "https://images.unsplash.com/photo-1745688810809-5040dc0cd002?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fEVkdWNhdGlvbmFsJTIwUm9ib3QlMjBLaXR8ZW58MHx8MHx8fDA%3D",
            category: "Toys & Games",
            rating: 4.7,
            reviews: 67,
            tags: ["STEM", "Educational"],
            features: ["Coding Capabilities", "Educational"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '30', 
            name: "Board Game Collection", 
            price: 59.99, 
            description: "Family board game collection with 5 popular games. Fun for all ages.", 
            image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Toys & Games",
            rating: 4.3,
            reviews: 145,
            tags: ["Family", "Collection"],
            features: ["5 Games", "All Ages"],
            inStock: true,
            fastDelivery: true
          },

          // Additional HD Products
          { 
            id: '31', 
            name: "DSLR Camera Professional", 
            price: 899.99, 
            originalPrice: 1099.99,
            description: "Professional DSLR camera with 4K video and advanced autofocus system.", 
            image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Electronics",
            rating: 4.7,
            reviews: 89,
            tags: ["Professional", "4K Video"],
            features: ["24MP Sensor", "4K Video", "Wi-Fi"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '32', 
            name: "Wireless Gaming Mouse", 
            price: 79.99, 
            description: "High-precision wireless gaming mouse with RGB lighting and programmable buttons.", 
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Electronics",
            rating: 4.4,
            reviews: 156,
            tags: ["Gaming", "Wireless"],
            features: ["RGB Lighting", "Programmable", "High Precision"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '33', 
            name: "Mechanical Keyboard", 
            price: 129.99, 
            originalPrice: 149.99,
            description: "RGB mechanical keyboard with customizable keys and premium build quality.", 
            image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Electronics",
            rating: 4.6,
            reviews: 203,
            tags: ["Mechanical", "RGB"],
            features: ["Cherry MX Switches", "RGB Backlit", "Aluminum Frame"],
            inStock: true,
            fastDelivery: false
          },
          { 
            id: '34', 
            name: "Smartphone Pro Max", 
            price: 999.99, 
            description: "Latest smartphone with advanced camera system and 5G connectivity.", 
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Electronics",
            rating: 4.8,
            reviews: 312,
            tags: ["5G", "Pro Camera"],
            features: ["Triple Camera", "5G", "Face ID"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '35', 
            name: "Wireless Charging Pad", 
            price: 39.99, 
            description: "Fast wireless charging pad compatible with all Qi-enabled devices.", 
            image: "https://images.unsplash.com/photo-1606077095660-726118e877fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFdpcmVsZXNzJTIwQ2hhcmdpbmclMjBQYWR8ZW58MHx8MHx8fDA%3D",
            category: "Electronics",
            rating: 4.3,
            reviews: 178,
            tags: ["Wireless", "Fast Charge"],
            features: ["15W Fast Charge", "LED Indicator", "Universal"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '36', 
            name: "Luxury Winter Coat", 
            price: 299.99, 
            originalPrice: 399.99,
            description: "Premium winter coat with thermal insulation and waterproof design.", 
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Fashion",
            rating: 4.5,
            reviews: 67,
            tags: ["Winter", "Luxury"],
            features: ["Thermal Insulation", "Waterproof", "Premium Wool"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '37', 
            name: "Designer Backpack", 
            price: 149.99, 
            description: "Stylish and functional backpack with laptop compartment and multiple pockets.", 
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Fashion",
            rating: 4.4,
            reviews: 134,
            tags: ["Designer", "Functional"],
            features: ["Laptop Compartment", "Water Resistant", "Multiple Pockets"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '38', 
            name: "Professional Makeup Kit", 
            price: 89.99, 
            originalPrice: 119.99,
            description: "Complete professional makeup kit with brushes and premium cosmetics.", 
            image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
            category: "Health & Beauty",
            rating: 4.6,
            reviews: 89,
            tags: ["Professional", "Complete Kit"],
            features: ["24 Pieces", "Premium Brushes", "Vegan"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '39', 
            name: "Yoga Block Set", 
            price: 29.99, 
            description: "High-density foam yoga blocks for improved alignment and support.", 
            image: "https://images.unsplash.com/photo-1712068980119-bdeb8353d16c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHlvZ2ElMjBibGFjayUyMHNldHxlbnwwfHwwfHx8MA%3D%3D ",
            category: "Sports & Outdoors",
            rating: 4.2,
            reviews: 156,
            tags: ["Yoga", "Fitness"],
            features: ["High-Density Foam", "Non-Slip", "Lightweight"],
            inStock: true,
            fastDelivery: true
          },
          { 
            id: '40', 
            name: "Camping Cookware Set", 
            price: 69.99, 
            description: "Compact and lightweight cookware set perfect for camping and outdoor adventures.", 
            image: "https://images.unsplash.com/photo-1588279102558-dabc7b32d9b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fENhbXBpbmclMjBDb29rd2FyZSUyMFNldHxlbnwwfHwwfHx8MA%3D%3D",
            category: "Sports & Outdoors",
            rating: 4.3,
            reviews: 78,
            tags: ["Camping", "Lightweight"],
            features: ["8 Pieces", "Non-Stick", "Compact"],
            inStock: true,
            fastDelivery: true
          }
        ]);
      }, 500);
    });
  }
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products from server.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Enhanced filtering with multiple criteria
  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === 'all' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = product.rating >= ratingFilter;
    
    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.reviews - a.reviews;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const categories = ['all', ...new Set(products.map(product => product.category).filter(Boolean))];
  
  // Calculate price range for filter
  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.price));

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Discovering amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1>Discover Amazing Products</h1>
        <p>Find everything you need with our curated collection of {products.length} premium items</p>
      </div>

      <div className="products-controls">
        <div className="controls-top">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="controls-actions">
            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            <div className="sort-controls">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="advanced-filters">
            <div className="filter-group">
              <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
              <div className="price-slider">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="slider"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="slider"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Minimum Rating:</label>
              <div className="rating-filter">
                {[4, 3, 2, 1, 0].map(rating => (
                  <button
                    key={rating}
                    className={`rating-btn ${ratingFilter === rating ? 'active' : ''}`}
                    onClick={() => setRatingFilter(rating)}
                  >
                    {rating === 0 ? 'Any' : `${rating}+ Stars`}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Quick Categories:</label>
              <div className="category-buttons">
                <button 
                  className={`category-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All Products
                </button>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <button
                    key={category}
                    className={`category-btn ${filter === category ? 'active' : ''}`}
                    onClick={() => setFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Category Filter */}
        <div className="quick-categories">
          <div className="category-buttons">
            <button 
              className={`category-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            {categories.filter(cat => cat !== 'all').map(category => (
              <button
                key={category}
                className={`category-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="products-info">
        <span className="products-count">{sortedProducts.length} products found</span>
        {searchTerm && (
          <span className="search-term">for "{searchTerm}"</span>
        )}
        {filter !== 'all' && (
          <span className="category-filter">in {filter}</span>
        )}
        {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
          <span className="price-filter">priced ${priceRange[0]} - ${priceRange[1]}</span>
        )}
        {ratingFilter > 0 && (
          <span className="rating-filter">rated {ratingFilter}+ stars</span>
        )}
        
        {(searchTerm || filter !== 'all' || priceRange[0] > minPrice || priceRange[1] < maxPrice || ratingFilter > 0) && (
          <button 
            onClick={() => {
              setFilter('all');
              setSearchTerm('');
              setPriceRange([minPrice, maxPrice]);
              setRatingFilter(0);
            }} 
            className="reset-filters-btn"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="products-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && !loading && (
        <div className="no-products">
          <div className="no-products-content">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <div className="suggestions">
              <p>Suggestions:</p>
              <ul>
                <li>Check your spelling</li>
                <li>Try more general keywords</li>
                <li>Adjust price range or rating filters</li>
                <li>Browse different categories</li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
                setPriceRange([minPrice, maxPrice]);
                setRatingFilter(0);
              }} 
              className="reset-filters-btn"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;