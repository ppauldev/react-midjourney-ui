export const getPercentage = (action: "blur" | "focus" | "keypress", email: string) => {
  const emailValidRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (action === "keypress") {
    if (email) {
      if (email.length === 1) {
        // Case: First letter
        return 15
      }

      if (email.length > 1 && !email.includes("@")) {
        // Case: Follow up letter, left side of address
        return 35
      }

      if (email.length > 1 && email.includes("@") && !email.match(emailValidRegex)) {
        // Case: Follow up letter, right side of address
        return 55
      }

      if (email.match(emailValidRegex)) {
        // Case: Valid email in input
        return 80
      }
    } else {
      // Case: User removes all letters in focused input
      return 0
    }
  }

  if (action === "focus") {
    if (email) {
      // Case: Refocus, do not change current percentage
      return undefined
    } else {
      // Case: Initial focus input
      return 0
    }
  }

  if (action === "blur") {
    if (email) {
      // Case: Blur with filled input
      return undefined
    } else {
      // Case: Initial load
      // Case: Blur without input value
      // Note: Hide circular progress in this case -> differentiation between undefined and null used for that
      return null
    }
  }

  // Case: Unknown, default is to not trigger a re-rendering
  return undefined
}