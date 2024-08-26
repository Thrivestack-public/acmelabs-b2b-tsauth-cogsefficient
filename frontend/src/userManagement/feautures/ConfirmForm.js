import React, { useEffect, useRef } from "react";
import Button from "../components/Button";

export default function ConfirmForm({
    close,
    name,
    title,
    firstPart,
    secondPart,
    buttonText,
    onStatusChange
}) {
    const containerRef1 = useRef(null);

    const handleClickOutside = (event) => {
        if (containerRef1.current && !containerRef1.current.contains(event.target)) {
            console.log("Clicked outside!");
            close(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCloseClick = (event) => {
        event.stopPropagation();
        close(false);
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-[20000] pointer-events-none"
            ref={containerRef1}>
            <div
                style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)" }}
                className="w-[520px] flex flex-col bg-white rounded-2xl pointer-events-auto">
                <div className="flex items-center justify-between rounded-t-lg border-b border-[#E2E8F0] py-4 px-8">
                    <h2 className="text-2xl font-sansBig">{title}</h2>
                    <div style={{ cursor: "pointer" }} onClick={handleCloseClick}>
                        <div>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.35001 1.02505C2.17229 0.859452 1.93723 0.769298 1.69436 0.773584C1.45148 0.777869 1.21975 0.876259 1.04798 1.04803C0.876216 1.21979 0.777826 1.45152 0.77354 1.6944C0.769255 1.93728 0.859409 2.17233 1.02501 2.35005L5.67501 7.00005L1.02501 11.6501C0.932901 11.7359 0.859023 11.8394 0.807783 11.9544C0.756543 12.0694 0.72899 12.1935 0.726769 12.3194C0.724548 12.4453 0.747704 12.5703 0.794856 12.687C0.842007 12.8038 0.912188 12.9098 1.00121 12.9988C1.09023 13.0879 1.19628 13.1581 1.31301 13.2052C1.42975 13.2524 1.55478 13.2755 1.68066 13.2733C1.80654 13.2711 1.93068 13.2435 2.04568 13.1923C2.16068 13.141 2.26418 13.0672 2.35001 12.9751L7.00001 8.32505L11.65 12.9751C11.7358 13.0672 11.8393 13.141 11.9543 13.1923C12.0693 13.2435 12.1935 13.2711 12.3194 13.2733C12.4452 13.2755 12.5703 13.2524 12.687 13.2052C12.8037 13.1581 12.9098 13.0879 12.9988 12.9988C13.0878 12.9098 13.158 12.8038 13.2052 12.687C13.2523 12.5703 13.2755 12.4453 13.2732 12.3194C13.271 12.1935 13.2435 12.0694 13.1922 11.9544C13.141 11.8394 13.0671 11.7359 12.975 11.6501L8.32501 7.00005L12.975 2.35005C13.1406 2.17233 13.2308 1.93728 13.2265 1.6944C13.2222 1.45152 13.1238 1.21979 12.952 1.04803C12.7803 0.876259 12.5485 0.777869 12.3057 0.773584C12.0628 0.769298 11.8277 0.859452 11.65 1.02505L7.00001 5.67505L2.35001 1.02505Z"
                                    fill="black"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="font-sansLight text-[#334155] px-8 pt-3 text-lg pb-3">
                    {firstPart} <span className="text-[#0F172A] text-lg font-sansBold">{name}</span> {secondPart}
                </div>
                <div className="flex justify-end p-4">
                    <div className="flex items-center gap-3">
                        <Button text="Cancel" cancel={true} onClick={() => close(false)} />
                        <Button text={buttonText} onClick={() => onStatusChange(buttonText)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
