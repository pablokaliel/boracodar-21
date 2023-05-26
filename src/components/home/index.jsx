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
import { IoCloseSharp } from "react-icons/io5";
import { BsTag } from "react-icons/bs";
import { useState } from "react";

const product = [
  {
    id: 1,
    title:"Monitor Gamer Curvo 49 DQHD, 240Hz, 1ms, HDMI e DisplayPort, HDR 1000, FreeSync Premium, Ajuste de Altura - LC49G95TSSLXZD",
    price: "959.90",
    url: "https://source.unsplash.com/random/?monitor",
  },
  {
    id: 2,
    title: "Cadeira Gamer  RGB - Preta com Iluminação (Led)",
    price: "1002.00",
    url: "https://source.unsplash.com/random/?gamingchair",
  },
  {
    id: 3,
    title: "Teclado Gamer Mecânico Low Profile RGB AW510K 580",
    price: "299.90",
    url: "https://source.unsplash.com/random/?gamingkeyboard/",
  },
  {
    id: 4,
    title:"Headset Sem Fio Logitech Zone Vibe 100, Drivers 40 mm, USB, Bluetooth, PC, Mobile, Grafite - 981-001214",
    price: "530.96",
    url: "https://source.unsplash.com/random/?headset",
  },
  {
    id: 5,
    title: "Soundbar LG SNH5, 4.1 Canais, Bluetooth, 600W RMS, DTS Virtual X, Sound Sync Wireless, USB - SNH5",
    price: "1300.00",
    url: "https://source.unsplash.com/random/?soundbar",
  },
  {
    id: 6,
    title:"iPhone 11 Apple 64GB, Branco, Tela 6.1, Câmera Dupla 12MP, iOS - MHDC3BR/A",
    price: " 2839,99",
    url: "https://source.unsplash.com/random/?iphone",
  },
];

function Home() {

  const [value, setValue] = useState("");
  const [product2, setProduct2] = useState(product);
  const [cartVisible, setCartVisible] = useState(true); // Estado para controlar a visibilidade do carrinho
  const [clickedIncrementButton, setClickedIncrementButton] = useState(null);
  const [clickedDecrementButton, setClickedDecrementButton] = useState(null);

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
          return {
            ...product,
            item: (product.item || 1) + 1,
          };
        }
        return product;
      });
      setClickedIncrementButton(id);
      setClickedDecrementButton(null);
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
      return updatedProduct2;
    });
  };

  const numberList = product2.length;

  return (
    <Container>
      <Cart>
        <HeaderCart>
          <span>
            Seu Carrinho tem <strong>{numberList} Itens</strong>
          </span>
          <button>
            <IoCloseSharp style={{ width: 24, height: 24, color: "white" }} />
          </button>
        </HeaderCart>

        <ItemsCart>
          {product2
            .slice(0, numberList)
            .map(({ id, url, title, price, item }) => {
              return (
                <ContainerItem style={{ display: cartVisible ? "flex" : "none" }} key={id}>
                  <button onClick={() => removeItem(id)} className="close">
                    <IoCloseSharp style={{ width: 20, height: 20, color: "#a855f7ff" }} />
                  </button>
                  <DivImg>
                    <img src={url}  alt="Imagem aleatoria"/>
                  </DivImg>
                  <DivInfo>
                    <span className="title">{title}</span>
                    <DivPrice>
                      <span>R${price}</span>
                      <DivButton>
                        <button onClick={() => decrement(id)}
                          className={ clickedDecrementButton === id ? "purple-button" : ""} > - </button>
                        <span>{item || 1}</span>
                        <button onClick={() => increment(id)}
                          className={ clickedIncrementButton === id ? "purple-button" : ""} > + </button>
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
          <ButtonEnd>Finalizar</ButtonEnd>
        </FooterCart>
      </Cart>
    </Container>
  );
}

export default Home;
