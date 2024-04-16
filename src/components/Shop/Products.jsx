import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DummyProduct = [
  {
    id: "p1",
    title: "first book",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    id: "p2",
    title: "second book",
    price: 10,
    description: "This is a second product - amazing!",
  },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DummyProduct.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
