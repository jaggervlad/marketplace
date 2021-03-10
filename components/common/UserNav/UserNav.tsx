import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { Heart, Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import s from './UserNav.module.css'
import { Avatar } from '@components/common'
import DropdownMenu from './DropdownMenu'

interface Props {
  className?: string
}

const countItem = (count: number, item: any) => count + item.quantity
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const data = false
  const customer = false
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  // const itemsCount = Object.values(data?.line_items ?? {}).reduce(countItems, 0)

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li className={s.item} onClick={toggleSidebar}>
            <Bag />
            Aca van los items del carrito
            {/* {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>} */}
          </li>
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
          <li className={s.item}>
            {customer ? (
              <DropdownMenu />
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
