import axios from 'axios'
import store from 'store/index'
import { Message,MessageBox} from 'element-ui'
import router from '../router'

const service = axios.create({
    timeout:40000,
    headers:{'X-Requested-With': 'XMLHttpRequest'}
})

const refreshHandle = (action, instance) => {
    if(action === 'confirm'){
        
        window.location.href = "/login";
        // window.location.reload();

        // router.push({
        //     path:'/login'
        // })
    }
}

// response 拦截器    
service.interceptors.response.use(
    response => {
        if(response.headers['sso-timeout']){
            MessageBox({
                title:'提示',
                message: '登录超时，请重新登录',
                type:'error',
                showCancelButton:true,
                callback:refreshHandle
            });
            throw new Error("登录超时，请重新登录");
        }

        return response;
    },
    error => {
        console.log('response error:'+error);
        Message({
            message: error.message,
            type:'error',
            duration: 5*1000
        })
        return Promise.reject(error);
    }
);

export default service
