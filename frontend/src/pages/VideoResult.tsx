import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";

export type VideoResultData = {
    full: string;
    crop: string;
    file: File;
    conf: string;
    cords: number[];
}[];

function VideoResult() {
    const { state } = useLocation();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    if (!state) {
        toast.error("Invalid");
        return <Navigate to="/" replace={true} />;
    }
    
    const results = state as VideoResultData;
    const [character, setCharacter] = useState<string[]>(new Array(results.length).fill(''));

    const handleRecognized = async () => {
        setIsLoading(true);
        try {
            const recognitionPromises = results.map(result =>
                fetch(`${import.meta.env.VITE_BACKEND_URL}/character/recognition`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image: result.crop.split('/result')[1], type: 'video' }),
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
            );

            const recognitionResults = await Promise.all(recognitionPromises);
            const recognizedCharacters = recognitionResults.map(result => result.text);
            
            setCharacter(recognizedCharacters);
            toast.success("Successfully recognized all characters");
        } catch (error) {
            console.error('Error:', error);
            toast.error("Failed to recognize characters");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-full max-w-7xl flex-col font-poppins items-center justify-center m-auto px-8 gap-3">
            <h2 className="text-2xl font-bold text-blue-900 mt-8">Video Result</h2>
            <div className="flex flex-row justify-center gap-4 items-center rounded-md mt-8 flex-wrap">
                {results.map((result, index) => (
                    <img
                        key={index}
                        src={result.crop}
                        className={cn("h-24 w-auto cursor-pointer border-2", {
                            "border-blue-500": index === selectedIndex,
                            "border-transparent": index !== selectedIndex,
                        })}
                        alt={`Crop ${index + 1}`}
                        onClick={() => setSelectedIndex(index)}
                    />
                ))}
            </div>

            {results[selectedIndex] && (
                <div className="flex w-full border-[1px] text-blue-900 rounded mt-6 p-4 justify-between gap-2 items-center">
                    <div className="flex-col flex w-full p-2 bg-[#F7F9F2] rounded">
                        <span className="border-b-[1px] border-black/40 font-semibold text-xl">
                            Result:
                        </span>
                        <div className="flex flex-col gap-3 my-3">
                            {/* <div className="text-base font-semibold">
                                Confidence: {Number(results[selectedIndex].conf).toFixed(3)}
                            </div> */}
                            <div className="text-base font-semibold">
                                Co-ordinate: ({results[selectedIndex].cords.map((cord) => cord.toFixed(2)).join(", ")})
                            </div>
                            <div className={cn("text-base font-semibold", {
                                "hidden": !character[selectedIndex]
                            })}>
                                Character: {character[selectedIndex]}
                            </div>
                        </div>
                    </div>
                    <img src={results[selectedIndex].crop} className="h-full w-full flex-2" />
                </div>
            )}
            <div className="flex gap-5">
                <button
                    className="px-4 py-2 bg-blue-300 rounded self-end disabled:opacity-50"
                    onClick={handleRecognized}
                    disabled={isLoading}
                >
                    {isLoading ? 'Recognizing...' : 'Recognize Number Plates'}
                </button>
                <button className="px-4 py-2 bg-blue-300 rounded self-end">
                    Detect Another
                </button>
            </div>
        </div>
    );
}

export default VideoResult;