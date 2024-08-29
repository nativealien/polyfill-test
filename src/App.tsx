import { TezosToolkit } from '@taquito/taquito'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { NetworkType } from "@airgap/beacon-dapp";
import './App.css'
import { useState } from 'react';

function App() {
  const [tezKey, setTezKey] = useState<any>(null)

  const Tezos = new TezosToolkit("https://ghostnet.smartpy.io")
  const loadWallet = async () => {
        const newWallet = new BeaconWallet({ name: "PolyTest",
                                             network: {
                                                 type: NetworkType.GHOSTNET }})
        await newWallet.requestPermissions().then( async () => {
            Tezos.setWalletProvider(newWallet)
            const pkh = await Tezos.wallet.pkh(); 
            setTezKey(pkh)
          })
  }

  return <div className="app">
    <h1>Poly Fills</h1>

    <button style={{
      height: "50px",
      width: "150px"}}
      onClick={ () =>
        loadWallet()
      }>Connect Tezos</button>
      {tezKey && <p>{tezKey}</p>}


  </div>
}

export default App
