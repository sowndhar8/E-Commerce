
// function SampleData() {
// Sample Data
const sampleProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 2999,
    originalPrice: 4999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 128,
    description: "High-quality wireless headphones with noise cancellation",
    inStock: true,
    discount: 40,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 12999,
    originalPrice: 15999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 256,
    description: "Latest smartwatch with health tracking features",
    inStock: true,
    discount: 19,
  },
  {
    id: 3,
    name: "Professional Camera",
    price: 45999,
    originalPrice: 52999,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 89,
    description: "Professional DSLR camera with 24MP sensor",
    inStock: false,
    discount: 13,
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: 1499,
    originalPrice: 2499,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    rating: 4.3,
    reviews: 445,
    description: "Durable laptop backpack with USB charging port",
    inStock: true,
    discount: 40,
  },
];

const sampleReviews = [
  {
    id: 1,
    userName: "Rahul Kumar",
    rating: 5,
    date: "2 days ago",
    comment: "Excellent product! Really loved the quality and fast delivery.",
    helpful: 24,
  },
  {
    id: 2,
    userName: "Priya Singh",
    rating: 4,
    date: "1 week ago",
    comment: "Good product but packaging could be better. Overall satisfied!",
    helpful: 12,
  },
  {
    id: 3,
    userName: "Amit Patel",
    rating: 5,
    date: "2 weeks ago",
    comment: "Amazing value for money. Highly recommended!",
    helpful: 38,
  },
];

const sampleOrders = [
  {
    id: "ORD123456",
    date: "2024-01-04",
    total: 15998,
    status: "delivered",
    items: 2,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        date: "Jan 04, 10:30 AM",
        completed: true,
      },
      {
        status: "confirmed",
        label: "Order Confirmed",
        date: "Jan 04, 11:00 AM",
        completed: true,
      },
      {
        status: "shipped",
        label: "Shipped",
        date: "Jan 05, 09:00 AM",
        completed: true,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        date: "Jan 06, 08:00 AM",
        completed: true,
      },
      {
        status: "delivered",
        label: "Delivered",
        date: "Jan 06, 02:30 PM",
        completed: true,
      },
    ],
    products: [
      { ...sampleProducts[0], quantity: 1 },
      { ...sampleProducts[1], quantity: 1 },
    ],
  },
  {
    id: "ORD123455",
    date: "2024-01-02",
    total: 2999,
    status: "shipped",
    items: 1,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        date: "Jan 02, 03:00 PM",
        completed: true,
      },
      {
        status: "confirmed",
        label: "Order Confirmed",
        date: "Jan 02, 03:30 PM",
        completed: true,
      },
      {
        status: "shipped",
        label: "Shipped",
        date: "Jan 03, 10:00 AM",
        completed: true,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        date: "Expected Jan 07",
        completed: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        date: "Pending",
        completed: false,
      },
    ],
    products: [{ ...sampleProducts[3], quantity: 1 }],
  },
];

export { sampleProducts, sampleReviews, sampleOrders };
