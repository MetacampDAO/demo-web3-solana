import { useWallet } from "@solana/wallet-adapter-react";
import "./App.css";
import GetBalanceWeb3 from "./components/web3/GetBalanceWeb3";
import GetBalanceRpc from "./components/web3/GetBalanceRpc";
import GetAccountInfo from "./components/web3/GetAccountInfo";
import GetParsedTokenByOwner from "./components/web3/GetParsedTokenByOwner";
import GetTokenBalance from "./components/web3/GetTokenBalance";
import TransferLamports from "./components/web3/TransferLamports";
import CreateMint from "./components/spl/CreateMint";
import { useState } from "react";
import CreateTokenAccount from "./components/spl/CreateTokenAccount";

function App() {
  const { publicKey } = useWallet();
  const [mint, setMint] = useState();

  return (
    <div className="App">
      {publicKey && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "12px 0",
          }}
        >
          {/* <GetBalanceRpc /> */}
          {/* <GetBalanceWeb3 /> */}
          {/* <GetAccountInfo /> */}
          {/* <GetParsedTokenByOwner /> */}
          {/* <GetTokenBalance /> */}
          {/* <TransferLamports /> */}
          {/*  */}
          <CreateMint mint={mint} setMint={setMint} />
          <CreateTokenAccount mint={mint} />
        </div>
      )}
    </div>
  );
}

export default App;
