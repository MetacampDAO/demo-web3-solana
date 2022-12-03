import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { createAtaTx, createMintToTx } from "../../utils";

const CreateTokenAccount = ({ mint }: any) => {
  const [ataBalance, setAtaBalance] = useState<number>(0);
  const [ataCreated, setAtaCreated] = useState(false);
  const [mintAmount, setMintAmount] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleCreateTokenAccount = async () => {
    const associatedToken = await getAssociatedTokenAddress(
      new PublicKey(mint),
      wallet.publicKey!
    );

    await createAtaTx(wallet, new PublicKey(mint), connection);
    const tokenAccountInfo = await getAccount(connection, associatedToken);

    setAtaBalance(Number(tokenAccountInfo.amount));
    setAtaCreated(true);
  };

  const handleMintToTokenAccount = async () => {
    const associatedToken = await getAssociatedTokenAddress(
      new PublicKey(mint),
      wallet.publicKey!
    );

    await createMintToTx(wallet, new PublicKey(mint), mintAmount, connection);
    const tokenAccountInfo = await getAccount(connection, associatedToken);

    setAtaBalance(Number(tokenAccountInfo.amount));
  };

  return (
    <div>
      <div>
        {ataCreated
          ? `Token Account Initalized, Current Balance: ${ataBalance}`
          : "Click to Create Token Account"}
      </div>
      <button onClick={handleCreateTokenAccount}>Create Token Account</button>
      <div>
        <input type="number" onChange={(e) => setMintAmount(+e.target.value)} />
        <button onClick={handleMintToTokenAccount}>Mint {mintAmount}</button>
      </div>
    </div>
  );
};

export default CreateTokenAccount;
