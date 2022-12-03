import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { getBalanceUsingWeb3 } from "../../utils";

const GetBalanceWeb3 = () => {
  const [balance, setBalance] = useState(0);
  const { publicKey } = useWallet();

  const getBalance = async () => {
    if (publicKey) {
      const res = await getBalanceUsingWeb3(publicKey);
      setBalance(res);
    }
  };

  return (
    <div>
      <div>Current balance: {balance}</div>
      <button onClick={getBalance}>Get Balance by Web3</button>
    </div>
  );
};

export default GetBalanceWeb3;
