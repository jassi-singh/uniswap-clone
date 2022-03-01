import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import Header from '../components/Header'
import Swapper from '../components/Swaper'
import Transactions from '../components/Transactions'
import { currentAccountAtom, isWalletConnected } from '../recoils/web3Atom'

const styles = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2d242f] text-white select -none flex flex-col justify-between p-5`,
}

const Home = () => {
  const setCurrentAccount = useSetRecoilState(currentAccountAtom)
  useEffect(() => {
    isWalletConnected(setCurrentAccount)
  }, [])
  return (
    <div className={styles.wrapper}>
      <Header />
      <Swapper />
      <Transactions />
    </div>
  )
}

export default Home
