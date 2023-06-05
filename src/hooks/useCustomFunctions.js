import { useState, useEffect } from "react";

export function useCustomFunctions(product) {
  const [discount, setDiscount] = useState("");
  const [product2, setProduct2] = useState(product);
  const [cartVisible, setCartVisible] = useState(false);
  const [clickedIncrementButton, setClickedIncrementButton] = useState(null);
  const [clickedDecrementButton, setClickedDecrementButton] = useState(null);
  const [purpleButtonVisible, setPurpleButtonVisible] = useState(false);
  const [totalPriceQuantify, setTotalPriceQuantify] = useState(0);
  const [discountError, setDiscountError] = useState(false);
  const [numDigits, setNumDigits] = useState(0);

  const sumPrices = (product) => {
    let total = product.reduce((acc, product) => {
      return acc + parseFloat(product.price) * (product.item || 1);
    }, 0.0);

    if (numDigits >= 3 && !isNaN(discount) && discount !== "") {
      const discountAmount = (total * 0.1).toFixed(2);
      total = (total - discountAmount).toFixed(2);
    }
    return parseFloat(total);
  };

  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    setDiscount(value);
    const regex = /[0-9]/g;
    const digits = value.match(regex);
    setNumDigits(digits ? digits.length : 0);
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  const removeItem = (id) => {
    setProduct2((prevProduct2) => {
      const updatedProduct2 = prevProduct2.filter(
        (product) => product.id !== id
      );
      return updatedProduct2;
    });
  };

  const increment = (id) => {
    setProduct2((prevProduct2) => {
      const updatedProduct2 = prevProduct2.map((product) => {
        if (product.id === id) {
          const newItemValue = (product.item || 1) + 1;
          if (newItemValue === 6) {
            alert("O valor máximo por compra foi atingido!");
            return product; // Retorna o produto sem atualizar a quantidade
          }
          return {
            ...product,
            item: newItemValue,
          };
        }
        return product;
      });
      setClickedIncrementButton(id);
      setClickedDecrementButton(null);
      setPurpleButtonVisible(true);
      setTimeout(() => {
        setPurpleButtonVisible(false);
      }, 240);
      return updatedProduct2;
    });
  };

  const decrement = (id) => {
    setProduct2((prevProduct2) => {
      const updatedProduct2 = prevProduct2.map((product) => {
        if (product.id === id && product.item) {
          const newItemValue = product.item - 1;
          return {
            ...product,
            item: newItemValue,
          };
        }
        return product;
      });
      setClickedDecrementButton(id);
      setClickedIncrementButton(null);
      setPurpleButtonVisible(true);
      setTimeout(() => {
        setPurpleButtonVisible(false);
      }, 240);
      return updatedProduct2;
    });
  };

  useEffect(() => {
    const totalPriceQuantify = sumPrices(product2);
    setTotalPriceQuantify(totalPriceQuantify);
  }, [product2, discount, numDigits]);

  const handleFinally = () => {
    if (product2.length === 0) {
      return alert("Para finalizar sua compra, é necessário um ou mais itens.");
    } else {
      let message = `Parabéns pela compra!\nObrigado pela preferência!\n`;
  
      const totalPrice = totalPriceQuantify.toFixed(2);
  
      if (numDigits >= 3 && !isNaN(discount) && discount !== "") {
        const discountAmount = (totalPrice * 0.1).toFixed(2);
        message += `O Cupom aplicado foi: ${discount}\n`;
        message += `Valor do desconto: R$${discountAmount}\n`;
        message += `Sua compra ficou no valor de: R$${totalPrice}\n`;
      } else {
        message += `Sua compra ficou no valor de: R$${totalPrice}`;
      }
  
      return alert(message);
    }
  };
  

  const numberList = product2.length;

  return {
    discount,
    product2,
    cartVisible,
    clickedIncrementButton,
    clickedDecrementButton,
    purpleButtonVisible,
    totalPriceQuantify,
    discountError,
    handleChange,
    toggleCartVisibility,
    removeItem,
    increment,
    decrement,
    handleFinally,
    numberList,
  };
}