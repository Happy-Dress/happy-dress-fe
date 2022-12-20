import axios from 'axios';

const getSettings =async ()=>{
    try {
        const response = await axios.get('settings');
        return response.data;
    }
    catch (err){
        throw new Error('Error',{ cause:true });
    }
};
export default getSettings ;