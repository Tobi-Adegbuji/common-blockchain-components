import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { useState } from "react";
import styled from "styled-components";
import "./App.css";
import WalletModal from "./components/wallet-integration/WalletModal";

function App() {

const EthComponents = styled.div`
  display: flex;
  margin-top: 40px;
  width: 50%;
  flex-direction: column;
  align-items: center; 
  margin-left: auto;
  margin-right: auto;
`;

  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
      <EthComponents>
        <WalletModal darkMode={false} />
      </EthComponents>
    </Web3ReactProvider>
  );
}

export default App;
