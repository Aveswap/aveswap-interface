import React from 'react'
import { Search as SearchIcon } from 'react-feather'
import { classNames } from '../../functions'

export default function Search({
  term,
  search,
  className = 'bg-dark-900 farm-search-opacity',
  inputProps = {
    className:
      'text-baseline bg-transparent w-full py-3 pl-4 pr-14 rounded w-full bg-transparent focus:outline-none bg-dark-700 rounded focus:ring focus:ring-blue',
  },
  ...rest
}: {
  term: string
  search: (value: string) => void
  inputProps?: any
  className?: string
}) {
  return (
    <div>
      <div className={classNames('relative w-full rounded', className)} {...rest}>
        <input
          className={classNames(
            inputProps.className || 'text-baseline py-3 pl-4 pr-14 rounded w-full bg-transparent focus:outline-none'
          )}
          onChange={(e) => search(e.target.value)}
          value={term}
          placeholder="Search for token symbol or pool address"
          {...inputProps}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pr-6 pointer-events-none">
          <SearchIcon size={16} />
        </div>
        <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis farm-ruler"></div>
      </div>
      <button className="bg-blue bg-opacity-80 rounded text-high-emphesis hover:bg-opacity-100 disabled:bg-opacity-80 px-4 py-3 text-base rounded disabled:cursor-not-allowed focus:outline-none">Search</button>
    </div>
  )
}
