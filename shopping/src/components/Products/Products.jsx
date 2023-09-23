import { Grid } from "@material-ui/core";
import Product from "../Product/Product";

// mock data
const products = [
  {
    id: 1,
    name: "Shoes",
    description: "Running",
    price: "$5",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Technology",
    description: "Electronic",
    price: "$10",
    image: "https://via.placeholder.com/150",
  },
];

const Products = () => {
  return (
    <main>
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
