export default defineNuxtPlugin(() => {

  const fetchWithAuth = $fetch.create({
    onRequest({ options }) {
      if (useAuthStore().token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${useAuthStore().token}`,
        }
      }
    },
  })

  return {
    provide: { fetchWithAuth }
  }
})
