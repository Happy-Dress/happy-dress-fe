import axios from 'axios';

const addImage = async (files) => {
    const formData = new FormData();
    for(const file of Object.values(files)){
        formData.append('files', file);
    }
    const res = await axios.post('secure/images/upload-cloud-storage', formData, {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
        },
    });

    return res.data;
};

export default addImage;
