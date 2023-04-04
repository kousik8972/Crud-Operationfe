import React, { Component } from 'react';
import Configuration from "./../Configuration/Configuration";
import Axios from "./AxiosServices";


const axios = new Axios();
//const Config = new Configuration();

export default class CrudServices {
   
    CreateRecord(data){
        console.log('data :' + data+ 'Url : '+Configuration.CreateRecord);
        return axios.post(Configuration.CreateRecord, data, false)
    }

    ReadRecord(){
        console.log("Url :", Configuration.GetRecord);
        return axios.get(Configuration.GetRecord,false);
    }

    UpdateRecord(data){
       console.log("Url : ", Configuration.UpdateRecord)
       return axios.put(Configuration.UpdateRecord, data, false);
    }

    DeleteRecord(data){
        console.log("Url : ", Configuration.DeleteRecord)
        return axios.delete(Configuration.DeleteRecord, {data:{id:data.id}}, false)
    }
}

