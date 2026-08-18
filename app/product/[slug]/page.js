import ProductContent from "./ProductContent";

const products = {
  // Celebration Cakes
  "black-forest": { name: "Black Forest", price1: 800, price2: 1500, description: "Classic black forest cake with cherry filling and chocolate shavings." },
  "white-forest": { name: "White Forest", price1: 800, price2: 1500, description: "Delicate white forest cake with vanilla cream and cherry toppings." },
  "blueberry-cake": { name: "Blueberry Cake", price1: 800, price2: 1500, description: "Moist blueberry cake with cream cheese frosting." },
  "red-velvet": { name: "Red Velvet", price1: 800, price2: 1500, description: "Classic red velvet cake with cream cheese frosting." },
  "dark-chocolate-truffle": { name: "Dark Chocolate Truffle", price1: 800, price2: 1600, description: "Rich dark chocolate cake layered with smooth chocolate ganache." },
  "russian-honey-cake": { name: "Russian Honey Cake", price1: 800, price2: 1500, description: "Soft honey layers with a smooth cream finish." },
  tiramisu: { name: "Tiramisu", price1: 800, price2: 1500, description: "Classic coffee-soaked dessert with mascarpone cream." },
  "fruit-gateaux": { name: "Fruit Gateaux", price1: 800, price2: 1500, description: "Light sponge cake layered with fresh fruits and cream." },
  "rainbow-cake": { name: "Rainbow Cake", price1: 800, price2: 1600, description: "Colorful layered cake with vanilla buttercream." },
  "salted-nutty-caramel-fudge": { name: "Salted Nutty Caramel Fudge", price1: 800, price2: 1600, description: "Rich caramel fudge cake with salted nuts." },
  "white-chocolate-truffle": { name: "White Chocolate Truffle", price1: 800, price2: 1600, description: "Decadent white chocolate cake with creamy truffle layers." },
  "lemon-meringue-cake": { name: "Lemon Meringue Cake", price1: 800, price2: 1500, description: "Tangy lemon cake topped with toasted meringue." },
  "matcha-strawberry": { name: "Matcha Strawberry", price1: 800, price2: 1500, description: "Earthy matcha paired with fresh strawberry." },
  "carrot-cake-cream-cheese": { name: "Carrot Cake Cream Cheese", price1: 800, price2: 1500, description: "Spiced carrot cake with cream cheese frosting." },
  "chocolate-world-cake": { name: "Chocolate World Cake", price1: 800, price2: 1500, description: "Ultimate chocolate cake for chocolate lovers." },
  "coconut-lotus-biscoff": { name: "Coconut Lotus Biscoff", price1: 800, price2: 1500, description: "Coconut cake with Lotus Biscoff spread." },

  // Cheesecakes
  "lotus-biscoff-cheesecake": { name: "Lotus Biscoff Cheesecake", type: "cheesecake", price1: 600, price2: 1000, price3: 1400, description: "Creamy cheesecake with a Lotus Biscoff base and topping." },
  "classic-new-york-cheesecake": { name: "New York Cheesecake", type: "cheesecake", price1: 600, price2: 1000, price3: 1400, description: "Rich and creamy classic New York style cheesecake." },
  "mango-cheesecake": { name: "Mango Cheesecake", type: "cheesecake", price1: 600, price2: 1000, price3: 1400, description: "Creamy cheesecake with a fresh mango topping." },
  "blueberry-cheesecake": { name: "Blueberry Cheesecake", type: "cheesecake", price1: 600, price2: 1000, price3: 1400, description: "Classic cheesecake topped with blueberry compote." },
  "chocolate-cheesecake": { name: "Chocolate Cheesecake", type: "cheesecake", price1: 600, price2: 1000, price3: 1400, description: "Rich chocolate cheesecake on an Oreo crust." },
  "basque-burnt-cheesecake": { name: "Basque Burnt Cheesecake", type: "cheesecake", price1: 600, price2: 1000, price3: 1400, description: "Caramelized Basque style burnt cheesecake." },
  "japanese-cheesecake": { name: "Japanese Cheesecake", type: "cheesecake", price1: 600, price2: 1000, price3: 1400, description: "Light and fluffy cotton cheesecake." },

  // Mousse Cakes
  "mango-mousse-cake": { name: "Mango Mousse Cake", price1: 1000, price2: 2000, description: "Light mango mousse cake with layers of fresh mango." },
  "chocolate-mousse-cake": { name: "Chocolate Mousse Cake", price1: 1000, price2: 2000, description: "Rich chocolate mousse cake with silky ganache layers." },
  "coffee-mousse-cake": { name: "Coffee Mousse Cake", price1: 1000, price2: 2000, description: "Coffee-infused mousse cake for coffee lovers." },
  "strawberry-mousse": { name: "Strawberry Mousse", price1: 1000, price2: 2000, description: "Fresh strawberry mousse cake with a light sponge." },
  "hazelnut-praline-mousse": { name: "Hazelnut Praline Mousse", price1: 1000, price2: 2000, description: "Nutty hazelnut praline mousse cake." },
  "banoffee-mousse": { name: "Banoffee Mousse", price1: 1000, price2: 2000, description: "Banana and toffee mousse cake." },
  "young-coconut-mousse": { name: "Young Coconut Mousse", price1: 1000, price2: 2000, description: "Refreshing young coconut mousse cake." },
  "raspberry-white-mousse": { name: "Raspberry White Mousse", price1: 1000, price2: 2000, description: "Raspberry and white chocolate mousse cake." },
};

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const product = products[params.slug] ?? products["dark-chocolate-truffle"];
  return {
    title: product.name,
    description: `${product.description} Order ${product.name} from Akri Bakes, Dimapur, Nagaland. Prices from ₹${product.price1}.`,
  };
}

export default function ProductPage({ params }) {
  const product = products[params.slug] ?? products["dark-chocolate-truffle"];
  return <ProductContent product={product} />;
}
