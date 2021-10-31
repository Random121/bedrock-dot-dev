import React, { FunctionComponent, Suspense } from 'react'
import fetchHtml from 'lib/html/fetch'
import { useLocale } from 'lib/i18n'

type DocsContentProps = {
  version: string[]
}

const docsContainerClass = 'flex-1 w-0 bg-white dark:bg-dark-gray-900'
const docsContentClass = 'docs-content text-gray-900 dark:text-gray-200 pt-4 pr-5 pl-5 pb-5 lg:max-w-9/10 mx-auto'

const contentCache: { [key: string]: string } = {}

const DocsContent: FunctionComponent<DocsContentProps> = ({ version }) => {
  const locale = useLocale()
  const cacheKey = [locale, ...version].join('/')

  if (!contentCache[cacheKey]) {
    const promise = fetchHtml(version, locale)
      .then((htmlData) => {
        contentCache[cacheKey] = htmlData?.displayHtml ?? 'Failed to load.'
        return contentCache[cacheKey]
      })
    throw promise
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: contentCache[cacheKey] }}
      className={docsContentClass}
    />
  )
}
DocsContent.displayName = 'DocsContent'

type DocsContainerProps = {
  version: string[]
  loading: boolean
}

const DocsContainer: FunctionComponent<DocsContainerProps> = ({ loading, version }) => {
  if (loading) {
    return (
      <div className={docsContainerClass}>
        <div className={docsContentClass}>
          <div className='animate-pulse w-full'>
            <div className='w-4/5 bg-gray-100 dark:bg-dark-gray-800 h-8' />
            <div className='w-2/3 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-10' />
            <div className='w-5/6 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-4/5 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-3/4 bg-gray-100 dark:bg-dark-gray-800 h-s mt-4' />
            <div className='w-2/3 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-2/4 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />

            <div className='w-2/3 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-10' />
            <div className='w-4/5 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-5/6 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-3/4 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-3/4 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-2/3 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />

            <div className='w-3/4 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-10' />
            <div className='w-4/5 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-2/3 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-5/6 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-3/4 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
            <div className='w-2/3 bg-gray-100 dark:bg-dark-gray-800 h-3 mt-4' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={docsContainerClass}>
      <Suspense fallback={'Loading...'}>
        <DocsContent version={version} />
      </Suspense>
    </div>
  )
}

export default DocsContainer
