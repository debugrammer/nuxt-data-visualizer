import qs from 'qs'

export default ({ store, app: { $axios } }) => {
  $axios.onRequest((config) => {
    config.paramsSerializer = (params) => {
      return qs.stringify(params, { indices: false })
    }
  })
}
