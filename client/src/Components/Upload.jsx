import React, { useState } from 'react'
import { ProgressBar } from 'react-loader-spinner';
import axios from 'axios';

const Upload = () => {
    const [video, setVideo] = useState(null);
    const [loading, setloading] = useState(false);

    const uploadFile = async (type) => {
        const data = new FormData();
        data.append("file", video);
        data.append('upload_preset', 'videos_preset');

        try {
            let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            let resourceType = 'video';
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            console.log("Uploaded to Cloudinary:", secure_url);
            return secure_url;
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw error;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setloading(true);
            const videoUrl = await uploadFile('video');
            console.log("Sending to backend:", videoUrl);

            // Make sure videoUrl is being sent as request body, not appended to the URL
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/videos`, { videoUrl });
            console.log("Backend response:", res.data);

            setVideo(null);
            setloading(false);
        } catch (error) {
            console.error("Error in handleSubmit:", error);
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

export default Upload;