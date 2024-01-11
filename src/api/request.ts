import Axios from 'axios'
import type {AxiosResponse} from 'axios'

export const baseURL = import.meta.env.VITE_BASE_AXIOS_URL as string

export const CONTENT_TYPE = 'Content-Type'

export const APPLICATION_JSON = 'application/json; charset=utf-8'

const service = Axios.create({
    baseURL,
    timeout: 10 * 60 * 1000,
})


service.interceptors.request.use(
    (config) => {
        config.headers[CONTENT_TYPE] = APPLICATION_JSON
        return config
    },
    (error) => {
        return Promise.reject(error.response)
    }
)

service.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        const data = response.data
        return data
    },
    (error) => {
        if (import.meta.env.MODE === 'development') {
            console.log(error)
        }
        return Promise.reject({code: 500, msg: '服务器异常，请稍后重试…'})
    }
)

export default service
