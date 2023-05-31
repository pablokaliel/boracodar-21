import {
  Container,
  Cart,
  HeaderCart,
  ItemsCart,
  ContainerItem,
  DivImg,
  DivInfo,
  DivPrice,
  DivButton,
  FooterCart,
  SubTotal,
  DivCupom,
  ButtonEnd,
} from "./styles";

import product from "../../data/product";

import { IoCloseSharp } from "react-icons/io5";
import { BsTag, BsCart3 } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function Home() {
  const [discount, setDiscount] = useState("");
  const [product2, setProduct2] = useState(product);
  const [cartVisible, setCartVisible] = useState(false);
  const [clickedIncrementButton, setClickedIncrementButton] = useState(null);
  const [clickedDecrementButton, setClickedDecrementButton] = useState(null);
  const [purpleButtonVisible, setPurpleButtonVisible] = useState(false);
  const [totalPriceQuantify, setTotalPriceQuantify] = useState(0);
  const [discountError, setDiscountError] = useState(false);

  const sumPrices = (product) => {
    let total = product.reduce((acc, product) => {
      return acc + parseFloat(product.price) * (product.item || 1);
    }, 0.0);

    if (!isNaN(discount) && discount !== "") {
      const discountAmount = (total * 0.1).toFixed(2);
      total = (total - discountAmount).toFixed(2);
    }
    return parseFloat(total);
  };

  const handleChange = (event) => {
    setDiscount(event.target.value.toUpperCase());
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
  }, [product2, discount]);

  const HandleFinally = () => {
    if (product2.length === 0) {
      return alert("Para finalizar sua compra, é necessário um ou mais itens.");
    } else {
      let message = `Parabéns pela compra!\nObrigado pela preferência!\n`;
  
      if (!isNaN(discount) && discount !== "") {
        const discountAmount = (totalPriceQuantify * 0.1).toFixed(2);
        const discountedTotal = (totalPriceQuantify - discountAmount).toFixed(2);
        message += `O Cupom aplicado foi: ${discount}\n`;
        message += `Valor do desconto: R$${discountAmount}\n`;
        message += `Sua compra ficou no valor de: R$${totalPriceQuantify}\n`;
      } else {
        const totalPrice = totalPriceQuantify.toFixed(2);
        message += `Sua compra ficou no valor de: R$${totalPrice}`;
      }

      return alert(message);
    }
  };
  

  const numberList = product2.length;

  return (
    <Container>
      {cartVisible ? (
        product2.length === 0 ? (
          <div>
            <Cart style={{ display: cartVisible ? "flex" : "none" }}>
              <HeaderCart>
                <span>
                  Seu Carrinho tem <strong>{numberList} Itens</strong>
                </span>
                <button onClick={toggleCartVisibility}>
                  <IoCloseSharp
                    style={{ width: 24, height: 24, color: "white" }}
                  />
                </button>
              </HeaderCart>

              <ItemsCart>
                <div className="null">
                  <span className="null-text">seu carrinho esta vazio</span>
                </div>
              </ItemsCart>

              <FooterCart>
                <SubTotal>
                  <span>Total:</span>
                  <h1>{totalPriceQuantify}</h1>
                </SubTotal>

                <ButtonEnd onClick={HandleFinally}>Finalizar</ButtonEnd>
              </FooterCart>
            </Cart>
          </div>
        ) : (
          <Cart style={{ display: cartVisible ? "flex" : "none" }}>
            <HeaderCart>
              <span>
                Seu Carrinho tem <strong>{numberList} Itens</strong>
              </span>
              <button onClick={toggleCartVisibility}>
                <IoCloseSharp
                  style={{ width: 24, height: 24, color: "white" }}
                />
              </button>
            </HeaderCart>

            <ItemsCart>
              {product2
                .slice(0, numberList)
                .map(({ id, url, title, price, item }) => {
                  return (
                    <ContainerItem key={id}>
                      <button onClick={() => removeItem(id)} className="close">
                        <IoCloseSharp
                          style={{ width: 20, height: 20, color: "#a855f7ff" }}
                        />
                      </button>
                      <DivImg>
                        <img src={url} alt="Imagem aleatoria" />
                      </DivImg>
                      <DivInfo>
                        <span className="title">{title}</span>
                        <DivPrice>
                          <span>R${price}</span>
                          <DivButton>
                            <button
                              onClick={() => decrement(id)}
                              className={
                                clickedDecrementButton === id
                                  ? purpleButtonVisible
                                    ? "purple-button"
                                    : ""
                                  : ""
                              }
                            >
                              -
                            </button>
                            <span>{item || 1}</span>
                            <button
                              onClick={() => increment(id)}
                              className={
                                clickedIncrementButton === id
                                  ? purpleButtonVisible
                                    ? "purple-button"
                                    : ""
                                  : ""
                              }
                            >
                              +
                            </button>
                          </DivButton>
                        </DivPrice>
                      </DivInfo>
                    </ContainerItem>
                  );
                })}
            </ItemsCart>

            <FooterCart>
              <SubTotal>
                <span>Total:</span>
                <h1>{totalPriceQuantify.toFixed(2)}</h1>
              </SubTotal>
              <DivCupom>
                <BsTag style={{ width: 20, height: 20 }} />
                <input
                  type="text"
                  placeholder="Adicionar Cupom"
                  value={discount}
                  onChange={handleChange}
                  className={discountError ? "error" : ""}
                />
              </DivCupom>
              <ButtonEnd onClick={HandleFinally}>Finalizar</ButtonEnd>
            </FooterCart>
          </Cart>
        )
      ) : (
        <div className="cart-open">
          <span>clique para abrir seu carrinho:</span>
          <button className="open" onClick={toggleCartVisibility}>
            <BsCart3 style={{ width: 24, height: 24 }} />
          </button>
        </div>
      )}
    </Container>
  );
}
