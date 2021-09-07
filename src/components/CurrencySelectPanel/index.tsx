import React, { useCallback, useState } from 'react'

import { ChevronDownIcon } from '@heroicons/react/outline'
import { Currency } from '@aveswapio/sdk'
import CurrencyLogo from '../CurrencyLogo'
import CurrencySearchModal from '../../modals/SearchModal/CurrencySearchModal'
import Lottie from 'lottie-react'
import selectCoinAnimation from '../../animation/select-coin.json'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useLingui } from '@lingui/react'

interface CurrencySelectPanelProps {
  onClick?: () => void
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}

export default function CurrencySelectPanel({
  onClick,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencySelectPanelProps) {
  const { i18n } = useLingui()

  const [modalOpen, setModalOpen] = useState(false)
  const { chainId } = useActiveWeb3React()

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <div id={id} className="p-5 rounded bg-dark-800">
      <div className="flex flex-col justify-between space-y-3 sm:space-y-0 sm:flex-row">
        <div className="w-full" onClick={onClick}>
          <div
            className="items-center h-full text-xl font-medium border-none outline-none cursor-pointer select-none"
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <div className="flex">
              {currency ? (
                <div className="flex items-center bg-dark-900 currency-select">
                  <CurrencyLogo currency={currency} size={'24px'} />
                    <div className="flex flex-col items-start justify-center mx-3.5">
                      <div className="flex items-center">
                        <div className="mr-1 text-lg font-bold md:text-2xl">
                          {(currency && currency.symbol && currency.symbol.length > 20
                            ? currency.symbol.slice(0, 4) +
                              '...' +
                              currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                            : currency?.symbol) || (
                            <div className="px-4 py-2 mt-1 text-xl font-medium bg-blue border rounded-full border-low-emphesis text-secondary whitespace-nowrap">
                              {i18n._(t`Select a token`)}
                              <ChevronDownIcon
                                className={`${currency ? 'text-primary' : 'text-high-emphesis'} stroke-current chervon-down`}
                                width={16}
                                height={16}
                              />
                            </div>
                          )}
                        </div>
                        {!disableCurrencySelect && currency && (
                          <ChevronDownIcon
                            className={`${currency ? 'text-primary' : 'text-high-emphesis'} stroke-current`}
                            width={16}
                            height={16}
                          />
                        )}
                      </div>
                    </div>
                </div>
              ) : (
                <div className="px-2 py-1 mt-1 text-xs font-medium bg-transparent border rounded-full hover:bg-primary border-low-emphesis text-secondary whitespace-nowrap select-token-button flex items-center">
                  {i18n._(t`Select a token`)}
                  <ChevronDownIcon width={16} height={16} className="ml-2 stroke-current" />
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </div>
  )
}
