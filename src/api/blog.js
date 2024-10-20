import React from "react";
import axios from "axios";
import { url } from "./domain";
import { prefix } from "./domain";



export const getAllBlogs = async () => {
    try {
        const response = await axios.get(url + "/" + prefix + "/blogs/all");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



export const getShowBlog = async (slug) => {
    try {
        const response = await axios.get(url + "/" + prefix + "/blogs/" + slug);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};