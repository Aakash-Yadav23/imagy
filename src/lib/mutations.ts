import axios from "axios";
import { CreateUserParams, LoginParams, User } from "@/types";



export const fetchAuthDetails = async () => {
    try {


        const response = await axios.get('/api/me');

        return response.data.user;
    } catch (error) {
        console.error('Error fetching auth details:', error);
        throw error;
    }
};

export const loginUser = async (userData: LoginParams) => {
    const response = await axios.post('/api/login', userData);



    return response.data.message;
};



export const registerUser = async (userData: CreateUserParams) => {

    try {
        const response = await axios.post('/api/register', userData);

        return response;
    } catch (error) {
        console.error('Error Login User:', error);
        throw error;
    }
};



export const logoutUser = async () => {
    try {
        const response = await axios.get('/api/logout');
        return true;

    } catch (error) {
        console.error('Error  Logout User:', error);
        throw error;
    }
};


