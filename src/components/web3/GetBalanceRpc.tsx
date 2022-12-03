import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { getBalanceUsingJSONRPC } from "../../utils";

const GetBalanceRpc = () => {
  const [balance, setBalance] = useState(0);
  const { publicKey } = useWallet();

  const getBalance = async () => {
    if (publicKey) {
      const res = await getBalanceUsingJSONRPC(publicKey.toString());
      setBalance(res);
    }
  };

  return (
    <div>
      <div>Current balance: {balance}</div>
      <button onClick={getBalance}>Get Balance by RPC</button>
    </div>
  );
};

export default GetBalanceRpc;
