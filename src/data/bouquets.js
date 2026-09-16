// High-resolution, aesthetic curated bouquet imagery
export const BOUQUETS_DATA = [
  {
    id: 1,
    name: "Rosé Romance",
    category: "Roses",
    tag: "Bestseller",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 128,
    description: "Delicate blush pink roses, spray roses, and eucalyptus wrapped in luxury textured linen paper.",
    flowers: ["Blush Rose", "Spray Rose", "Baby's Breath", "Eucalyptus"],
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80",
    ribbonColor: "Dusty Blush"
  },
  {
    id: 2,
    name: "Lavender Dreams",
    category: "Mixed",
    tag: "Popular",
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviews: 94,
    description: "A calming symphony of violet lisianthus, fresh French lavender sprigs, and pastel lilac statice.",
    flowers: ["French Lavender", "Lisianthus", "Lilac Statice", "Silver Dollar"],
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80",
    ribbonColor: "Lavender Silk"
  },
  {
    id: 3,
    name: "Sunshine Bloom",
    category: "Mixed",
    tag: "Vibrant",
    price: 699,
    originalPrice: 849,
    rating: 4.7,
    reviews: 82,
    description: "Golden yellow ranunculus, sunny daisies, chamomile, and warm greenery to brighten any space.",
    flowers: ["Yellow Ranunculus", "Chamomile", "Sun Daisies", "Ruscus"],
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=80",
    ribbonColor: "Golden Ochre"
  },
  {
    id: 4,
    name: "Blush Peony",
    category: "Premium",
    tag: "Signature",
    price: 1099,
    originalPrice: 1499,
    rating: 5.0,
    reviews: 215,
    description: "Voluminous Dutch blush peonies paired with garden roses and trailing jasmine greens.",
    flowers: ["Dutch Peonies", "Pink Garden Roses", "Waxflower", "Jasmine Vine"],
    image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=80",
    ribbonColor: "Rose Velvet"
  },
  {
    id: 5,
    name: "Wildflower Love",
    category: "Mixed",
    tag: "Artisanal",
    price: 749,
    originalPrice: 899,
    rating: 4.9,
    reviews: 110,
    description: "Whimsical meadow-gathered feel with blue delphinium, pink aster, cosmos, and soft grasses.",
    flowers: ["Delphinium", "Pink Cosmos", "Meadow Aster", "Bunny Tails"],
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1000&q=80",
    ribbonColor: "Earthy Jute & Cream"
  },
  {
    id: 6,
    name: "Ruby Rose",
    category: "Roses",
    tag: "Romantic",
    price: 999,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 176,
    description: "Deep velvety burgundy and classic crimson grand-prix roses with rich Italian greenery.",
    flowers: ["Crimson Roses", "Burgundy Spray", "Red Hypericum", "Olive Leaves"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    ribbonColor: "Wine Satin"
  },
  {
    id: 7,
    name: "Pastel Garden",
    category: "Premium",
    tag: "Limited Edition",
    price: 1199,
    originalPrice: 1599,
    rating: 5.0,
    reviews: 142,
    description: "An opulent gathering of creamy hydrangeas, apricot garden roses, and peach carnations.",
    flowers: ["Hydrangeas", "Peach Garden Roses", "Carnations", "Seed Eucalyptus"],
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1000&q=80",
    ribbonColor: "Champagne Sheer"
  },
  {
    id: 8,
    name: "White Serenity",
    category: "Lilies",
    tag: "Pure & Elegant",
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 89,
    description: "Fragrant Oriental white lilies, ivory lisianthus, and snowy carnations for peace and grace.",
    flowers: ["Oriental Lilies", "White Lisianthus", "Snow Carnations", "Aspidistra"],
    image: "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=1000&q=80",
    ribbonColor: "Pure Pearl Ivory"
  },
  {
    id: 9,
    name: "Velvet Tulip Cascade",
    category: "Tulips",
    tag: "Seasonal",
    price: 949,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 64,
    description: "Hand-picked Dutch pastel tulips in blush, cream, and soft magenta wrapped in craft parchment.",
    flowers: ["Pastel Dutch Tulips", "Baby Blue Eucalyptus"],
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1000&q=80",
    ribbonColor: "Soft Silk Sage"
  }
];

export const CATEGORIES = ["All", "Roses", "Tulips", "Lilies", "Mixed", "Premium"];

export const OCCASIONS = [
  { name: "Birthdays", icon: "🎂", desc: "Celebrate another year in full bloom" },
  { name: "Anniversaries", icon: "💍", desc: "Romantic gestures that speak true love" },
  { name: "Congratulations", icon: "🥂", desc: "For graduations, new jobs & triumphs" },
  { name: "Sympathy & Care", icon: "🕊️", desc: "Gentle comfort when words are hard" },
  { name: "Just Because", icon: "✨", desc: "Unprompted joy that brightens ordinary days" }
];

export const REVIEWS = [
  {
    name: "Aaditi Sharma",
    city: "Mumbai",
    rating: 5,
    text: "The Rosé Romance bouquet arrived in pristine condition. The fragrance filled the whole room and the packaging looked straight out of an upscale Parisian atelier!",
    bouquet: "Rosé Romance"
  },
  {
    name: "Rohit Malhotra",
    city: "Bangalore",
    rating: 5,
    text: "Ordered the Blush Peony for our 5th anniversary. My wife was genuinely moved to tears by how fresh, huge, and beautifully arranged it was.",
    bouquet: "Blush Peony"
  },
  {
    name: "Meera Krishnan",
    city: "Delhi",
    rating: 5,
    text: "BLOOMÉ's attention to detail, handwritten card, and silky ribbon made this the most premium gifting experience I've had online.",
    bouquet: "White Serenity"
  }
];
