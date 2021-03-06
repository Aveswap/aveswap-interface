import { Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

import ExternalLink from '../ExternalLink'
import { I18n } from '@lingui/core'
import Image from 'next/image'
import { classNames } from '../../functions/styling'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useDarkModeManager } from '../../state/user/hooks'

const items = (i18n: I18n) => [
  {
    name: i18n._(t`About`),
    href: 'https://docs.avewsap.io',
  },
  {
    name: i18n._(t`Code`),
    href: 'https://github.com/Aveswap',
  },
  // {
  //   name: i18n._(t`Language`),
  //   href: '/tools',
  // },
  // {
  //   name: i18n._(t`Light Theme`),
  //   href: '#',
  // },
]

export default function Menu() {
  const { i18n } = useLingui()
  const solutions = items(i18n)
  const [darkMode, toggleDarkMode] = useDarkModeManager()

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className={classNames(open ? 'text-secondary' : 'text-primary', 'focus:outline-none')}>
            <Image
              src="/menu.svg"
              title="More"
              className={classNames(
                open ? 'text-gray-600' : 'text-gray-400',
                'inline-flex items-center ml-2 h-5 w-5 group-hover:text-secondary hover:text-high-emphesis'
              )}
              alt="More"
              width={20}
              height={20}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-10 w-screen max-w-xs px-2 mt-3 transform -translate-x-full bottom-12 lg:top-12 left-full sm:px-0"
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 px-5 py-6 bg-dark-900 sm:gap-8 sm:p-8">
                  {solutions.map((item) => (
                    <ExternalLink
                      key={item.name}
                      href={item.href}
                      className="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-dark-800"
                    >
                      <p className="text-base font-medium text-high-emphesis">{item.name}</p>
                    </ExternalLink>
                  ))}
                  <div onClick={() => toggleDarkMode()}>
                    <div>{darkMode ? <span>Light Theme</span> : <span>Dark Theme</span>}</div>
                    {/*{darkMode ? <Moon opacity={0.6} size={16} /> : <Sun opacity={0.6} size={16} />}*/}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
