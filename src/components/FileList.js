import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Auth } from 'aws-amplify';
import Loader from "./Loader";

const FileList = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState([]);
    const [loading, setLoading] = useState(false);

    const getFiles = async () => {
        setLoading(true)
        const authUser = await Auth.currentAuthenticatedUser();
        setID(authUser.username)
        const ID = authUser.username
        try {
            const response = await axios.get(`https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-list?userId=${ID}`);
            setData(response.data);
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };
    const fileDownload = async (fileName) => {
        setLoading(true)
        try {
            const response = await axios.get(`https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-download?userId=${id}&fileName=${fileName}`);
            window.open(response.data.url);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };

    const fileDelete = async (fileName) => {
        setLoading(true)
        try {
            await axios.delete(`https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-delete?userId=${id}&fileName=${fileName}`);
            getFiles()
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };


    useEffect(() => {
        getFiles()

    }, []);
    return (
        <>
            {loading && <Loader/>}
            <br/>
            <div>
                <div className="relative w-5/6 overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                File Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                File size
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Modified
                            </th>

                            <th scope="col" className="px-6 py-3">
                                File Type
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index)=>{

                            return(
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {(item.size/ 1024).toFixed(2) + 'KB'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.lastModified}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.type}
                                    </td>

                                    <td className="px-6 py-4">

                                        <button onClick={() => fileDownload(item.name)}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Download
                                        </button>


                                        <button onClick={() => fileDelete(item.name)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold mx-2 py-2 px-4 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                            )
                        })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
        /*<button
            onClick={handleShowFilesClick}
            style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                border: 'none'
            }}>
            Show my files
        </button>*/
    );
}

export default FileList;
