import React from "react";
import axios from "axios";
import { prefix, url } from "../domain";




export const getAllCarBrands = async () => {
    try {
        const response = await axios.get(url + "/" + prefix + "/brand/all?type=car");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllCars = async () => {
    try {
        const response = await axios.get(url + "/" + prefix + "/car/all");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getBrandData = async (slug) => {
    try {
        const response = await axios.get(url + "/" + prefix + "/brand/" + slug);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getCarData = async (slug) => {
    try {
        const response = await axios.get(url + "/" + prefix + "/car/" + slug);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getCarTypes = async (slug) => {
    try {
        const response = await axios.get(url + "/" + prefix + "/car/" + slug);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllCarTypeProducts = async (slug , filter , page) => {
    try {
        const response = await axios.get(url + "/" + prefix + "/product/all?car_type=" + slug + "&" + filter + "&per_page=12&page=" + page);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getAllCarProducts = async (slug , filter , page) => {
    try {
        const response = await axios.get(url + "/" + prefix + "/product/all?car=" + slug + "&" + filter + "&per_page=12&page=" + page);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getAllBrandProducts = async (slug , filter , page) => {
    try {
        const response = await axios.get(url + "/" + prefix + "/product/all?car_brand=" + slug + "&" + filter + "&per_page=12&page=" + page);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getAllCategoryProducts = async (slug , filter , page) => {
    try {
        const response = await axios.get(url + "/" + prefix + "/product/all?cat=" + slug + "&" + filter + "&per_page=12&page=" + page);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getAllPartBrands = async () => {
    try {
        const response = await axios.get(url + "/" + prefix + "/brand/all?type=part");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getAllProductCategories = async () => {
    try {
        const response = await axios.get(url + "/" + prefix + "/category/all");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getCategoryData = async (slug) => {
    try {
        const response = await axios.get(url + "/" + prefix + "/category/" + slug);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};





