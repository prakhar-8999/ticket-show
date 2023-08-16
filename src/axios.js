import axios from "axios";

const baseurl = 'http://10.21.83.107:5000/'
// export const baseurl = 'https://a988-103-77-186-10.ngrok-free.app/'

const headers = {
    Authorization: localStorage.getItem("access")
        ? "Bearer " + localStorage.getItem("access")
        : ""
};

const apihit = axios.create({
    baseURL: baseurl,
    headers: headers,
    withCredentials: true,
})

apihit.interceptors.request.use(
    config => {
        const token = localStorage.getItem("access")
        console.log('interceptors')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        // config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        Promise.reject(error)
    }
)

apihit.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error)
        const { status, data } = error.response
        if (status === 409) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.msg,
            });
        }
        if (status === 500) {
            Swal.fire({
                icon: "error",
                title: "Internal Server Error",
                text: "Your Request Could Not Be Processed At The Moment...",
            });
        }
        return Promise.reject(error)
    }
)

export default apihit