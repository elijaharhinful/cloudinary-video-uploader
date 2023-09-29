import React, { useState } from 'react'
import { ProgressBar } from 'react-loader-spinner';
import axios from 'axios';

const SecureUpload = () => {
    const [video, setVideo] = useState(null);
    const [loading, setloading] = useState(false);

    const uploadFile = async (type,timestamp, signature) => {
        const data = new FormData();
        data.append("file", video);
        data.append("timestamp", timestamp);
        data.append("signature",signature);
        data.append("api_key",import.meta.env.VITE_CLOUDINARY_API_KEY)

        try {
            let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            let resourceType = 'video';
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            console.log(secure_url);
        } catch (error) {
            console.log(error);
        }
    }

    const getSignatureForUpload = async(folder) =>{
      try{
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/sign-upload`, {folder});
        return res.data;
      } catch(error){
        console.log(error)
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setloading(true);
            const videoUrl = await uploadFile('video',timestamp, videoSignature)

            // Get signature for video upload
            const {timestamp: videoTimestamp, signature: videoSignature} = await getSignatureForUpload('videos');

            // Backend api request
            await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/videos`, { videoUrl });

            setVideo(null);

            console.log('file upload successful')
            setloading(false);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='video'>Video:</label>
                    <br></br>
                    <input type="file"
                        accept="video/*"
                        id="video"
                        onChange={(e) => setVideo((preve) => e.target.files[0])} />
                </div>
                <button type='submit'>Upload</button>
            </form>
            {
                loading && <ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor='#F4442E'
                    barColor='#51E5FF'
                />
            }
        </div>

    )
}

export default SecureUpload;