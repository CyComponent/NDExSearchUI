/*
 * Author: Eric Sage <eric.david.sage@gmail.com>
 *
 * The app bar displays a cart icon on the left for opening the network cart
 * and also the logout mechanism on the right of the bar.
 */

import React      from 'react'
import AppBar     from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton';
import CartIcon   from 'material-ui/svg-icons/action/shopping-cart';
import PopOver    from 'material-ui/Popover'
import Dialog     from 'material-ui/Dialog'
import Badge      from 'material-ui/Badge';
import Cart       from './Cart'
import Login      from './Login'

export default class TopBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = { cartOpen: false, loginOpen: false }
  }

  handleCart = () => {
    this.setState({ cartOpen: !this.state.cartOpen })
  }

  handleLogin = (event) => {
    this.setState({
      loginOpen: !this.state.loginOpen,
      anchorEl: event ? event.currentTarget : null
    })
  }

  render() {
    return (
      <AppBar
        title="Network Cart"
        iconElementLeft={
          <IconButton onClick={this.handleCart}>
            <CartIcon/>
          </IconButton>
        }
        iconElementRight={
          <IconButton onClick={this.handleLogin}>
            <CartIcon/>
          </IconButton>
        }
      >
        <Cart
          isOpen={this.state.cartOpen}
          handleClose={this.handleCart}
          cart={this.props.cart}
          cartActions={this.props.cartActions}
        />
        <Login
          isOpen={this.state.loginOpen}
          handleClose={this.handleLogin}
          anchorEl={this.state.anchorEl}
          fields={this.props.fields}
          fieldActions={this.props.fieldActions}
          creds={this.props.creds}
          credActions={this.props.credActions}
        />
      </AppBar>
    )
  }

}