import "./App.css";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import ShowCurrentTime from "./component/ShowCurrentTime";

const App = () => {
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [], balance: "" };
  const [wallet, setWallet] = useState(initialState);


  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
  }
  

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    getProvider();
  }, []);

  const updateWallet = async (accounts, balance) => {
    setWallet({ accounts, balance });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const balance = formatBalance( await window.ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    }));
    updateWallet(accounts, balance);
  };


  return (
    <div className="App">
     

      {hasProvider && <button onClick={handleConnect}>Connect MetaMask</button>}

      {wallet.accounts.length > 0 && (
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>account balance: {wallet.balance}</div>
        </>
      )}
<ShowCurrentTime/>
    </div>
  );
};

export default App;
