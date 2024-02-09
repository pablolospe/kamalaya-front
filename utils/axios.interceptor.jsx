import axios from "axios"


export const AxiosInterceptor = () => {
    const updateHeader = (request) => {
        const token = '123123123'
        const newHeaders = {
            Authorization: token,
            "Content-Type" : "application/json"
        };
        request.headers = newHeaders
        return request
    }

    axios.interceptors.request.use((request)=>{
        return updateHeader(request)
    })
}