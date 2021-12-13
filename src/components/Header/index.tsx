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
                <div className="fixed bottom-0 right-0 z-10 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-dark-1000 lg:relative nav-buttons p-4">
                  <div className="flex">
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
                  </div>
                </div>
                <div className="flex items-center block sm:ml-4 nav-spacing">
                  <div className="flex items-center w-full space-x-2 justify-end">
                    <div className={className}>
                      {library && library.provider.isMetaMask && (
                        <div>
                          <Web3Network />
                        </div>
                      )}

                      <div className="w-auto flex items-center rounded p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto network-button">
                        {account && chainId && userEthBalance && (
                          <>
                            <div className="px-3 py-1.5 text-primary text-bold network-button">
                              {userEthBalance?.toSignificant(4)} {NATIVE[chainId].symbol}
                            </div>
                          </>
                        )}
                        <Web3Status />
                      </div>
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
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </header>
  )
}

export default AppBar
