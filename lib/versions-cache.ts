import type { BedrockVersionsFile } from './versions'

import Log from './log'

let cachedResponse: BedrockVersionsFile | null = null

// store ratelimited call as a file and fetch when needed
const checkCache = (): BedrockVersionsFile | undefined => {
  // get from the hard file in production to not use the api during runtime
  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    const docsContent = require('../public/static/docs.json')
    if (docsContent) return docsContent
    else Log.error('Could not load docs content from cache!')
  } else {
    if (!!cachedResponse) return cachedResponse
  }
}

const setCache = (files: BedrockVersionsFile) => {
  console.log('setting cache')
  cachedResponse = files
}

export { setCache, checkCache }
