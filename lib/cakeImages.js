export const ASSET_PREFIX = "/AKRI-BAKES";

const cakeImages = {
  // Celebration Cakes
  "Dark Chocolate Truffle": `${ASSET_PREFIX}/products/cake-01.jpg`,
  "Salted Nutty Caramel Fudge": `${ASSET_PREFIX}/products/cake-02.jpg`,
  "Butterscotch Delight": `${ASSET_PREFIX}/products/cake-03.jpg`,
  Butterscotch: `${ASSET_PREFIX}/products/cake-03.jpg`,
  "Lotus Biscoff Cheesecake": `${ASSET_PREFIX}/products/cake-04.jpg`,
  "Tiramisu with Mascarpone": `${ASSET_PREFIX}/products/cake-05.jpg`,
  Tiramisu: `${ASSET_PREFIX}/products/cake-05.jpg`,
  "Blueberry Cheesecake": `${ASSET_PREFIX}/products/cake-07.jpg`,
  "Lemon Meringue Tart": `${ASSET_PREFIX}/products/cake-09.jpg`,
  "New York Cheesecake": `${ASSET_PREFIX}/products/cake-10.jpg`,
  "Peach Cheesecake": `${ASSET_PREFIX}/products/cake-11.jpg`,
  "Oreo Chocolate": `${ASSET_PREFIX}/products/cake-12.jpg`,
  "Strawberry Cheesecake": `${ASSET_PREFIX}/products/cake-13.jpg`,
  "Lemon Meringue Cheesecake": `${ASSET_PREFIX}/products/cake-14.jpg`,
  "Red Velvet with Cream Cheese": `${ASSET_PREFIX}/products/cake-15.jpg`,
  "Lemon Meringue Cake": `${ASSET_PREFIX}/products/cake-16.jpg`,
  "Chocolate World Cake": `${ASSET_PREFIX}/products/cake-17.jpg`,
  "Matcha Strawberry White Chocolate": `${ASSET_PREFIX}/products/cake-18.jpg`,
  "Mango Coconut Sticky Rice Cheesecake": `${ASSET_PREFIX}/products/cake-19.jpg`,
  "Russian Honey Cake": `${ASSET_PREFIX}/products/cake-21.jpg`,
  "Carrot Cake with Cream Cheese": `${ASSET_PREFIX}/products/cake-22.jpg`,
  "Tres Leches (Milk Cake) — Plain": `${ASSET_PREFIX}/products/cake-23.jpg`,
  "Coconut-Lotus Biscoff / Raspberry Cake": `${ASSET_PREFIX}/products/cake-25.jpg`,
  "Fruit Gateaux": `${ASSET_PREFIX}/products/cake-26.jpg`,
  Blueberry: `${ASSET_PREFIX}/products/cake-27.jpg`,
};

export function getCakeImage(name) {
  return cakeImages[name] || null;
}
