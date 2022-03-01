import Image from 'next/image'
import React, { useState } from 'react'
import uniswapLogo from '../assets/uniswap.png'
import ethLogo from '../assets/eth.png'
import { HiDotsHorizontal } from 'react-icons/hi'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import clsx from 'clsx'
import { useRecoilState } from 'recoil'
import { connectWallet, currentAccountAtom } from '../recoils/web3Atom'

enum NavItems {
  swap = 'Swap',
  vote = 'Vote',
  chart = 'Chart',
  pool = 'Pool',
}

const styles = {
  wrapper: `flex justify-between items-center`,
  nav: `flex rounded-3xl bg-gray-900 `,
  navItem: `flex py-2 px-4 rounded-3xl items-center text-gray-400`,
  activeNavItem: 'bg-gray-700 outline outline-2 outline-gray-900 text-gray-100',
  actionItems: 'flex items-center',
  button:
    'rounded-3xl flex bg-gray-900 items-center mx-2 outline outline-gray-900 hover:outline-gray-600',
  buttonPadding: 'py-2 px-4',
  buttonAccent: `bg-[#172A42] hover:bg-[#163256]`,
}

const Header = () => {
  const [activeItem, setActiveItem] = useState(NavItems.swap)

  const [currentAccount, setCurrentAccount] =
    useRecoilState<any>(currentAccountAtom)

  return (
    <div className={styles.wrapper}>
      <div>
        <Image src={uniswapLogo} height={40} width={40} />
      </div>

      <div className={styles.nav}>
        <button
          onClick={() => setActiveItem(NavItems.swap)}
          className={clsx(styles.navItem, {
            [styles.activeNavItem]: activeItem === NavItems.swap,
          })}
        >
          {NavItems.swap}
        </button>
        <button
          onClick={() => setActiveItem(NavItems.pool)}
          className={clsx(styles.navItem, {
            [styles.activeNavItem]: activeItem === NavItems.pool,
          })}
        >
          {NavItems.pool}
        </button>
        <button
          onClick={() => setActiveItem(NavItems.vote)}
          className={clsx(styles.navItem, {
            [styles.activeNavItem]: activeItem === NavItems.vote,
          })}
        >
          {NavItems.vote}
        </button>
        <button
          onClick={() => setActiveItem(NavItems.chart)}
          className={clsx(styles.navItem, {
            [styles.activeNavItem]: activeItem === NavItems.chart,
          })}
        >
          {NavItems.chart}
        </button>
      </div>

      <div className={styles.actionItems}>
        <button className={`${styles.button}  ${styles.buttonPadding}`}>
          <Image src={ethLogo} height={20} width={20} />
          &nbsp; Etherium &nbsp;
          <MdOutlineKeyboardArrowDown />
        </button>
        <button
          onClick={async () => setCurrentAccount(await connectWallet())}
          className={`${styles.button} ${styles.buttonAccent} ${styles.buttonPadding}`}
        >
          {currentAccount
            ? `${currentAccount.substr(0, 4)}...${currentAccount.substr(37)}`
            : 'Connect Wallet'}
        </button>
        <button className={`${styles.button} ${styles.buttonPadding}`}>
          <HiDotsHorizontal />
        </button>
      </div>
    </div>
  )
}

export default Header
