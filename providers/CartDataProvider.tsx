import { createContext, ReactChild, ReactChildren, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

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
  handleIncrementQuantity: (productToEdit: Product) => {},
  handleDecrementQuantity: (productToEdit: Product) => {},
});

const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useState([] as Product[]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [amountOfItems, setAmountOfItems] = useState(0);
  const { data: session, status } = useSession();

  const saveToDatabase = () => {
    const cartProducts: Product[] = JSON.parse(localStorage.getItem('cart-data') || '[]');
    const cartValue: number =
      cartProducts.length > 0 ? cartProducts.reduce((total: number, product: Product) => total + product.price * product.quantity, 0) : 0;
    const cartAmount: number = cartProducts.length > 0 ? cartProducts.reduce((total: number, product: Product) => total + product.quantity, 0) : 0;

    fetch('/api/syncCartData', {
      body: JSON.stringify({
        token: session?.user.id,
        cartProducts,
        cartValue,
        cartAmount,
      }),
      method: 'PATCH',
    }).then();
  };

  useEffect(() => {
    if (localStorage.getItem('cart-data')) {
      const prod = JSON.parse(localStorage.getItem('cart-data') || '[]');
      setItems(prod);

      //  Calculate amount of items and total price of cart
      let value = 0;
      let amount = 0;

      prod.map((product: Product) => {
        value += product.price * product.quantity;
        amount += product.quantity;
      });

      setTotalPrice(value);
      setAmountOfItems(amount);
    }
  }, []);

  //Sync data with db
  useEffect(() => {
    if (status === 'authenticated' && !sessionStorage.getItem('fetched')) {
      fetch('/api/syncCartData', {
        body: JSON.stringify({
          token: session?.user.id,
        }),
        method: 'POST',
      }).then(async (res: Response) => {
        const { cartProducts, cartValue, cartAmount } = await res.json();

        cartProducts.map((product: Product) => handleAddItemToCart(product, product.size));

        setTotalPrice((prevState: number) => prevState + cartValue);
        setAmountOfItems((prevState: number) => prevState + cartAmount);
        saveToDatabase();
        sessionStorage.setItem('fetched', 'true');
      });
    }
  }, [status]);

  const handleAddItemToCart = (productToAdd: Product, selected: string) => {
    if (selected !== '') {
      if (!localStorage.getItem('cart-data')) localStorage.setItem('cart-data', JSON.stringify([]));

      const cartData = JSON.parse(localStorage.getItem('cart-data') || '');
      //Check if product is present in cart
      const filteredData = cartData.filter((product: Product) => product.id === productToAdd.id && product.size === productToAdd.size);

      //If is: update quantity,
      //else: add it to an array
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

    status === 'authenticated' ? saveToDatabase() : null;
  };

  const handleRemoveItemFromCart = (productToRemove: Product) => {
    const updatedCartData = items.filter((product: Product) => product.id !== productToRemove.id || product.size !== productToRemove.size);

    setItems(updatedCartData);
    setTotalPrice((prevState) => prevState - productToRemove.price * productToRemove.quantity);
    setAmountOfItems((prevState) => prevState - productToRemove.quantity);
    localStorage.setItem('cart-data', JSON.stringify(updatedCartData));

    status === 'authenticated' ? saveToDatabase() : null;
  };

  const handleIncrementQuantity = (productToEdit: Product) => {
    if (productToEdit.quantity < 10) {
      const updatedCartData = items.map((product: Product) => {
        return product.id === productToEdit.id && product.size === productToEdit.size
          ? {
              ...product,
              quantity: (product.quantity += 1),
            }
          : product;
      });

      setItems(updatedCartData);
      setTotalPrice((prevState) => prevState + productToEdit.price);
      setAmountOfItems((prevState) => prevState + 1);
      localStorage.setItem('cart-data', JSON.stringify(updatedCartData));
    }

    status === 'authenticated' ? saveToDatabase() : null;
  };

  const handleDecrementQuantity = (productToEdit: Product) => {
    if (productToEdit.quantity > 1) {
      const updatedCartData = items.map((product: Product) => {
        return product.id === productToEdit.id && product.size === productToEdit.size
          ? {
              ...product,
              quantity: (product.quantity -= 1),
            }
          : product;
      });

      setItems(updatedCartData);
      setTotalPrice((prevState) => prevState - productToEdit.price);
      setAmountOfItems((prevState) => prevState - 1);
      localStorage.setItem('cart-data', JSON.stringify(updatedCartData));
    }

    status === 'authenticated' ? saveToDatabase() : null;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        amountOfItems,
        handleAddItemToCart,
        handleRemoveItemFromCart,
        handleIncrementQuantity,
        handleDecrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
