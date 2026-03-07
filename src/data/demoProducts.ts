import { Product } from '@/types/products';

export const demoProducts: Partial<Product>[] = [
    {
        name: "Premium Almonds (Badam)",
        description: "Hand-picked, Jumbo sized almonds. Rich in protein, fiber, and healthy fats. Perfect for a morning energy boost.",
        price: 15.99,
        discountPrice: 12.99,
        category: "Dry Fruits",
        rating: 4.8,
        reviewsCount: 124,
        image: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&q=80&w=800",
        features: ["Jumbo Size", "High Protein", "Rich in Vitamin E"]
    },
    {
        name: "Roasted Cashews (Kaju)",
        description: "Buttery and crunchy roasted cashews with a hint of salt. Sourced from the finest orchards of Goa.",
        price: 18.50,
        discountPrice: 15.99,
        category: "Dry Fruits",
        rating: 4.9,
        reviewsCount: 89,
        image: "https://images.unsplash.com/photo-1560690011-8dd93cb648f4?auto=format&fit=crop&q=80&w=800",
        features: ["Perfectly Roasted", "Low Sodium", "Heart Healthy"]
    },
    {
        name: "Pistachios (Pista)",
        description: "California-grown roasted and salted pistachios. A delightful green snack full of nutrients.",
        price: 22.00,
        discountPrice: 19.50,
        category: "Dry Fruits",
        rating: 4.7,
        reviewsCount: 156,
        image: "https://images.unsplash.com/photo-1557849963-4903328e3077?auto=format&fit=crop&q=80&w=800",
        features: ["High Fiber", "Healthy Weight", "Good for Heart"]
    },
    {
        name: "Chilean Walnuts (Akhrot)",
        description: "Light-colored, brain-healthy walnuts from Chile. High in Omega-3 fatty acids.",
        price: 25.00,
        discountPrice: 21.00,
        category: "Dry Fruits",
        rating: 4.6,
        reviewsCount: 67,
        image: "https://images.unsplash.com/photo-1522013862215-081919808388?auto=format&fit=crop&q=80&w=800",
        features: ["Omega-3 Rich", "No Shell", "Grown in Chile"]
    },
    {
        name: "Medjool Dates (Khajur)",
        description: "The 'King of Dates' - large, sweet, and succulent. Natural energy source with zero added sugar.",
        price: 14.50,
        discountPrice: 11.99,
        category: "Dry Fruits",
        rating: 4.9,
        reviewsCount: 231,
        image: "https://images.unsplash.com/photo-1571321079545-0d04c4b69389?auto=format&fit=crop&q=80&w=800",
        features: ["Naturally Sweet", "Rich in Iron", "Bumper Harvest"]
    },
    {
        name: "Golden Raisins (Kishmish)",
        description: "Sweet and tangy seedless golden raisins. Perfect for baking or adding to your oatmeal.",
        price: 9.99,
        category: "Dry Fruits",
        rating: 4.5,
        reviewsCount: 45,
        image: "https://images.unsplash.com/photo-1572370774261-71fb7ba30491?auto=format&fit=crop&q=80&w=800",
        features: ["Seedless", "No Added Sugar", "High Energy"]
    },
    {
        name: "Green Cardamom (Elaichi)",
        description: "Aromatic bold green cardamom pods. Sourced from the hills of Kerala for maximum flavor.",
        price: 32.00,
        discountPrice: 28.50,
        category: "Spices",
        rating: 4.8,
        reviewsCount: 92,
        image: "https://images.unsplash.com/photo-1563865436874-9aef32395ee5?auto=format&fit=crop&q=80&w=800",
        features: ["Bold Quality", "Long Shelf Life", "Intense Aroma"]
    },
    {
        name: "Black Pepper (Kali Mirch)",
        description: "Whole black peppercorns, traditionally sun-dried. The king of spices for every kitchen.",
        price: 12.00,
        category: "Spices",
        rating: 4.7,
        reviewsCount: 54,
        image: "https://images.unsplash.com/photo-1579306194872-64d3472410bf?auto=format&fit=crop&q=80&w=800",
        features: ["100% Organic", "Pure Taste", "Sun Dried"]
    },
    {
        name: "Organic Turmeric (Haldi)",
        description: "Pure Lakadong turmeric powder with high curcumin content. Natural anti-inflammatory properties.",
        price: 8.50,
        discountPrice: 6.99,
        category: "Spices",
        rating: 4.9,
        reviewsCount: 178,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800",
        features: ["High Curcumin", "No Adulteration", "Sourced from Meghalaya"]
    },
    {
        name: "Whole Cumin (Jeera)",
        description: "Hand-cleaned whole cumin seeds. Essential for tempering and adding warmth to your dishes.",
        price: 7.00,
        category: "Spices",
        rating: 4.6,
        reviewsCount: 42,
        image: "https://images.unsplash.com/photo-1581600104856-1cb8423e3092?auto=format&fit=crop&q=80&w=800",
        features: ["Bold Grain", "Rich Essential Oils", "Triple Cleaned"]
    },
    {
        name: "Chia Seeds",
        description: "Premium organic black chia seeds. Ancient superfood rich in Omega-3 and fiber.",
        price: 11.50,
        discountPrice: 9.99,
        category: "Seeds",
        rating: 4.8,
        reviewsCount: 312,
        image: "https://images.unsplash.com/photo-1507919909716-43940173e354?auto=format&fit=crop&q=80&w=800",
        features: ["Superfood", "Versatile Use", "Certified Organic"]
    },
    {
        name: "Pumpkin Seeds",
        description: "Raw green pumpkin seeds (Pepitas). Excellent source of zinc and protein for a healthy snack.",
        price: 13.00,
        discountPrice: 11.50,
        category: "Seeds",
        rating: 4.7,
        reviewsCount: 86,
        image: "https://images.unsplash.com/photo-1543306460-e44d32e9da22?auto=format&fit=crop&q=80&w=800",
        features: ["Heart Supportive", "Zinc Rich", "Great for Salads"]
    },
    {
        name: "Saffron (Kesar)",
        description: "Authentic Kashmiri 'Mongra' Saffron. Known for its intense color, aroma, and medicinal benefits.",
        price: 45.00,
        discountPrice: 39.99,
        category: "Spices",
        rating: 5.0,
        reviewsCount: 56,
        image: "https://images.unsplash.com/photo-1511216113906-8f57bb83e776?auto=format&fit=crop&q=80&w=800",
        features: ["A++ Grade", "Kashmiri Origin", "Hand Picked"]
    },
    {
        name: "Dried Figs (Anjeer)",
        description: "Premium quality Turkish dried figs. Naturally high in potassium and antioxidants.",
        price: 19.99,
        discountPrice: 17.50,
        category: "Dry Fruits",
        rating: 4.7,
        reviewsCount: 74,
        image: "https://images.unsplash.com/photo-1596541221147-36e78550170a?auto=format&fit=crop&q=80&w=800",
        features: ["Calcium Rich", "Soft & Chewy", "No Preservatives"]
    },
    {
        name: "White Quinoa",
        description: "Triple-washed white quinoa grains. A complete protein source for your healthy bowls.",
        price: 14.00,
        category: "Organic Grains",
        rating: 4.6,
        reviewsCount: 112,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
        features: ["Gluten Free", "Easy to Cook", "High Protein"]
    },
    {
        name: "Organic Honey",
        description: "Raw, unfiltered wildflower honey. Naturally sourced from deep forest beehives.",
        price: 10.50,
        category: "Organic Grains",
        rating: 4.9,
        reviewsCount: 204,
        image: "https://images.unsplash.com/photo-1471943311424-646960669fba?auto=format&fit=crop&q=80&w=800",
        features: ["Raw & Pure", "Immunity Booster", "Unpasteurized"]
    },
    {
        name: "Sunflower Seeds",
        description: "Unsalted sunflower seeds. A crunchy, nutty addition to your breakfast or snacks.",
        price: 9.00,
        category: "Seeds",
        rating: 4.5,
        reviewsCount: 38,
        image: "https://images.unsplash.com/photo-1506084868730-170b2203bf4e?auto=format&fit=crop&q=80&w=800",
        features: ["Vitamin E Rich", "Keto Friendly", "Raw & Fresh"]
    },
    {
        name: "Flax Seeds (Alsi)",
        description: "High-quality brown flax seeds. Powerpacked with Omega-3 and lignans.",
        price: 6.50,
        category: "Seeds",
        rating: 4.7,
        reviewsCount: 61,
        image: "https://images.unsplash.com/photo-1507919909716-43940173e354?auto=format&fit=crop&q=80&w=800",
        features: ["Omega-3 Powerhouse", "Metabolism Boost", "Cold Pressed Friendly"]
    },
    {
        name: "Phool Makhana (Fox Nuts)",
        description: "Puffed lotus seeds, perfect for low-calorie snacking. High in calcium and protein.",
        price: 12.50,
        discountPrice: 10.99,
        category: "Healthy Snacks",
        rating: 4.8,
        reviewsCount: 147,
        image: "https://images.unsplash.com/photo-1588615419958-479603504169?auto=format&fit=crop&q=80&w=800",
        features: ["Low Calorie", "Calcium Rich", "Roasted Perfection"]
    },
    {
        name: "Star Anise",
        description: "Whole star-shaped spice with a distinct licorice flavor. Beautiful and aromatic garnish.",
        price: 8.00,
        category: "Spices",
        rating: 4.6,
        reviewsCount: 29,
        image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800",
        features: ["Select Grade", "Highly Aromatic", "Authentic Star Shape"]
    },
    {
        name: "Cinnamon Sticks",
        description: "Premium Ceylon cinnamon sticks from Sri Lanka. Sweeter and healthier than Cassia.",
        price: 11.00,
        discountPrice: 9.50,
        category: "Spices",
        rating: 4.9,
        reviewsCount: 63,
        image: "https://images.unsplash.com/photo-1532551405108-41ca50d5102a?auto=format&fit=crop&q=80&w=800",
        features: ["Ceylon Variety", "Healthy Heart", "Natural Sweetness"]
    },
    {
        name: "Dried Apricots",
        description: "Sun-dried Turkish apricots. Vibrantly flavored and packed with Vitamin A.",
        price: 15.00,
        category: "Dry Fruits",
        rating: 4.4,
        reviewsCount: 52,
        image: "https://images.unsplash.com/photo-1571321079545-0d04c4b69389?auto=format&fit=crop&q=80&w=800",
        features: ["Skin Health", "High Fiber", "Grown in Turkey"]
    },
    {
        name: "Hemp Seeds",
        description: "Hulled hemp hearts. A complete plant protein with earthy, nutty flavor.",
        price: 17.50,
        category: "Seeds",
        rating: 4.7,
        reviewsCount: 41,
        image: "https://images.unsplash.com/photo-1507919909716-43940173e354?auto=format&fit=crop&q=80&w=800",
        features: ["Vegan Protein", "GLA Rich", "Perfect for Smoothies"]
    },
    {
        name: "Mace (Javitri)",
        description: "Premium hand-picked flower mace. Delicate and warm flavoring for gourmet cooking.",
        price: 15.00,
        category: "Spices",
        rating: 4.8,
        reviewsCount: 18,
        image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800",
        features: ["Whole Blade", "Gourmet Grade", "Hand Packaged"]
    },
    {
        name: "Black Raisins",
        description: "Afghan black raisins with seeds. Sourced for their therapeutic blood purifying properties.",
        price: 13.50,
        category: "Dry Fruits",
        rating: 4.6,
        reviewsCount: 95,
        image: "https://images.unsplash.com/photo-1572370774261-71fb7ba30491?auto=format&fit=crop&q=80&w=800",
        features: ["With Seeds", "High Iron", "Blood Purifier"]
    },
    {
        name: "Brazil Nuts",
        description: "Large, buttery Brazil nuts. The best natural source of Selenium for thyroid health.",
        price: 24.00,
        discountPrice: 20.99,
        category: "Dry Fruits",
        rating: 4.7,
        reviewsCount: 34,
        image: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&q=80&w=800",
        features: ["Selenium Rich", "Brain Function", "Raw and Natural"]
    },
    {
        name: "Roasted Grains Mix",
        description: "A healthy blend of roasted millets, puffs, and nuts. The ultimate guilt-free namkeen alternative.",
        price: 9.50,
        category: "Healthy Snacks",
        rating: 4.5,
        reviewsCount: 122,
        image: "https://images.unsplash.com/photo-1588615419958-479603504169?auto=format&fit=crop&q=80&w=800",
        features: ["Oil Free", "Whole Grain", "High Protein Snacking"]
    },
    {
        name: "Whole Nutmeg (Jaiphal)",
        description: "Large size whole nutmeg. Freshly grated nutmeg is perfect for desserts and savory sauces.",
        price: 6.00,
        category: "Spices",
        rating: 4.8,
        reviewsCount: 15,
        image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800",
        features: ["Single Origin", "Strong Flavor", "Natural Sedative"]
    },
    {
        name: "Brown Rice (Basmati)",
        description: "Unpolished long grain Basmati brown rice. High in fiber and low glycemic index.",
        price: 16.00,
        category: "Organic Grains",
        rating: 4.7,
        reviewsCount: 88,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
        features: ["Healthy Carb", "Low GI", "Fragrant Grain"]
    },
    {
        name: "Dried Blueberries",
        description: "Premium dried blueberries from North America. Antioxidant rich and deliciously tangy.",
        price: 26.00,
        discountPrice: 22.50,
        category: "Dry Fruits",
        rating: 4.9,
        reviewsCount: 154,
        image: "https://images.unsplash.com/photo-1596541221147-36e78550170a?auto=format&fit=crop&q=80&w=800",
        features: ["Pure Fruit", "Eye Health", "Fiber Rich"]
    },
    {
        name: "Carom Seeds (Ajwain)",
        description: "Pungent carom seeds, excellent for digestion. Essential in Indian snacks like pakoras.",
        price: 5.50,
        category: "Spices",
        rating: 4.6,
        reviewsCount: 47,
        image: "https://images.unsplash.com/photo-1581600104856-1cb8423e3092?auto=format&fit=crop&q=80&w=800",
        features: ["Digestion Aid", "Fresh Quality", "Essential for Gut"]
    },
    {
        name: "Fenugreek Seeds",
        description: "Whole organic methi seeds. Used for tempering and controlled blood sugar management.",
        price: 6.00,
        category: "Spices",
        rating: 4.4,
        reviewsCount: 33,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800",
        features: ["Blood Sugar Control", "Organic Certified", "Ancient Spice"]
    },
    {
        name: "Coriander Seeds",
        description: "Golden coriander whole seeds. Sourced for their intense citrusy warmth.",
        price: 4.50,
        category: "Spices",
        rating: 4.5,
        reviewsCount: 22,
        image: "https://images.unsplash.com/photo-1581600104856-1cb8423e3092?auto=format&fit=crop&q=80&w=800",
        features: ["Golden Variety", "Cooling Property", "Triple Cleaned"]
    },
    {
        name: "Pumpkin Seeds (Salted)",
        description: "Lightly salted and roasted pumpkin seeds. The perfect desk snack for energy bursts.",
        price: 14.50,
        category: "Seeds",
        rating: 4.8,
        reviewsCount: 55,
        image: "https://images.unsplash.com/photo-1543306460-e44d32e9da22?auto=format&fit=crop&q=80&w=800",
        features: ["Low Sodium", "High Zinc", "Perfect Crunch"]
    },
    {
        name: "Sesame (White)",
        description: "Peeled white sesame seeds. Used in baking and making traditional sesame brittle.",
        price: 7.50,
        category: "Seeds",
        rating: 4.5,
        reviewsCount: 41,
        image: "https://images.unsplash.com/photo-1507919909716-43940173e354?auto=format&fit=crop&q=80&w=800",
        features: ["Calcium Booster", "Nutty Flavor", "Fresh Batch"]
    },
    {
        name: "Kalonji Seeds",
        description: "Whole black seed (Nigella Sativa). An ancient seed known for its versatile benefits.",
        price: 8.00,
        category: "Seeds",
        rating: 4.7,
        reviewsCount: 29,
        image: "https://images.unsplash.com/photo-1507919909716-43940173e354?auto=format&fit=crop&q=80&w=800",
        features: ["Pure Quality", "Healing Seed", "Immunity Boost"]
    },
    {
        name: "Amaranth Grains",
        description: "Tiny superfood grains. Naturally gluten-free and highly nutritious for porridge.",
        price: 11.00,
        category: "Organic Grains",
        rating: 4.6,
        reviewsCount: 37,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
        features: ["Gluten Free", "Iron Rich", "Heritage Grain"]
    },
    {
        name: "Millet (Bajra)",
        description: "Whole pearl millet. A traditional energy-rich grain perfect for healthy rotis.",
        price: 9.00,
        category: "Organic Grains",
        rating: 4.4,
        reviewsCount: 46,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
        features: ["Ancient Grain", "Winter Special", "Local Sourced"]
    },
    {
        name: "Dried Cranberries",
        description: "Sweetened dried cranberries. Ideal for salads, yogurt, and trail mixes.",
        price: 18.00,
        category: "Dry Fruits",
        rating: 4.8,
        reviewsCount: 110,
        image: "https://images.unsplash.com/photo-1596541221147-36e78550170a?auto=format&fit=crop&q=80&w=800",
        features: ["Tart & Sweet", "UTI Prevention", "High Antioxidant"]
    },
    {
        name: "Pecan Halves",
        description: "Natural raw pecan halves. Rich, buttery flavor perfect for Southern-style desserts.",
        price: 28.00,
        discountPrice: 24.50,
        category: "Dry Fruits",
        rating: 4.7,
        reviewsCount: 22,
        image: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&q=80&w=800",
        features: ["Large Halves", "Healthy Fats", "Raw Quality"]
    },
    {
        name: "Pine Nuts (Chilgoza)",
        description: "Rare and exquisite pine nuts. Collected from high altitude forests of Himalayas.",
        price: 55.00,
        category: "Dry Fruits",
        rating: 4.9,
        reviewsCount: 14,
        image: "https://images.unsplash.com/photo-1557849963-4903328e3077?auto=format&fit=crop&q=80&w=800",
        features: ["Exotic Nut", "Himalayan Forest", "High Protein"]
    },
    {
        name: "Buckwheat (Kuttu)",
        description: "Organic buckwheat groats. Nutrient-dense, gluten-free pseudo-cereal.",
        price: 13.00,
        category: "Organic Grains",
        rating: 4.5,
        reviewsCount: 31,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
        features: ["Gluten Free", "Heart Healthy", "Keto Friendly"]
    },
    {
        name: "Melon Seeds",
        description: "Peeled cantaloupe seeds. Often used in Mughlai cooking and rich gravies.",
        price: 10.00,
        category: "Seeds",
        rating: 4.6,
        reviewsCount: 25,
        image: "https://images.unsplash.com/photo-1543306460-e44d32e9da22?auto=format&fit=crop&q=80&w=800",
        features: ["Triple Cleaned", "Sweet Flavor", "Rich Gravies"]
    },
    {
        name: "Hazelnuts (Filberts)",
        description: "Raw whole hazelnuts. Perfectly round and crunchy with a rich chocolate compatibility.",
        price: 26.00,
        discountPrice: 22.00,
        category: "Dry Fruits",
        rating: 4.7,
        reviewsCount: 44,
        image: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&q=80&w=800",
        features: ["Antioxidant Rich", "Brain Food", "Raw Single Origin"]
    },
    {
        name: "Dried Goji Berries",
        description: "Tibetan red goji berries. Celebrated as the ultimate superfood for longevity.",
        price: 21.00,
        category: "Dry Fruits",
        rating: 4.8,
        reviewsCount: 62,
        image: "https://images.unsplash.com/photo-1596541221147-36e78550170a?auto=format&fit=crop&q=80&w=800",
        features: ["Longevity Berry", "Certified Clean", "Immunity Booster"]
    },
    {
        name: "Roasted Fox Nuts (Peri Peri)",
        description: "Crispy Peri Peri flavored makhana. A spicy twists to the organic snack.",
        price: 14.00,
        category: "Healthy Snacks",
        rating: 4.6,
        reviewsCount: 189,
        image: "https://images.unsplash.com/photo-1588615419958-479603504169?auto=format&fit=crop&q=80&w=800",
        features: ["Bold Spice", "No Trans Fat", "Light Snacking"]
    },
    {
        name: "Fennel Seeds (Lucknowi)",
        description: "Small size sweet fennel seeds. Best for use as a mouth freshener post meals.",
        price: 9.00,
        category: "Spices",
        rating: 4.9,
        reviewsCount: 56,
        image: "https://images.unsplash.com/photo-1581600104856-1cb8423e3092?auto=format&fit=crop&q=80&w=800",
        features: ["Sweet Quality", "Natural Digestive", "Intense Color"]
    },
    {
        name: "Whole Cloves (Srilankan)",
        description: "Large bold whole cloves. Sourced from organic farms for oil-rich quality.",
        price: 16.00,
        category: "Spices",
        rating: 4.7,
        reviewsCount: 38,
        image: "https://images.unsplash.com/photo-1563865436874-9aef32395ee5?auto=format&fit=crop&q=80&w=800",
        features: ["Bold Grade", "Oil Rich", "Natural Aroma"]
    },
    {
        name: "Bay Leaves (Tej Patta)",
        description: "Whole large bay leaves. Traditionally sun-dried for authentic fragrance.",
        price: 4.00,
        category: "Spices",
        rating: 4.5,
        reviewsCount: 19,
        image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800",
        features: ["Full Leaves", "Sun Dried", "Fragrant Quality"]
    },
    {
        name: "Peeled Macadamia Nuts",
        description: "Luxury creamy macadamia nuts. Sourced from Australia, the finest in taste.",
        price: 42.00,
        category: "Dry Fruits",
        rating: 4.9,
        reviewsCount: 27,
        image: "https://images.unsplash.com/photo-1557849963-4903328e3077?auto=format&fit=crop&q=80&w=800",
        features: ["Exotic Grade", "Creamy Flavor", "Australian Origin"]
    }
];
