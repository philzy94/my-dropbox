
import React from 'react';
import {RotatingLines} from "react-loader-spinner";

const Loader = () => {

    return (
        <>
            <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true"
                 className="fixed flex justify-center bg-black opacity-75 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        </>

    );
}

export default Loader;
