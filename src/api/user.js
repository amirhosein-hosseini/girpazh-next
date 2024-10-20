import React from "react";
import axios from "axios";
import { getCookie } from "./auth";
import { prefix, url } from "./domain";


export const getUserInfo = async () => {

    const token = getCookie("token");
  
  
  
    try {
      const response = await axios.get(url + "/" + prefix + '/user/info',{
        headers:{
          'Authorization' : 'Bearer ' + token,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
};


export const getUserChassis = async () => {

  const token = getCookie("token");



  try {
    const response = await axios.get(url + "/" + prefix + '/user/chassis/get',{
      headers:{
        'Authorization' : 'Bearer ' + token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getUserCart = async () => {

  const token = getCookie("token");



  try {
    const response = await axios.get(url + "/" + prefix + '/cart/get',{
      headers:{
        'Authorization' : 'Bearer ' + token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getAllUserAddresses = async () => {

  const token = getCookie("token");



  try {
    const response = await axios.get(url + "/" + prefix + '/user/address/get',{
      headers:{
        'Authorization' : 'Bearer ' + token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getAllCarriers = async () => {

  const token = getCookie("token");



  try {
    const response = await axios.get(url + "/" + prefix + '/cart/carriers',{
      headers:{
        'Authorization' : 'Bearer ' + token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getAllUserOrders = async () => {

  const token = getCookie("token");



  try {
    const response = await axios.get(url + "/" + prefix + '/user/getPays',{
      headers:{
        'Authorization' : 'Bearer ' + token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getGateWay = async () => {

  const token = getCookie("token");



  try {
    const response = await axios.get(url + "/" + prefix + '/order/add',{
      headers:{
        'Authorization' : 'Bearer ' + token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};