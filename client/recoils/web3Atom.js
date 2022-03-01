import { atom } from 'recoil'
import { contractABI, contractAddress } from '../lib/constants'
import { ethers } from 'ethers'
import { client } from '../lib/sanityClient';

export const currentAccountAtom = atom({
  key: 'currentAccountAtom',
  default: undefined,
});

export const loadingAtom = atom({
  key: 'loadingAtom',
  default: false,
});

export const connectWallet = async () => {
  let metamask;
  if (typeof window !== 'undefined')
    metamask = window.ethereum;
  try {
    if (!metamask) return alert('Please install metamask')
    const accounts = await metamask.request({ method: 'eth_requestAccounts' })
    console.log(accounts[0]);
    return accounts[0];
  } catch (error) {
    console.log(error);
    throw new Error('No etherium object');
  }
}

export const isWalletConnected = async (setCurrentAccount) => {
  let metamask;
  if (typeof window !== 'undefined')
    metamask = window.ethereum;
  try {
    if (!metamask) return alert('Please install metamask')
    const accounts = await metamask.request({ method: 'eth_accounts' })
    if (accounts.length) {
      console.log('Wallet already connected !!'
      );
      setCurrentAccount(accounts[0]);
      saveUser(accounts[0]);
    }
    console.log(accounts[0]);
    return accounts[0];
  } catch (error) {
    console.log(error);
    throw new Error('No etherium object');
  }
}

const saveUser = async (account) => {
  const userDoc = {
    _type: 'users',
    _id: account,
    username: 'Unnamed',
    address: account,
  }
  await client.createIfNotExists(userDoc);
}

const getEtheriumContract = () => {
  let metamask;
  if (typeof window !== 'undefined')
    metamask = window.ethereum;
  const provider = new ethers.providers.Web3Provider(metamask)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
  return transactionContract;

}

export const sendTransaction = async (currentAccount, setIsLoading, formData) => {
  let metamask;
  if (typeof window !== 'undefined')
    metamask = window.ethereum;
  try {
    if (!metamask) return alert('Please Connect Metamask ');
    const { addressTo, amount } = formData;
    const transactionContract = getEtheriumContract();
    const parsedAmount = ethers.utils.parseEther(amount);

    setIsLoading(true);
    await metamask.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: currentAccount,
          to: addressTo,
          gas: '0x7EF40',
          value: parsedAmount._hex,
        }
      ]
    });

    const transactionHash = await transactionContract.publishTransaction(
      addressTo,
      parsedAmount,
      `Transferring ETH ${parsedAmount} to ${addressTo}`,
      'TRANSFER',
    );

    await transactionHash.wait();

    await saveTransaction(
      transactionHash.hash,
      amount,
      currentAccount,
      addressTo
    );

    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
}

const saveTransaction = async (
  txHash,
  amount,
  fromAddress,
  toAddress,
) => {
  const txDoc = {
    _type: 'transactions',
    _id: txHash,
    fromAddress: fromAddress,
    toAddress: toAddress,
    timestamp: new Date(Date.now()).toISOString(),
    txHash: txHash,
    amount: parseFloat(amount),
  }

  await client.createIfNotExists(txDoc)

  await client
    .patch(fromAddress)
    .setIfMissing({ transactions: [] })
    .insert('after', 'transactions[-1]', [
      {
        _key: txHash,
        _ref: txHash,
        _type: 'reference',
      },
    ])
    .commit()

  return
}