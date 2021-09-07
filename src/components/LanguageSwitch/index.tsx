import { Menu, Transition } from '@headlessui/react'

import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { classNames } from '../../functions'
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'

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

export default function LangSwitcher() {
  const { locale, locales, asPath } = useRouter()

  return (
    <Menu as="div" className="relative inline-block text-right">
      {({ open }) => (
        <>
          <Transition
            show={true}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items>
              <div className="p-2">
                {locales.map((locale) => {
                  return (
                    <Menu.Item key={locale}>
                      {({ active }) => (
                        <Link href={asPath} locale={locale}>
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-dark-700 text-high-emphesis' : 'text-primary',
                              'group flex items-center p-2 text-sm hover:bg-dark-700 focus:bg-dark-700 rounded font-bold'
                            )}
                            onClick={() => cookieCutter.set('NEXT_LOCALE', locale)}
                          >
                            <Image
                              className="inline w-3 h-3 mr-1 align-middle"
                              src={`/images/flags/${locale}-flag.png`}
                              width={20}
                              height={20}
                              alt={locale}
                              aria-hidden="true"
                            />
                            <span className="ml-2">{LANG_TO_COUNTRY[locale]}</span>
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  )
                })}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
