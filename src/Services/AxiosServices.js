const Axios = require('axios').default

export default class AxiosServices {

    post(url, data, Header){
        return Axios.post(url, data, Header);
    }

    get(url, IsRequired=false, Header){

        return Axios.get(url, IsRequired && Header);

    }

    put(url, data, IsRequired = false,  Header){
        return Axios.put(url, data, IsRequired && Header);
    }

    delete(url, data, IsRequired = false, Header){
        return Axios.delete(url, data, IsRequired && Header);
    }
}
