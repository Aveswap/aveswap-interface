import { NETWORK_ICON, NETWORK_LABEL } from '../../config/networks'

// import Image from 'next/image'
import NetworkModel from '../../modals/NetworkModal'
// import React from 'react'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
// import { useNetworkModalToggle } from '../../state/application/hooks'

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { classNames } from '../../functions'
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'

// import { NETWORK_ICON, NETWORK_LABEL } from '../../config/networks'
import { useModalOpen, useNetworkModalToggle } from '../../state/application/hooks'
import { ApplicationModal } from '../../state/application/actions'
import { ChainId } from '@aveswapio/sdk'
// import Image from 'next/image'
import Modal from '../../components/Modal'
import ModalHeader from '../../components/ModalHeader'
// import React from 'react'
import cookie from 'cookie-cutter'
// import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'


const LANG_TO_COUNTRY = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  ro: 'Română',
  ru: 'Русский',
  vi: 'Tiếng Việt',
  zh_CN: '简体中文',
  zh_TW: '繁體中文',
  ko: '한국어',
  ja: '日本語',
  fa: 'فارسی',
  pt_BR: 'Português',
  hi: 'हिन्दी',
  es: 'Español',
}

export const SUPPORTED_NETWORKS: {
  [chainId in ChainId]?: {
    chainId: string
    chainName: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
    rpcUrls: string[]
    blockExplorerUrls: string[]
  }
} = {
  [ChainId.MAINNET]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.com'],
  },
  [ChainId.FANTOM]: {
    chainId: '0xfa',
    chainName: 'Fantom',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpcapi.fantom.network'],
    blockExplorerUrls: ['https://ftmscan.com'],
  },
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [ChainId.MATIC]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com'], // ['https://matic-mainnet.chainstacklabs.com/'],
    blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
  },
  [ChainId.HECO]: {
    chainId: '0x80',
    chainName: 'Heco',
    nativeCurrency: {
      name: 'Heco Token',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: ['https://http-mainnet.hecochain.com'],
    blockExplorerUrls: ['https://hecoinfo.com'],
  },
  [ChainId.XDAI]: {
    chainId: '0x64',
    chainName: 'xDai',
    nativeCurrency: {
      name: 'xDai Token',
      symbol: 'xDai',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.xdaichain.com'],
    blockExplorerUrls: ['https://blockscout.com/poa/xdai'],
  },
  [ChainId.HARMONY]: {
    chainId: '0x63564C40',
    chainName: 'Harmony',
    nativeCurrency: {
      name: 'One Token',
      symbol: 'ONE',
      decimals: 18,
    },
    rpcUrls: [
      'https://api.harmony.one',
      'https://s1.api.harmony.one',
      'https://s2.api.harmony.one',
      'https://s3.api.harmony.one',
    ],
    blockExplorerUrls: ['https://explorer.harmony.one/'],
  },
  [ChainId.AVALANCHE]: {
    chainId: '0xA86A',
    chainName: 'Avalanche',
    nativeCurrency: {
      name: 'Avalanche Token',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network'],
  },
  [ChainId.OKEX]: {
    chainId: '0x42',
    chainName: 'OKEx',
    nativeCurrency: {
      name: 'OKEx Token',
      symbol: 'OKT',
      decimals: 18,
    },
    rpcUrls: ['https://exchainrpc.okex.org'],
    blockExplorerUrls: ['https://www.oklink.com/okexchain'],
  },
  [ChainId.ARBITRUM]: {
    chainId: '0xA4B1',
    chainName: 'Arbitrum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://mainnet-arb-explorer.netlify.app'],
  },
  [ChainId.CELO]: {
    chainId: '0xA4EC',
    chainName: 'Celo',
    nativeCurrency: {
      name: 'Celo',
      symbol: 'CELO',
      decimals: 18,
    },
    rpcUrls: ['https://forno.celo.org'],
    blockExplorerUrls: ['https://explorer.celo.org'],
  },
  [ChainId.PALM]: {
    chainId: '0x2A15C308D',
    chainName: 'Palm',
    nativeCurrency: {
      name: 'Palm',
      symbol: 'PALM',
      decimals: 18,
    },
    rpcUrls: ['https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267'],
    blockExplorerUrls: ['https://explorer.palm.io'],
  },
}

function Web3Network(): JSX.Element | null {
  const { chainId, library, account } = useActiveWeb3React()
  const { locale, locales, asPath } = useRouter()
  // const { chainId } = useActiveWeb3React()

  const toggleNetworkModal = useNetworkModalToggle()

  if (!chainId) return null

  return (
    <Menu as="div" className="relative inline-block text-right">
      {({ open }) => (
        <>

          <div>
            <Menu.Button className="flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
              <div className="grid items-center grid-flow-col px-3 py-2 space-x-2 text-sm rounded-lg pointer-events-auto auto-cols-max bg-dark-1000 text-secondary">
                <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded-md" width="22px" height="22px" />
                <div className="text-primary">{NETWORK_LABEL[chainId]}</div>
                <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
              </div>
            </Menu.Button>
          </div>
       {/*   <div
            className="flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto"
            onClick={() => toggleNetworkModal()}
          >
            <div className="grid items-center grid-flow-col px-3 py-2 space-x-2 text-sm rounded-lg pointer-events-auto auto-cols-max bg-dark-1000 text-secondary">
              <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded-md" width="22px" height="22px" />
              <div className="text-primary">{NETWORK_LABEL[chainId]}</div>
              <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
            </div>
          </div>*/}

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-[max-content] mt-2 origin-top-right divide-y divide-dark-600 rounded shadow-lg bg-dark-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div>
                {[
                  ChainId.MAINNET,
                  // ChainId.MATIC,
                  // ChainId.FANTOM,
                  // ChainId.ARBITRUM,
                  // ChainId.OKEX,
                  // ChainId.HECO,
                  ChainId.BSC,
                  // ChainId.XDAI,
                  // ChainId.HARMONY,
                  // ChainId.AVALANCHE,
                  // ChainId.CELO,
                  // ChainId.PALM,
                ].map((key: ChainId, i: number) => {
                  if (chainId === key) {
                    return (
                      <button key={i} className="w-full col-span-1 p-px rounded from-blue to-pink">
                        <div className="flex items-center w-full h-full p-3 space-x-3 rounded bg-dark-1000">
                          <Image
                            src={NETWORK_ICON[key]}
                            alt={`Switch to ${NETWORK_LABEL[key]} Network`}
                            className="rounded-md"
                            width="32px"
                            height="32px"
                          />
                          <div className="font-bold text-primary">{NETWORK_LABEL[key]}</div>
                        </div>
                      </button>
                    )
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        toggleNetworkModal()
                        const params = SUPPORTED_NETWORKS[key]
                        cookie.set('chainId', key)
                        if (key === ChainId.MAINNET) {
                          library?.send('wallet_switchEthereumChain', [{ chainId: '0x1' }, account])
                        } else {
                          library?.send('wallet_addEthereumChain', [params, account])
                        }
                      }}
                      className="flex items-center w-full col-span-1 p-3 space-x-3 rounded cursor-pointer hover:bg-dark-700"
                    >
                      <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width="32px" height="32px" />
                      <div className="font-bold text-primary">{NETWORK_LABEL[key]}</div>
                    </button>
                  )
                })}
                {/* {['Clover', 'Telos', 'Optimism'].map((network, i) => (
                  <button
                    key={i}
                    className="flex items-center w-full col-span-1 p-3 space-x-3 rounded cursor-pointer bg-dark-800 hover:bg-dark-700"
                  >
                    <Image
                      src="/images/tokens/unknown.png"
                      alt="Switch Network"
                      className="rounded-md"
                      width="32px"
                      height="32px"
                    />
                    <div className="font-bold text-primary">{network} (Coming Soon)</div>
                  </button>
                ))} */}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default Web3Network
