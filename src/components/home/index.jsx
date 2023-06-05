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
import { AiOutlineLoading } from "react-icons/ai";
import { BsTag, BsCart3 } from "react-icons/bs";
import { useCustomFunctions } from "../../hooks/useCustomFunctions";
import { useState } from "react";

export default function Home() {
  const [isLoading, setLoading] = useState(false);

  const handleFinalizeClick = () => {
    setLoading(true);
    // Realize quaisquer ações necessárias

    // Simule uma operação assíncrona
    setTimeout(() => {
      // Realize quaisquer ações pós-finalização
      setLoading(false);

      // Chame a função de finalização aqui
      handleFinally();
    }, 2000);
  };

  const {
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
  } = useCustomFunctions(product);

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

                <ButtonEnd onClick={handleFinally}>Finalizar</ButtonEnd>
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
                          <span>R$ {price}</span>
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
              <ButtonEnd onClick={handleFinalizeClick}>
                {isLoading ? (
                  <>
                    <AiOutlineLoading
                      style={{ width: 20, height: 20 }}
                      className="loading-icon"
                    />{" "}
                    Finalizando...
                  </>
                ) : (
                  "Finalizar"
                )}
              </ButtonEnd>
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
