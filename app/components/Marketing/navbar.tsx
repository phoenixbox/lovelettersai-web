import React from 'react'
import { Button } from '~/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Link } from 'react-router'
import { Logo } from './logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from './plus-grid'
import { PRODUCT_NAME } from '~/const/copy'

const links = [{ href: '/login', label: 'Login' }]

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex">
      {links.map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            to={href}
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply hover:bg-black/[2.5%]"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}
    </nav>
  )
}

function MobileNavButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open main menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 py-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className="text-base font-medium text-gray-950"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="absolute left-1/2 w-screen -translate-x-1/2">
          <div className="absolute inset-x-0 top-0 border-t border-black/5" />
          <div className="absolute inset-x-0 top-2 border-t border-black/5" />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <header className="pt-12 sm:pt-16">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <PlusGridItem className="py-3">
              <Link
                to="/"
                title="Home"
                className="flex flex-row items-center gap-2"
              >
                <Logo className="flex-shrink-0" />
                <div className="font-geist text-xl font-semibold tracking-tight text-white dark:text-black">
                  {PRODUCT_NAME}
                </div>
              </Link>
            </PlusGridItem>
            {banner && (
              <div className="relative hidden items-center py-3 lg:flex">
                {banner}
              </div>
            )}
          </div>
          <DesktopNav />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
    </header>
  )
}
