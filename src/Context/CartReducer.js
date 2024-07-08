export const totalItem = (cart) => {
  return cart.reduce((sum, product) => sum + product.quantity, 0);
};

export const totalPrice = (cart) => {
  return cart.reduce(
    (total, product) =>
      total +
      (product.quantity * (product.price || product.discountFees)),
    0
  );
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return [...state, { ...action.product, quantity: 1 }];

    case "Remove":
      return state.filter((p) => (p.id || p._id) !== action.id);

    case "Increase": {
      const index = state.findIndex((p) => (p.id || p._id) === action.id);
      if (index !== -1) {
        const updatedState = [...state];
        updatedState[index] = {
          ...updatedState[index],
          quantity: updatedState[index].quantity + 1,
        };
        return updatedState;
      }
      return state;
    }

    case "Decrease": {
      const index = state.findIndex((p) => (p.id || p._id) === action.id);
      if (index !== -1) {
        const updatedState = [...state];
        if (updatedState[index].quantity > 1) {
          updatedState[index] = {
            ...updatedState[index],
            quantity: updatedState[index].quantity - 1,
          };
        }
        return updatedState;
      }
      return state;
    }

    default:
      return state; // Ensure default case returns the current state
  }
};

export default CartReducer;
