import './App.css';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React, {useEffect, useState} from 'react';
import FileList from "./components/FileList";
import Upload from "./components/Upload";
import {Auth} from "aws-amplify";
import axios from "axios";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Loader from "./components/Loader";


function App({ signOut }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false)

    }, []);
    return (
        <BrowserRouter>
            <div className="App">

                <div className="flex justify-end p-6">
                    <Button onClick={()=>{
                        setLoading(true)
                        signOut()
                    }}>Sign out</Button>
                </div>
                {loading && <Loader/>}
                <center>
                    <h2>Welcome to My-DropBox, you can upload your files</h2>
                    <h3>V1.1.2</h3>
                    <nav>
                            <span className="m-1">
                                <Button className="">
                                <Link to="/">Upload File</Link>
                            </Button>
                            </span>

                            <span className="m-1">
                                <Button>
                                <Link to="/files">View Files</Link>
                                </Button>
                            </span>



                    </nav>
                    <Routes>
                            <Route exact path="/" element={<Upload />} />
                            <Route exact path="files" element={<FileList />} />
                            <Route path="*" element={<h1>404, No Page Found</h1>} />
                    </Routes>
                </center>
                <br/>

            </div>

        </BrowserRouter>

  );
}

export default withAuthenticator(App);
