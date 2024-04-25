import {
  Children,
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import styles from './baseHeader.module.scss'
import menu from '@root/public/menu.svg'
import closer from '@root/public/closer.svg'
import { mobileTrigger_size } from '@root/components/UI/common'
import Image from 'next/image'
import { MobileHeaderItem } from '../mobileHeaderItem/mobileHeaderItem'

export type THeaderNavigationItem = {
  onClick: (prop: string, id: number) => void
  title: string
  property: string

  // icon?: string
  isActive?: boolean
  selectionState?: boolean
}

type THeaderLogo = {
  default: string
  mobile?: string
  action: () => void
}

interface IBaseHeader {
  logo: THeaderLogo
  children?: ReactNode

  headerSize: {
    size: number
    parentRef: MutableRefObject<HTMLDivElement>
    headerBottomGap?: number
  }

  currentNavItemId?: number
  navigationItems: THeaderNavigationItem[][]
  mobileTriggerSize: mobileTrigger_size
}

const refWarnMessage =
  'The header component of the publications ' +
  "layout lacks a parent's reference in its props! " +
  'Also, ensure that you have set the ' +
  'reference to the target object'

export const BaseHeader: FC<IBaseHeader> = ({
  headerSize,
  navigationItems,
  children,
  mobileTriggerSize,
  logo,
}) => {
  const [menuState, setMenuState] = useState<boolean>(false)

  useEffect(() => {
    const ref = headerSize?.parentRef
    const headerHeight = headerSize?.size
    const bottomGap = headerSize?.headerBottomGap || 15

    if (!ref || !ref.current || !headerHeight) {
      console.warn(refWarnMessage)
      return
    }
    headerSize.parentRef.current.style.paddingTop = `${headerHeight + bottomGap}px`
  }, [headerSize])

  return (
    <>
      <div
        className={`${styles.pubHeader}`}
        style={{
          height: headerSize.size,
        }}
      >
        <div className={`header-container p-0 ${styles.headerContainer}`}>
          <div className={`${styles.logo} logo_${mobileTriggerSize}`}>
            <button
              className={`${styles.mobileLogo} ${styles[`mobileLogo_${mobileTriggerSize}`]}`}
              onClick={logo?.action}
            >
              <Image
                src={logo?.mobile || ''}
                alt="IST-MOBILE-LOGO"
                fill
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                  padding: '3px',
                }}
              />
            </button>

            <button
              className={`${styles.defaultLogo} ${styles[`defaultLogo_${mobileTriggerSize}`]}`}
              onClick={logo?.action}
            >
              <Image
                src={logo?.default || ''}
                alt="IST-DEF-LOGO"
                fill
                style={{
                  objectFit: 'contain',
                  objectPosition: 'left',
                  padding: '3px',
                }}
              />
            </button>
          </div>

          <div
            className={`${styles.headerContent} ${styles[`headerContent_${mobileTriggerSize}`]}`}
          >
            {children}
          </div>

          <div
            className={`${styles.mobileMenuButtonWrapper} ${styles[`menuButtonWrapper_${mobileTriggerSize}`]}`}
          >
            <button
              className={`${styles.menuButton}`}
              onClick={() => {
                setMenuState(!menuState)
              }}
            >
              <Image
                src={menuState ? closer : menu}
                alt="IST-MENU"
                width={20}
                height={20}
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                  padding: menuState ? '2.25px' : 0,
                }}
              />
            </button>
          </div>
        </div>

        <div
          className={`${styles.mobileMenuWrapper} ${menuState ? styles.active : ''}`}
        >
          <div className={styles.mobileMenuContainer}>
            {navigationItems
              ? navigationItems.map((row, ri) =>
                  row ? (
                    <div
                      key={`header_nav_row_${ri}`}
                      className={styles.headerNavRow}
                    >
                      {row.map((item, ii) =>
                        item ? (
                          <MobileHeaderItem
                            id={ii}
                            key={`header_nav_item_${ri}_${ii}`}
                            selectionState={item.selectionState}
                            isActive={item.isActive}
                            onClick={item.onClick}
                            title={item.title}
                            property={item.property}
                          />
                        ) : null,
                      )}
                    </div>
                  ) : null,
                )
              : null}
          </div>
        </div>
      </div>
    </>
  )
}
