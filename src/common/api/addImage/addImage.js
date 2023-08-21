import axios from 'axios';

const addImage = async (file) => {
    const formData = new FormData();
    formData.append('files', file);
    const res = await axios.post('secure/images/upload', formData, {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
        },
    });

    return res.data;
};

export default addImage;
