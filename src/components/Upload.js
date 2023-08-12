
import React, {useState} from 'react';
import {Auth} from "aws-amplify";
import axios from "axios";
import Loader from "./Loader";

const Upload = () => {
    const [file, setFile] = useState(null)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        //console.log(e.target.files[0])
        setFile(e.target.files[0]);
    }

    const uploadFile = async ()=>{
        setLoading(true)
        const user = await Auth.currentAuthenticatedUser();
        const Id = user.username;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
                const uploadData = {
                    userId: Id,
                    fileType: file.type,
                    fileContent: reader.result,
                    fileName: file.name,
                }
            try {
                const response = await axios.post('https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-upload', uploadData);
                setFile("")
                setLoading(false)
                setSuccess(true)
                setError(false)

            } catch (error) {
                setLoading(false)
                setSuccess(false)
                setError(true)
                console.error('Error posting data:', error);
            }

        };



    }
    return (
        <>{loading && <Loader/>}
            <div>
                <br/>
                    {success && <div className="text-green-500">Upload was successful</div>}
                    {error && <div className="text-red-500">Error</div>}
                <div className="flex justify-center">
                    <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                        <div className="m-4">
                            <label className="inline-block mb-2 text-gray-500">File Upload</label>
                            <div className="flex items-center justify-center w-full">

                                <label
                                    className="flex flex-col w-60 h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <div className="flex cursor-pointer flex-col items-center justify-center pt-7">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="w-8 h-8 cursor-pointer text-gray-400 group-hover:text-gray-600"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                        </svg>
                                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                            Click here to select a file
                                        </p>
                                    </div>
                                    <input type="file" onChange={handleFileChange} className="opacity-0"/>
                                </label>


                                {file && <label
                                    className="flex flex-col w-60 h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <p>File Name: {file?.name} </p>
                                    <p>File Size: {(file?.size / 1024).toFixed(2) + ' KB'}</p>
                                    <p>File Type: {file?.type}</p>
                                    <button onClick={() => {
                                        setFile(null)
                                    }} className="bg-red-500 hover:bg-red-700 text-white font-bold mx-9 py-2 rounded">
                                        Clear
                                    </button>
                                </label>}
                            </div>
                        </div>
                        <div className="flex justify-center p-2">
                            {file &&
                                <button onClick={()=>{uploadFile()}} className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">Upload
                                </button>}
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        </>

    );
}

export default Upload;
