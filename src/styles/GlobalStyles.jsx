import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #09090B;
    color: #fff;
  }

  #root,
  html,
  body {
    width: 100%;
    height: 100%;
    font-family:"Inter"
  }

  #root,
  html,
  body {
    width: 100%;
    height: 100%;
  }

  :root {
    --primary: #09090B;
    --secondary: #3F3F46;
  }

  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: var(--primary);
    border-radius: 6px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--secondary);
    border-radius: 14px;
  }

`;
