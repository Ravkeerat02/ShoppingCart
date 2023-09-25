import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Cart = ({ cart }) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Cart is empty. Start adding to it
      <Link to="/" className={classes.link}>
        Start adding{" "}
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <div>{item.name}</div>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkout}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Shopping Cart
      </Typography>
      {!cart.line_items || cart.line_items.length === 0 ? (
        <EmptyCart />
      ) : (
        <FilledCart />
      )}
    </Container>
  );
};

export default Cart;
