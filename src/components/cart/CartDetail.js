import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import * as buyActions from "../../redux/actions/buyActions";
import { Table, Button } from "reactstrap";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

class CartDetail extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);

    alertify.error(product.productName + " sepetten silindi");
  }

  buyFromCart(product, cartItem) {
    const result = this.props.actions.buyFromCart(product);

    if (result) {
      this.props.actions.removeFromCart(product);
    }

    alertify.success("Ürün satın alındı")
  }
  
 

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Stock</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.product.map((cartItem) => (
              <tr key={cartItem.product.id}>
                <th scope="row">{cartItem.product.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.quantity}</td>
                <td>{cartItem.product.unitsInStock}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.removeFromCart(cartItem.product)}
                  >
                    sil
                  </Button>
                </td>
                <td>
                  <Button
                    color="primary"
                    
                  ><Link to={"/cart"} style={linkStyle}>
                    Satın Al</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      buyFromCart: bindActionCreators(buyActions.buyFromCart, dispatch),
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
export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
