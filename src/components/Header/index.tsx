import { ChainId, Currency, NATIVE, SUSHI_ADDRESS } from '@aveswapio/sdk'
import { Feature, featureEnabled } from '../../functions/feature'
import React, { useEffect, useState } from 'react'

import { ANALYTICS_URL } from '../../constants'
import Buy from '../../features/on-ramp/ramp'
import ExternalLink from '../ExternalLink'
import Image from 'next/image'
import LanguageSwitch from '../LanguageSwitch'
import Link from 'next/link'
import More from './More'
import NavLink from '../NavLink'
import { Popover } from '@headlessui/react'
import QuestionHelper from '../QuestionHelper'
import Web3Network from '../Web3Network'
import Web3Status from '../Web3Status'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useETHBalances } from '../../state/wallet/hooks'
import { useLingui } from '@lingui/react'
import { useDarkModeManager } from '../../state/user/hooks'

// import { ExternalLink, NavLink } from "./Link";
// import { ReactComponent as Burger } from "../assets/images/burger.svg";

function AppBar(): JSX.Element {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  let className = 'inline-connect';
  if (account && chainId) {
    className += ' nav-connect-button';
  }

  return (
    //     // <header className="flex flex-row justify-between w-screen flex-nowrap">
    <header className="flex-shrink-0 w-full">
      <Popover as="nav" className="z-10 w-full bg-transparent">
        {({ open }) => (
          <>
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center nav-spacing">
                  {darkMode ? <Image src="/logo_dark.svg" alt="Aveswap" width="32px" height="32px" /> : <Image src="/logo.svg" alt="Aveswap" width="32px" height="32px" />}
                </div>
                <div className="flex items-center hidden sm:block sm:ml-4 nav-buttons">
                  <div className="flex">
                    {/* <Buy /> */}
                    <NavLink href="/swap">
                      <a
                        id={`swap-nav-link`}
                        className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                      >
                        {i18n._(t`Swap`)}
                      </a>
                    </NavLink>
                    <NavLink href="/pool">
                      <a
                        id={`pool-nav-link`}
                        className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                      >
                        {i18n._(t`Pool`)}
                      </a>
                    </NavLink>
                    {/*{chainId && featureEnabled(Feature.MIGRATE, chainId) && (
                      <NavLink href={'/migrate'}>
                        <a
                          id={`migrate-nav-link`}
                          className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                        >
                          {i18n._(t`Migrate`)}
                        </a>
                      </NavLink>
                    )}*/}
                    {chainId && featureEnabled(Feature.LIQUIDITY_MINING, chainId) && (
                      <NavLink href={'/farm'}>
                        <a
                          id={`farm-nav-link`}
                          className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                        >
                          {i18n._(t`Farm`)}
                        </a>
                      </NavLink>
                    )}
                    {/*{chainId && featureEnabled(Feature.KASHI, chainId) && (
                      <>
                        <NavLink href={'/lend'}>
                          <a
                            id={`lend-nav-link`}
                            className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                          >
                            {i18n._(t`Lend`)}
                          </a>
                        </NavLink>
                        <NavLink href={'/borrow'}>
                          <a
                            id={`borrow-nav-link`}
                            className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                          >
                            {i18n._(t`Borrow`)}
                          </a>
                        </NavLink>
                      </>
                    )}*/}
                    {/*{chainId && featureEnabled(Feature.STAKING, chainId) && (
                      <NavLink href={'/stake'}>
                        <a
                          id={`stake-nav-link`}
                          className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                        >
                          {i18n._(t`Stake`)}
                        </a>
                      </NavLink>
                    )}*/}
                  </div>
                </div>
                <div className="fixed bottom-0 left-0 z-10 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-dark-1000 lg:relative lg:p-0 lg:bg-transparent nav-spacing">
                  <div className="flex items-center justify-between w-full space-x-2 sm:justify-end">
                    {/*{chainId && [ChainId.MAINNET].includes(chainId) && library && library.provider.isMetaMask && (
                      <>
                        <QuestionHelper text={i18n._(t`Add xAVE to your MetaMask wallet`)}>
                          <div
                            className="hidden p-0.5 rounded-md cursor-pointer sm:inline-flex bg-dark-900 hover:bg-dark-800"
                            onClick={() => {
                              if (library && library.provider.isMetaMask && library.provider.request) {
                                const params: any = {
                                  type: 'ERC20',
                                  options: {
                                    address: '0x8798249c2e607446efb7ad49ec89dd1865ff4272',
                                    symbol: 'XAVE',
                                    decimals: 18,
                                    image:
                                      'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272/logo.png',
                                  },
                                }
                                library.provider
                                  .request({
                                    method: 'wallet_watchAsset',
                                    params,
                                  })
                                  .then((success) => {
                                    if (success) {
                                      console.log('Successfully added XAVE to MetaMask')
                                    } else {
                                      throw new Error('Something went wrong.')
                                    }
                                  })
                                  .catch(console.error)
                              }
                            }}
                          >
                            <Image
                              src="/images/tokens/xsushi-square.jpg"
                              alt="xAVE"
                              width="38px"
                              height="38px"
                              objectFit="contain"
                              className="rounded-md"
                            />
                          </div>
                        </QuestionHelper>
                      </>
                    )}

                    {chainId && chainId in SUSHI_ADDRESS && library && library.provider.isMetaMask && (
                      <>
                        <QuestionHelper text={i18n._(t`Add AVE to your MetaMask wallet`)}>
                          <div
                            className="hidden rounded-md cursor-pointer sm:inline-flex bg-dark-900 hover:bg-dark-800 p-0.5"
                            onClick={() => {
                              const params: any = {
                                type: 'ERC20',
                                options: {
                                  address: SUSHI_ADDRESS[chainId],
                                  symbol: 'AVE',
                                  decimals: 18,
                                  image:
                                    'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2/logo.png',
                                },
                              }
                              if (library && library.provider.isMetaMask && library.provider.request) {
                                library.provider
                                  .request({
                                    method: 'wallet_watchAsset',
                                    params,
                                  })
                                  .then((success) => {
                                    if (success) {
                                      console.log('Successfully added AVE to MetaMask')
                                    } else {
                                      throw new Error('Something went wrong.')
                                    }
                                  })
                                  .catch(console.error)
                              }
                            }}
                          >
                            <Image
                              src="/images/tokens/sushi-square.jpg"
                              alt="AVE"
                              width="38px"
                              height="38px"
                              objectFit="contain"
                              className="rounded-md"
                            />
                          </div>
                        </QuestionHelper>
                      </>
                    )}*/}
                    <div className={className}>
                      {library && library.provider.isMetaMask && (
                        <div>
                          <Web3Network />
                        </div>
                      )}

                      <div className="w-auto flex items-center rounded p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto network-button">
                        {account && chainId && userEthBalance && (
                          <>
                            <div className="px-3 py-1.5 text-primary text-bold hidden sm:inline-block network-button">
                              {userEthBalance?.toSignificant(4)} {NATIVE[chainId].symbol}
                            </div>
                          </>
                        )}
                        <Web3Status />
                      </div>
                      {/*<div className="hidden md:block">
                        <LanguageSwitch />
                      </div>*/}
                    </div>
                    <More />
                  </div>
                </div>
              </div>
            </div>

            <Popover.Panel className="sm:hidden">
              <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
                <Link href={'/swap'}>
                  <a
                    id={`swap-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                  >
                    {i18n._(t`Swap`)}
                  </a>
                </Link>
                <Link href={'/pool'}>
                  <a
                    id={`pool-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                  >
                    {i18n._(t`Pool`)}
                  </a>
                </Link>

                {/*<Link href={'/migrate'}>
                  <a
                    id={`migrate-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                  >
                    {i18n._(t`Migrate`)}
                  </a>
                </Link>*/}

                {/*{chainId && featureEnabled(Feature.LIQUIDITY_MINING, chainId) && (
                  <Link href={'/farm'}>
                    <a
                      id={`farm-nav-link`}
                      className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                    >
                      {' '}
                      {i18n._(t`Farm`)}
                    </a>
                  </Link>
                )}*/}

                {/*{chainId && featureEnabled(Feature.KASHI, chainId) && (
                  <>
                    <Link href={'/lend'}>
                      <a
                        id={`lend-nav-link`}
                        className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                      >
                        {i18n._(t`Lend`)}
                      </a>
                    </Link>

                    <Link href={'/borrow'}>
                      <a
                        id={`borrow-nav-link`}
                        className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                      >
                        {i18n._(t`Borrow`)}
                      </a>
                    </Link>
                  </>
                )}*/}

                {/*{chainId && featureEnabled(Feature.STAKING, chainId) && (
                  <Link href={'/stake'}>
                    <a
                      id={`stake-nav-link`}
                      className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                    >
                      {i18n._(t`Stake`)}
                    </a>
                  </Link>
                )}*/}
                <div onClick={() => toggleDarkMode()}>
                  <div>{darkMode ? <span>Light Theme</span> : <span>Dark Theme</span>}</div>
                  {/*{darkMode ? <Moon opacity={0.6} size={16} /> : <Sun opacity={0.6} size={16} />}*/}
                </div>

                {/*{chainId && featureEnabled(Feature.ANALYTICS, chainId) && (
                  <ExternalLink
                    id={`analytics-nav-link`}
                    href={ANALYTICS_URL[chainId] || 'https://analytics.avewsap.io'}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                  >
                    {i18n._(t`Analytics`)}
                  </ExternalLink>
                )}*/}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </header>
  )
}

export default AppBar
