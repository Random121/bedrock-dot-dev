import Log, { logLinkColor } from '../log'

import { RAW_GITHUB_URL, REPO_NAME, REPO_TAG } from './constants'

export function getErrorText(res: Response) {
  try {
    return res.text();
  } catch (err) {
    return res.statusText
  }
}

async function getError(res: Response): Promise<Error> {
  const errorText = await getErrorText(res)
  return new Error(`GitHub raw download error (${res.status}): ${errorText}`)
}

export const getRawFileFromGitHub = async (path: string, locale: string): Promise<string> => {
  const url = RAW_GITHUB_URL + path
  Log.info(`Fetching ${logLinkColor(path)}`)
  const res = await fetch(url)

  if (res.ok) return res.text()
  throw await getError(res)
}

export const getRawFileFromRepo = async (path: string, locale: string) => {
  return getRawFileFromGitHub(`/${REPO_NAME}/${REPO_TAG}/${path}`, locale)
}

export const getDocsFilesFromRepo = async (path: string, locale: string) => {
  return getRawFileFromRepo(path + '.html', locale)
}
