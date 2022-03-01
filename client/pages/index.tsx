import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Header from '../components/Header'
import Swapper from '../components/Swaper'
import Transactions from '../components/Transactions'
import { BounceLoader } from 'react-spinners'
import {
  currentAccountAtom,
  isWalletConnected,
  loadingAtom,
} from '../recoils/web3Atom'

const styles = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2d242f] text-white select -none flex flex-col justify-between p-5`,
  modal: `h-screen w-screen bg-black/50 z-10 text-white flex absolute justify-center items-center`,
}

const Home = () => {
  const setCurrentAccount = useSetRecoilState(currentAccountAtom)
  const isLoading = useRecoilValue(loadingAtom)
  useEffect(() => {
    isWalletConnected(setCurrentAccount)
  }, [])
  return (
    <div>
      {isLoading && (
        <div className={styles.modal}>
          <BounceLoader color="white" size={50} />
        </div>
      )}
      <div className={styles.wrapper}>
        <Header />
        <Swapper />
        <Transactions />
      </div>
    </div>
  )
}

export default Home
