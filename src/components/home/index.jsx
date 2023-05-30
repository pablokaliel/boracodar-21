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
import { BsTag } from "react-icons/bs";
import { useState } from "react";

export default function Home() {
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [value, setValue] = useState("");
  const [product2, setProduct2] = useState(product);
  const [cartVisible, setCartVisible] = useState(true); // Estado para controlar a visibilidade do carrinho
  const [clickedIncrementButton, setClickedIncrementButton] = useState(null);
  const [clickedDecrementButton, setClickedDecrementButton] = useState(null);
  const [purpleButtonVisible, setPurpleButtonVisible] = useState(false);

  const sumPrices = (product) => {
    const total = product.reduce((acc, product) => {
      return acc + parseFloat(product.price);
    }, 0);
    return total.toFixed(2);
  };

  const totalPrice = sumPrices(product2);

  const handleChange = (event) => {
    setValue(event.target.value.toUpperCase());
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
      setPurpleButtonVisible(true); // Exibir a classe temporariamente

      setTimeout(() => {
        setPurpleButtonVisible(false); // Remover a classe após 2 segundos (ajuste se necessário)
      }, 240); // Definir a duração desejada em milissegundos (2 segundos no exemplo)

      return updatedProduct2;
    });
  };

  const decrement = (id) => {
    setProduct2((prevProduct2) => {
      const updatedProduct2 = prevProduct2.map((product) => {
        if (product.id === id && product.item) {
          return {
            ...product,
            item: product.item - 1,
          };
        }
        return product;
      });
      setClickedDecrementButton(id);
      setClickedIncrementButton(null);
      setPurpleButtonVisible(true); // Exibir a classe temporariamente

      setTimeout(() => {
        setPurpleButtonVisible(false); // Remover a classe após 2 segundos (ajuste se necessário)
      }, 240); // Definir a duração desejada em milissegundos (2 segundos no exemplo)

      return updatedProduct2;
    });
  };

  const HandleFinally = () => {
    if (numberList === 0) {
      return alert(`Para finalizar sua compra, é necessário um ou mais itens.`);
    } else {
      return alert(
        `Parabéns pela compra!\nO Cupom aplicado foi: ${value}\nSua compra ficou no valor de: R$${totalPrice}\nObrigado pela preferencia!`
      );
    }
  };

  const numberList = product2.length;

  return (
    <Container>
      <Cart>
        <HeaderCart>
          <span>
            Seu Carrinho tem <strong>{numberList} Itens</strong>
          </span>
          <button onClick={toggleCartVisibility}>
            <IoCloseSharp style={{ width: 24, height: 24, color: "white" }} />
          </button>
        </HeaderCart>

        <ItemsCart>
          {product2
            .slice(0, numberList)
            .map(({ id, url, title, price, item }) => {
              return (
                <ContainerItem
                  style={{ display: cartVisible ? "flex" : "none" }}
                  key={id}
                >
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
            <h1>{totalPrice}</h1>
          </SubTotal>
          <DivCupom>
            <BsTag style={{ width: 20, height: 20 }} />
            <input
              type="text"
              placeholder="Adicionar Cupom"
              value={value}
              onChange={handleChange}
              maxLength={6}
            />
          </DivCupom>
          <ButtonEnd onClick={() => HandleFinally()}>Finalizar</ButtonEnd>
        </FooterCart>
      </Cart>
    </Container>
  );
}
