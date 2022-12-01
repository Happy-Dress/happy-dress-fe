import axios from 'axios';


const getDataCards=async ()=>{
    try {
        const response = await axios.get('settings');
        return response.data.categories;
    }
    catch (err){
        throw new Error('Error',{ cause:true });
    }


};



export default getDataCards;