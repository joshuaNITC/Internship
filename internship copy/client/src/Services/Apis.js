import {commonrequest} from "./ApiCall"
import {BASE_URL} from "./helper"

// now we'll create our api
export const registerfunc = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header);
}

export const usergetfunc = async(search,gender,status,sort)=>{
    return await commonrequest("GET",`${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}`,"");
}

export const singleUsergetfunc = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/user/${id}`,"")
}

export const editfunc = async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header);
}

export const deletefunc=async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/user/delete/${id}`,{})
}