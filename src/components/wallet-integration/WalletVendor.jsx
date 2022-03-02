import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import React from "react";
import styled from "styled-components";

const Vendor = styled.div`
  background-color: ${(props) =>
    props.bgColor || (props.darkMode ? "#2f2f2f" : "#f8f8ff")};
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.1) 0.5px 0.5px 1px 0.5px;
  cursor: pointer;
  transition: ease-in-out 0.3s;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  :hover {
    transform: scale(1.05);
  }
`;

const VendorContainer = styled.div`
  display: flex;
  width: 83%;
  height: 100%;
  align-items: center;
`;

const VendorName = styled.p`
  color: ${(props) => props.textColor || (props.darkMode ? "white" : "black")};
  font-size: 1.3em;
  text-align: center;
  width: 50%;
`;

const VendorImage = styled.div`
  background-image: url(${(props) => props.vendorImageUrl || ""});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 50%;
  height: 100%;
`;

function WalletVendor(props) {
  const RPC_URLS = {
    1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
    4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
  };

  const { active, account, activate, chainId, deactivate } = useWeb3React();

  //METAMASK
  const metaMask = new InjectedConnector({ supportedChainIds: [1, 4] });

  const walletconnect = new WalletConnectConnector({
    rpc: {
      1: RPC_URLS[1],
      4: RPC_URLS[4],
    },
    qrcode: true,
    pollingInterval: 12000,
    bridge: "https://bridge.walletconnect.org",
  });

  //COINBASE
  const walletlink = new WalletLinkConnector({
    // appLogoUrl:
    //   "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
    appName: "Example",
    darkMode: true,
    supportedChainIds: [1, 4],
    url: "https://rinkeby.infura.io/v3/dca5de49bd1440e091e87a80c3b59398",
  });

  const propmtUser = async () => {
    const vendor = props.vendorName.trim().replace(" ", "");

      if (vendor === "Metamask") await activate(metaMask);
      else if (vendor === "WalletLink") await activate(walletlink);
      else if (vendor === "WalletConnect") await activate(walletconnect);
      else {
        throw new Error("Unsupported vendor was passed");
      }

      props.closeModal(); 
      props.displaySnackBar(); 
 
  
  };

  return (
    <>
    <Vendor onClick={propmtUser} darkMode={props.darkMode}>
      <VendorContainer>
        <VendorImage vendorImageUrl={props.imageUrl} />
        <VendorName darkMode={props.darkMode}>{props.vendorName}</VendorName>
      </VendorContainer>
    </Vendor>
    </>
    
  );
}

export default WalletVendor;
