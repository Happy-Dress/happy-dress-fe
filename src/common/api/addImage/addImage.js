import axios from 'axios';

const addImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post('images/upload', formData, {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
        },
    })
        .then((r => {
            console.log(r);
            return r;
        }))
        .catch((e) => {
            console.log('error', e);
        });

    return res;
};

export default addImage;
