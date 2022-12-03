import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AccountInfo } from "@solana/web3.js";
import React, { useState } from "react";
import { getAccountInfoByWeb3 } from "../../utils";

const GetAccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer> | null>();
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const handleGetAccount = async () => {
    if (publicKey) {
      const res = await getAccountInfoByWeb3(publicKey, connection);
      console.log("res", res);
      if (res) setAccountInfo(res);
    }
  };

  return (
    <div>
      <div>
        <div style={{ fontSize: "18px" }}>{accountInfo && "Done"}</div>
      </div>
      <button onClick={handleGetAccount}>Get Account Info</button>
    </div>
  );
};

export default GetAccountInfo;
