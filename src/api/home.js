import React from "react";
import axios from "axios";
import { url } from "./domain";
import { prefix } from "./domain";



export const getAllCategories = async () => {
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
