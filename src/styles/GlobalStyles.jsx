import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary: transparent;
    --secondary: #3F3F46;
    --background:#09090B;
    --textColor:#fff;
    --backgroundCart:#18181b;
    --buttonColor:#9333ea;
    --buttonHover:#a855f7;
  }

  body {
    background: var(--background);
    color: var(--textColor);
  }

  #root,
  html,
  body {
    width: 100%;
    height: 100%;
    font-family:"Inter"
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

  button {
    cursor:pointer;
  }
`;
