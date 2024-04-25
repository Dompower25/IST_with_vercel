import { useAppSelector } from '@root/Hooks/reduxSettings'
import { useQueryBuilder } from '@root/Hooks/useQueryBuilder/useQueryBuilder'
import { TCatalogFiltersList } from '@root/components/catalog/Filters/catalogFilters'
import { TOnCategorySelect } from '@root/components/searchHintsWrapper/searchHintsWrapper'
import { FC } from 'react'
import SearchHintsModal from '../../searchHints/searchHintsModal'

export const HintsModalWrapper: FC<{
  onShowMore: (request: string) => void
  closer: () => void
}> = ({ onShowMore, closer }) => {
  const hintsModal = useAppSelector((modal) => modal.modal.hintsModal)
  const { getQuery, router } = useQueryBuilder<TCatalogFiltersList>()

  const switchFilterHints: TOnCategorySelect = (type, name) => {
    const resetFilters = {} as TCatalogFiltersList
    const newQuery = getQuery({
      ...resetFilters,
      [type]: [name],
    })
    router.push(`./products/?${newQuery}`)
  }

  return (
    <>
      <SearchHintsModal
        state={hintsModal.state}
        targetContainerId={'searchHintsSpace'}
        searchRequest={hintsModal?.searchString ?? ''}
        onShowMore={onShowMore}
        closer={closer}
        onSelectCategory={switchFilterHints}
      />
    </>
  )
}
