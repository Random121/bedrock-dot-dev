import React, { FunctionComponent, useEffect, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'

import { VersionSelectorProps } from './specific-version-chooser'
import { Tags } from 'lib/tags'

const TagVersionChooser: FunctionComponent<VersionSelectorProps> = ({ tags, setMajor, setMinor }) => {
  const [ version, setVersion ] = useState(Tags.Stable)

  const updateVersion = () => {
    const [ major, minor ] = tags[version]
    unstable_batchedUpdates(() => {
      setMajor(major)
      setMinor(minor)
    })
  }

  useEffect(updateVersion, [ version ])

  return (
    <div className='w-full mb-2'>
      <label className='block text-sm font-bold mb-2' htmlFor='tag'>
        Version
      </label>
      <select id='tag' className='form-select leading-5 w-full' value={version} onChange={({ target: { value } }) => setVersion(value as Tags)}>
        <option value={Tags.Stable}>Stable ({tags.stable[1]})</option>
        <option value={Tags.Beta}>Beta ({tags.beta[1]})</option>
      </select>
    </div>
  )
}

export default TagVersionChooser