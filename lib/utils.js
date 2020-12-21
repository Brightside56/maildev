'use strict'

const utils = module.exports = {}

// Create an unique id, length 8 characters
utils.makeId = function () {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 8; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function lookup (obj, path) {
  const parts = path.split('.')
  const base = obj[parts[0]]
  if (!base) return
  if (parts.length === 1) {
    return base
  }
  const next = parts.slice(1).join('.')
  if (Array.isArray(base)) {
    return base.map((el) => {
      return lookup(el, next)
    })
  } else {
    return lookup(base, next)
  }
}

utils.filterEmails = function (emails, query) {
  return emails.filter((email) => {
    const hits = []
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key]
        const value = lookup(email, key)
        if (Array.isArray(value)) {
          hits.push(value.includes(element))
        } else {
          hits.push(value === element)
        }
      }
    }
    return !hits.includes(false)
  })
}
