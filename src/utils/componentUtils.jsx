import React from 'react'

export function drawElements ({ shouldUseDefaultClasses, classes, content, defaultClasses }) {
  return content
    ? <div className={`col-12 ${classes} ${shouldUseDefaultClasses && defaultClasses}`}>{content}</div>
    : ''
}

