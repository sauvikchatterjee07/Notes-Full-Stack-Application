import React from "react";
import { ColorRing } from "react-loader-spinner";

const Spinner = (isEmailExist) => {
    console.log("from spinner", isEmailExist); //false

    return isEmailExist === true ? (
        <div className="flex flex-col items-center justify-center space-y-4">
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
            <div className="text-center text-blue-800">
                Email Already exists redirecting to Login page...
            </div>
        </div>
    ) : (
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
    );
};

export default Spinner;
