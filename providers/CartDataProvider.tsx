import { createContext, ReactChild, ReactChildren, useEffect, useState } from 'react';

interface Props {
  children: ReactChild | ReactChildren;
}

export type Product = {
  id: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  thumbnailUrl: string;
};

export const CartContext = createContext({
  items: [] as Product[],
  totalPrice: 0,
  amountOfItems: 0,
  handleAddItemToCart: (productToAdd: Product, selected: string) => {},
  handleRemoveItemFromCart: (productToRemove: Product) => {},
});

const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useState([] as Product[]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [amountOfItems, setAmountOfItems] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('cart-data')) {
      const prod = JSON.parse(localStorage.getItem('cart-data') || '[]');
      setItems(prod);

      //  Calculate amount of items and total price of cart
      let value = 0;
      let amount = 0;

      prod.map((item: Product) => {
        value += item.price * item.quantity;
        amount += item.quantity;
      });

      setTotalPrice(value);
      setAmountOfItems(amount);
    }
  }, []);

  const handleAddItemToCart = (productToAdd: Product, selected: string) => {
    if (selected !== '' && typeof window !== 'undefined') {
      if (!localStorage.getItem('cart-data')) localStorage.setItem('cart-data', JSON.stringify([]));

      const cartData = JSON.parse(localStorage.getItem('cart-data') || '');
      const filteredData = cartData.filter((product: Product) => product.id === productToAdd.id && product.size === productToAdd.size);

      if (filteredData.length > 0) {
        const updatedCartData: Product[] = cartData.map((product: Product) => {
          return product.id === productToAdd.id
            ? {
                ...product,
                quantity: (product.quantity += 1),
              }
            : product;
        });

        setItems(updatedCartData);
        localStorage.setItem('cart-data', JSON.stringify(updatedCartData));
      } else {
        cartData.unshift(productToAdd);

        setItems(cartData);
        localStorage.setItem('cart-data', JSON.stringify(cartData));
      }

      setTotalPrice((prevState) => prevState + productToAdd.price);
      setAmountOfItems((prevState) => prevState + 1);
    }
  };

  const handleRemoveItemFromCart = (productToRemove: Product) => {
    const updatedCartData = items.filter((item: Product) => item.id !== productToRemove.id || item.size !== productToRemove.size);

    setItems(updatedCartData);
    setTotalPrice((prevState) => prevState - productToRemove.price * productToRemove.quantity);
    setAmountOfItems((prevState) => prevState - productToRemove.quantity);
    localStorage.setItem('cart-data', JSON.stringify(updatedCartData));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        amountOfItems,
        handleAddItemToCart,
        handleRemoveItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
