import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as cartActions from "../../../redux/actions/cartActions";
import * as buyActions from "../../../redux/actions/buyActions";
import alertify from "alertifyjs";
import { Button } from "reactstrap";

function purchaseProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
 
  const [product, setProduct] = useState({});

  function buyFromCart(product, cartItem) {
    const result = this.props.actions.buyFromCart(product);

    if (result) {
      this.props.actions.removeFromCart(product);
    }

    alertify.success("Ürün satın alındı")
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setProduct(previousProduct => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/");
    });
  }
  

  return (
    <table class="table-auto">
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Stock Amount</th>
    </tr>
  </thead>
  <tbody>
  {this.props.cart.map((cartItem) => (
              <tr key={cartItem.product.id}>
                <th scope="row">{cartItem.product.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.quantity}</td>
                <td>{cartItem.product.unitsInStock}</td>
                <td>
                </td>
              </tr>
            ))}
            <Button color="primary"><Link to={"/cart"} style={linkStyle}>Sepete Dön</Link></Button>
            <Button onClick={buyFromCart} color="success"> Satın al</Button>
  </tbody>
</table>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      buyFromCart: bindActionCreators(buyActions.buyFromCart, dispatch),
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    buy: state.stockReducer,
  };
}

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white',

};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(purchaseProduct);
