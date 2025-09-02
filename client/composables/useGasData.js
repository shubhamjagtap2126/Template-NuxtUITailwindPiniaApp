export default async function (methodId, payload = {}, loading) {
  // laodbar ? startLoadingBar() : "";
  try {
    loading ? showLoading() : '';
    const response = await $fetch('/api/gasApi', {
      method: 'POST',
      body: {
        methodId,
        payload,
      },
    });
    // loadbar ? stopLoadingBar() : "";
    loading ? hideLoading() : '';
    // console.log(response);
    if (response.error) {
      showNotify({ msg: `Error. ${response.error}`, color: 'negative' });
      throw createError({ statusCode: 404, statusMessage: response.error });
    }
    return response;
  } catch (error) {
    // loadbar ? stopLoadingBar() : "";
    loading ? hideLoading() : '';
    console.error('Error in useGasData:', error);
    showNotify({ msg: `Error. ${error.statusMessage}`, color: 'negative' });
    throw createError({ statusCode: 404, statusMessage: 'Network Error' });
    // return { error: error.statusMessage };
  }
}
