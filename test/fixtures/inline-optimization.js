/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

function isUnusedDisableDirectiveError(message) {
  return (
    !message.fatal &&
    !message.ruleId &&
    message.message.includes("eslint-disable")
  )
}

module.exports = (messages) => {
  for (let i = messages.length - 1; i >= 0; --i) {
    const message = messages[i]
    if (!isUnusedDisableDirectiveError(message)) {
      continue
    }
    console.log(message)
  }
}
