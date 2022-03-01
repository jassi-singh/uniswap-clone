import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { client } from '../lib/sanityClient'
import { currentAccountAtom, loadingAtom } from '../recoils/web3Atom'
import Image from 'next/image'
import ethLogo from '../assets/ethCurrency.png'
import { FiArrowUpRight } from 'react-icons/fi'

const styles = {
  wrapper: `flex flex-col items-end max-h-48 overflow-auto`,
  transaction: `bg-black m-2 rounded-xl p-2 opacity-80 text-sm flex items-center max-w-fit`,
  details: `px-2`,
  toAddress: `text-yellow-400 pr-2 `,
  link: `flex px-3 text-blue-400`,
}

const Transactions = () => {
  const [transactionsList, setTransactionsList] = useState<any[]>([])
  const isLoading = useRecoilValue(loadingAtom)
  const currentAccount = useRecoilValue(currentAccountAtom)
  useEffect(() => {
    ;(async () => {
      if (!isLoading && currentAccount) {
        const query = `*[_type=="users" && _id == "${currentAccount}"]{
          "transactionList": transactions[]->{amount,toAddress,timestamp,txHash}|order(timestamp desc)[0..4]
        }`
        const clientRes = await client.fetch(query)

        setTransactionsList(clientRes[0].transactionList)
      }
    })()
  }, [isLoading, currentAccount])
  return (
    <div className={styles.wrapper}>
      {transactionsList &&
        transactionsList?.map((transaction, index) => {
          return (
            <div key={index} className={styles.transaction}>
              <Image src={ethLogo} height={20} width={20}></Image>
              <span className={styles.details}>
                {transaction.amount} 𝝣 sent to
              </span>
              <span className={styles.toAddress}>
                {transaction.toAddress.substring(0, 6)}...
              </span>
              on&nbsp;
              <span>
                {new Date(transaction.timestamp).toLocaleString('en-US', {
                  hour12: true,
                })}
              </span>
              <a
                href={`https://rinkeby.etherscan.io/tx/${transaction.txHash}`}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                View on Etherscan
                <FiArrowUpRight />
              </a>
            </div>
          )
        })}
    </div>
  )
}

export default Transactions
