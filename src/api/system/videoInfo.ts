import service from "@/api/request";

export const getVideoInfo = (data: any) => {
    return service({
        url: '/api/info',
        method: 'get',
        params: data
    })
}
