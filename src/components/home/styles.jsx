import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: end;
`;
export const Cart = styled.div`
  width: 428px;
  display: flex;
  flex-direction: column; /* Adicione essa propriedade para que os elementos dentro de Cart sejam empilhados verticalmente */

  background-color: #18181b;
  position: relative;
`;

export const HeaderCart = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;

  button {
    background-color: transparent;
    outline: none;
    border: none;
  }

  span {
    font-size: 20px;
    color: #e4e4e7;

    strong {
      color: #f9fafb;
    }
  }
`;

export const ItemsCart = styled.div`
  flex: 1; /* Alteração: Ocupar todo o espaço disponível */
  overflow-y: auto; /* Alteração: Adicionar barra de rolagem vertical */
  padding: 32px;

  position: relative;
  border-top: 1px solid #3f3f46;
  transition: all 0.3s;

  .close {
    position: absolute;
    top: 0;
    right: 0;

    background-color: transparent;
    outline: none;
    border: none;
  }
`;

export const ContainerItem = styled.div`
  display: flex;
  gap: 24px;
  height: 105px;

  margin-top: 48px;
  position: relative;
  z-index: 1;

  .close {
    position: absolute;
    top: 0;
    right: 0;

    background-color: transparent;
    outline: none;
    border: none;
  }
`;

export const DivImg = styled.div`
  width: 110px;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;

  background-color: white;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const DivInfo = styled.div`
  width: 100%;

  .title {
    width: 195px;
  }

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    text-overflow: ellipsis; /* Propriedades adicionais para outros navegadores */
    display: -moz-box;
    -moz-line-clamp: 2;
    -moz-box-orient: vertical; /* Propriedade padrão para navegadores compatíveis */
    line-clamp: 2;
  }
`;

export const DivPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export const DivButton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .purple-button {
    background-color: #a955f7;
  }

  button {
    width: 40px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1.5px solid #3f3f46;
    color: white;
    filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1));
    border-radius: 8px;
    background-color: transparent;

    &:hover {
      border: 1.5px solid #a855f7;
    }
  }
`;

export const FooterCart = styled.div`
  height: 224px;
  width: 100%;
  padding: 32px;
  border-top: 1px solid #3f3f46;

  position: relative;
  bottom: 0;
  z-index: 3;
`;

export const SubTotal = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 20px;
  h1 {
    font-size: 20px;
  }
`;

export const DivCupom = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;

  margin-top: 16px;
  color: #a855f7;

  input {
    width: 100px;

    outline: none;
    border: none;
    background-color: transparent;
    color: #a855f7;

    &::placeholder {
      color: #a855f7;
    }
    &:focus {
      border-bottom: 1px solid #a855f7;
    }
  }
`;

export const ButtonEnd = styled.button`
  width: 364px;
  height: 64px;
  margin-top: 32px;

  border: none;
  color: white;
  background: #9333ea;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  transition: all 0.3s;

  &:hover {
    background: #a855f7;
  }
`;
