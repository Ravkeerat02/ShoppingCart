import React from "react";

// will contain the layour
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";

import useStyles from "./styles";

import { AddShoppingCart } from "@material-ui/icons";

const Product = ({ product }) => {
  //   used to call styling
  const classes = useStyles();

  //   to check
  console.log(product);

  return <div>test</div>;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.Media}
        image={product.image}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {product.price}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to cart">
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
