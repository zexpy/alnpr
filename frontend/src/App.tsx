import { useState } from "react";
import "./App.css";

const URL = "http://localhost:8000/";

const App = () => {
  const [image, setImage] = useState<{ full: string; crop: string }>();
  const [file, setFile] = useState<File>();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file as Blob);
    const response = await fetch("http://localhost:8000/image", {
      method: "POST",
      body: formData,
    });
    const data: { url: string; path: string } = await response.json();
    setImage({
      full: `${URL}${data.url}/${data.path}`,
      crop: `${URL}${data.url}/crops/number_plate/${data.path}`,
    });
  };

  return (
    <>
      <div>
        <input type="file" onChange={(e) => setFile(e.target?.files?.[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {image && (
        <>
          <img
            src={image.full}
            style={{ width: 700, height: 700, objectFit: "contain" }}
          />
          <img
            src={image.crop}
            style={{ width: 700, height: 700, objectFit: "contain" }}
          />
        </>
      )}
    </>
  );
};

export default App;
