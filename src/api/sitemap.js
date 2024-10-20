import React from "react";
import axios from "axios";
import { url } from "./domain";
import { prefix } from "./domain";



export const getSitemMap = async () => {
    try {
        const response = await axios.get("https://panel.girpazh.com/sitemap.xml");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSitemMapCars = async () => {
    try {
        const response = await axios.get("https://panel.girpazh.com/sitemap-cars");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSitemMapCategories = async () => {
    try {
        const response = await axios.get("https://panel.girpazh.com/sitemap-categories");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSitemMapProducts = async () => {
    try {
        const response = await axios.get("https://panel.girpazh.com/sitemap-products");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSitemMapBlogs = async () => {
    try {
        const response = await axios.get("https://panel.girpazh.com/sitemap-blogs");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSitemMapBrands = async () => {
    try {
        const response = await axios.get("https://panel.girpazh.com/sitemap-brands");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


