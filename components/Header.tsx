'use client'

import { usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  const pathname = usePathname()
  const isEnglish = pathname.startsWith('/en') || pathname.startsWith('/blog/en/')
  const headerTitle = isEnglish ? "today's vibe" : siteMetadata.headerTitle

  let headerClass =
    'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-8 font-mono'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href={isEnglish ? '/en' : '/'} aria-label={headerTitle}>
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-500 dark:text-green-400">~/</span>
          <span className="ml-1 text-sm text-gray-900 dark:text-gray-100">{headerTitle}</span>
        </div>
      </Link>
      <div className="flex items-center space-x-4 text-xs leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="m-1 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
