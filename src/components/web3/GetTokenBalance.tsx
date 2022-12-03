import { getAssociatedTokenAddress } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  AccountInfo,
  ParsedAccountData,
  PublicKey,
  TokenAmount,
} from "@solana/web3.js";
import React, { useState } from "react";
import { getTokenAccountBalanceByWeb3 } from "../../utils";

const GetTokenBalance = () => {
  const [tokenAmount, setTokenAmount] = useState<TokenAmount>();
  const [mintAddress, setMintAddress] = useState("");

  const { connection } = useConnection();
  const wallet = useWallet();

  const handleGetTokenBalance = async () => {
    const targetMintAddress = new PublicKey(mintAddress);
    if (targetMintAddress && wallet.publicKey) {
      const ata = await getAssociatedTokenAddress(
        targetMintAddress,
        wallet.publicKey
      );

      const res = await getTokenAccountBalanceByWeb3(ata, connection);
      if (res) setTokenAmount(res);
    }
  };

  return (
    <div>
      <div>
        Mint Address
        <div style={{ fontSize: "12px" }}>
          {tokenAmount && JSON.stringify(tokenAmount)}
        </div>
      </div>
      <input type="text" onChange={(e) => setMintAddress(e.target.value)} />
      <button onClick={handleGetTokenBalance}>Get Token Amount</button>
    </div>
  );
};

export default GetTokenBalance;
