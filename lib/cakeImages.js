const cakeImages = {
  // Celebration Cakes
  "Dark Chocolate Truffle": "/products/cake-01.jpg",
  "Salted Nutty Caramel Fudge": "/products/cake-02.jpg",
  "Butterscotch Delight": "/products/cake-03.jpg",
  Butterscotch: "/products/cake-03.jpg",
  "Lotus Biscoff Cheesecake": "/products/cake-04.jpg",
  "Tiramisu with Mascarpone": "/products/cake-05.jpg",
  Tiramisu: "/products/cake-05.jpg",
  "Blueberry Cheesecake": "/products/cake-07.jpg",
  "Lemon Meringue Tart": "/products/cake-09.jpg",
  "New York Cheesecake": "/products/cake-10.jpg",
  "Peach Cheesecake": "/products/cake-11.jpg",
  "Oreo Chocolate": "/products/cake-12.jpg",
  "Strawberry Cheesecake": "/products/cake-13.jpg",
  "Lemon Meringue Cheesecake": "/products/cake-14.jpg",
  "Red Velvet with Cream Cheese": "/products/cake-15.jpg",
  "Lemon Meringue Cake": "/products/cake-16.jpg",
  "Chocolate World Cake": "/products/cake-17.jpg",
  "Matcha Strawberry White Chocolate": "/products/cake-18.jpg",
  "Mango Coconut Sticky Rice Cheesecake": "/products/cake-19.jpg",
  "Russian Honey Cake": "/products/cake-21.jpg",
  "Carrot Cake with Cream Cheese": "/products/cake-22.jpg",
  "Tres Leches (Milk Cake) — Plain": "/products/cake-23.jpg",
  "Coconut-Lotus Biscoff / Raspberry Cake": "/products/cake-25.jpg",
  "Fruit Gateaux": "/products/cake-26.jpg",
  Blueberry: "/products/cake-27.jpg",
};

export function getCakeImage(name) {
  return cakeImages[name] || null;
}
