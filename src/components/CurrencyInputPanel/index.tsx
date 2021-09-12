import { Currency, CurrencyAmount, Pair, Percent, Token } from '@aveswapio/sdk'
import React, { ReactNode, useCallback, useState } from 'react'
import { classNames, formatCurrencyAmount } from '../../functions'

import Button from '../Button'
import { ChevronDownIcon } from '@heroicons/react/outline'
import CurrencyLogo from '../CurrencyLogo'
import CurrencySearchModal from '../../modals/SearchModal/CurrencySearchModal'
import DoubleCurrencyLogo from '../DoubleLogo'
import { FiatValue } from './FiatValue'
import Input from '../Input'
import Lottie from 'lottie-react'
import selectCoinAnimation from '../../animation/select-coin.json'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useLingui } from '@lingui/react'

interface CurrencyInputPanelProps {
  value?: string
  onUserInput?: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  fiatValue?: CurrencyAmount<Token> | null
  priceImpact?: Percent
  id: string
  showCommonBases?: boolean
  renderBalance?: (amount: CurrencyAmount<Currency>) => ReactNode
  locked?: boolean
  customBalanceText?: string
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = '',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  otherCurrency,
  id,
  showCommonBases,
  renderBalance,
  fiatValue,
  priceImpact,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  locked = false,
  customBalanceText,
}: CurrencyInputPanelProps) {
  const { i18n } = useLingui()
  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <div id={id} className={classNames(hideInput ? 'p-3' : 'p-4', 'rounded bg-dark-800 swap-currency-input')}>
      <div className="flex flex-col justify-between space-y-3 sm:space-y-0 sm:flex-row">
        <div className={classNames('w-full sm:w-2/5')}>
          <button
            type="button"
            className={classNames(
              !!currency ? 'text-primary' : 'text-high-emphesis',
              'open-currency-select-button h-full outline-none select-none cursor-pointer border-none text-xl font-medium items-center'
            )}
            onClick={() => {
              if (onCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <div className="flex">
              {pair ? (
                <div className="bg-dark-900 currency-select">
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={24} margin={true} />
                  <span
                    className={classNames(
                      'pair-name-container',
                      Boolean(currency && currency.symbol) ? 'text-2xl' : 'text-xs'
                    )}
                  >
                    {pair?.token0.symbol}:{pair?.token1.symbol}
                  </span>
                </div>
              ) : currency ? (
                <div className="flex items-center bg-dark-900 currency-select">
                  <CurrencyLogo currency={currency} size={'24px'} />
                    <div className="flex flex-1 flex-col items-start justify-center mx-3.5">
                    {label && <div className="text-xs font-medium text-secondary whitespace-nowrap">{label}</div>}
                    <div className="flex items-center">
                      <div className="text-lg font-bold token-symbol-container">
                        {(currency && currency.symbol && currency.symbol.length > 20
                          ? currency.symbol.slice(0, 4) +
                            '...' +
                            currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                          : currency?.symbol) || (
                          <div className="px-2 py-1 mt-1 text-xs font-medium bg-transparent border rounded-full hover:bg-primary border-low-emphesis text-secondary whitespace-nowrap select-token-button flex items-center">
                            {i18n._(t`Select a token`)}
                            <ChevronDownIcon width={16} height={16} className="ml-2 stroke-current" />
                          </div>
                        )}
                      </div>

                      {!disableCurrencySelect && currency && (
                        <ChevronDownIcon width={16} height={16} className="ml-2 stroke-current" />
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
          </button>
          {!hideInput && (
            <>
              {/*{showMaxButton && selectedCurrencyBalance && (
                <Button
                  onClick={onMax}
                  size="xs"
                  className="text-xs font-medium bg-transparent border rounded-full hover:bg-primary border-low-emphesis text-secondary whitespace-nowrap"
                >
                  {i18n._(t`Max`)}
                </Button>
              )}*/}
              {!hideBalance && currency && selectedCurrencyBalance ? (
                <div className="flex flex-col">
                  <div onClick={onMax} className="text-xs font-medium text-right cursor-pointer text-low-emphesis balance-text">
                    {renderBalance ? (
                      renderBalance(selectedCurrencyBalance)
                    ) : (
                      <>
                        {i18n._(t`Balance:`)} {formatCurrencyAmount(selectedCurrencyBalance, 4)} {currency.symbol}
                      </>
                    )}
                  </div>
                  <FiatValue fiatValue={fiatValue} priceImpact={priceImpact} />
                </div>
              ) : null}
            </>
          )}
        </div>
        
        {!hideInput && (
          <div
            className={classNames(
              'flex items-center w-full space-x-3 rounded focus:bg-dark-700 p-3 sm:w-3/5 amount-input'
              // showMaxButton && selectedCurrencyBalance && 'px-3'
            )}
          >
            <>
              <Input.Numeric
                id="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
            </>
          </div>
        )}
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
