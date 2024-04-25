import React, { FC, useEffect, useState } from 'react'
import styles from './categoryHints.module.scss'
import { ICategoryHints } from './ICategoryHints'
import { ISTHintCategory } from './ISTHint'

const ISTCategoryHints: FC<ICategoryHints> = ({
  hintsLimit,
  hintsList: hints,
  hintsCategoryCollection,
}) => {
  const [categoryCollection, setCategoryCollection] = useState(hints)

  useEffect(() => {
    setCategoryCollection(hints)
  }, [hints])

  return hintsCategoryCollection && hints && hintsLimit ? (
    <div className={styles.search_results}>
      {hintsCategoryCollection.map((hint) => {
        return (
          <div
            key={`results_${hint.collectionName}`}
            className={styles.result_container}
          >
            {categoryCollection[hint?.listedHintsId]?.length > 0 ? (
              <div className={styles.result_title_name}>
                {hint.collectionName}
              </div>
            ) : null}

            <ISTHintCategory
              listedHintsId={hint.listedHintsId}
              switcherOptions={hint.switcherOptions}
              hintsList={categoryCollection}
              hintsLimit={hintsLimit}
            />
          </div>
        )
      })}
    </div>
  ) : null
}

export default ISTCategoryHints
