import React, { useState } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import Image from 'next/image'
import ethLogo from '../assets/eth.png'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  currentAccountAtom,
  loadingAtom,
  sendTransaction,
} from '../recoils/web3Atom'

const styles = {
  wrapper: 'flex  justify-center items-center',
  container: 'bg-gray-900 flex flex-col rounded-2xl p-4 ',
  row: 'flex justify-between items-center',
  inputBox: 'p-5 rounded-2xl w-96 bg-gray-800 focus:outline-none',
  button:
    'mt-2 bg-blue-600 p-4 rounded-3xl hover:outline-white outline outline-none hover:outline-1',
  currencySelector:
    'flex rounded-3xl bg-gray-700 items-center p-2 hover:outline-gray-600 outline outline-none',
  amountBox:
    'my-2 px-2 flex justify-space-between items-center rounded-2xl bg-gray-800',
}

const Swapper = () => {
  const [formData, setFormData] = useState({ addressTo: '', amount: '' })
  const setLoading = useSetRecoilState(loadingAtom)
  const currentAccount = useRecoilValue(currentAccountAtom)
  const handleChange = (e: any, name: any) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    console.log(formData)
  }
  const handleSubmit = async (e: any) => {
    const { addressTo, amount } = formData
    e.preventDefault()
    if (!addressTo || !amount) return
    sendTransaction(currentAccount, setLoading, formData)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div>Swap</div>
          <AiFillSetting size={24} />
        </div>
        <div className={styles.amountBox}>
          <input
            onChange={(e) => handleChange(e, 'amount')}
            placeholder="0.0"
            className={styles.inputBox}
          />
          <button className={styles.currencySelector}>
            <Image src={ethLogo} height={20} width={20} />
            &nbsp; Eth &nbsp;
            <MdOutlineKeyboardArrowDown />
          </button>
        </div>
        <div className={styles.amountBox}>
          <input
            onChange={(e) => handleChange(e, 'addressTo')}
            placeholder="0x...."
            className={styles.inputBox}
          />
        </div>
        <button className={styles.button} onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  )
}

export default Swapper
