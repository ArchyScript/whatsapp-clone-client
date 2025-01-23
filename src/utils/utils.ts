export const utils = () => {
  // const userStore = useUserStore();

  const isResponseValid = (code: number) => {
    return code > 199 && code < 300
  }

  return { isResponseValid }
}
export const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split("; ").reduce<Record<string, string>>((acc, cookie) => {
    const [key, value] = cookie.split("=")
    acc[key] = decodeURIComponent(value)
    return acc
  }, {})

  return cookies[name]
}

// helper function to create query parameters from object
export const createQueryParam = (obj: { [id: string]: any }) => {
  if ((obj && !Object.values(obj || {}).length) || !obj) {
    return ""
  }
  return Object.keys(obj || {})
    .map(key => (obj[key] ? encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) : ""))
    .filter(item => item)
    .join("&")
}
