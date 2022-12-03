import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AccountInfo, ParsedAccountData, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { getParsedTokenAccountByWeb3 } from "../../utils";

const GetParsedTokenByOwner = () => {
  const [tokenAccountsInfo, setTokenAccountsInfo] = useState<
    {
      pubkey: PublicKey;
      account: AccountInfo<ParsedAccountData>;
    }[]
  >();

  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const handleGetParsedTokenAccount = async () => {
    if (publicKey) {
      const res = await getParsedTokenAccountByWeb3(publicKey, connection);
      // res.splice(3, res.length);
      console.log("getParsedTokenAccountByWeb3", res);
      if (res) setTokenAccountsInfo(res);
    }
  };

  return (
    <div>
      <div>
        <div style={{ fontSize: "18px" }}>{tokenAccountsInfo && "DONE"}</div>
      </div>
      <button onClick={handleGetParsedTokenAccount}>
        Get Parsed Token Accounts
      </button>
    </div>
  );
};

export default GetParsedTokenByOwner;
