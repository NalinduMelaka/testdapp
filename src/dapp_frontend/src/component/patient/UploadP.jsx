import React, { useState, useEffect } from "react";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { HttpAgent } from "@dfinity/agent";
import { Actor, ActorSubclass } from "@dfinity/agent";
import { AssetManager } from "@dfinity/assets";
import { idlFactory as asset_idl } from "../../../../declarations/dapp_frontend";

const identity = Ed25519KeyIdentity.generate(
  new Uint8Array(Array.from({ length: 32 }).fill(0))
);

const isLocal = !window.location.host.endsWith("ic0.app");
const agent = new HttpAgent({
  host: isLocal
    ? `http://127.0.0.1:${window.location.port}`
    : "https://ic0.app",
  identity,
});
if (isLocal) {
  agent.fetchRootKey();
}

// Canister id can be fetched from URL since frontend in this example is hosted in the same canister as file upload
const canisterId =
  new URLSearchParams(window.location.search).get("canisterId") ??
  /(.*?)(?:\.raw)?\.ic0.app/.exec(window.location.host)?.[1] ??
  /(.*)\.localhost/.exec(window.location.host)?.[1];

// Create asset manager instance for above asset canister
const assetManager = new AssetManager({ canisterId, agent });

const detailsFromKey = (key) => {
  const fileName = key.split("/").slice(-1)[0];
  const width = parseInt(fileName.split(".").slice(-3)[0]);
  const height = parseInt(fileName.split(".").slice(-2)[0]);
  return { key, fileName, width, height };
};

// Get file name, width and height from file
const detailsFromFile = async (file) => {
  const src = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
  const [width, height] = await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve([img.naturalWidth, img.naturalHeight]);
    img.src = src;
  });
  const name = file.name.split(".");
  const extension = name.pop();
  const fileName = [name, width, height, extension].join(".");
  return { fileName, width, height };
};

const UploadP = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    assetManager
      .list()
      .then((assets) =>
        assets
          .filter((asset) => asset.key.startsWith("/uploads/"))
          .sort((a, b) =>
            Number(b.encodings[0].modified - a.encodings[0].modified)
          )
          .map(({ key }) => detailsFromKey(key))
      )
      .then(setUploads);
    console.log(uploads);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    setMessage("Uploading...");

    try {
      const batch = assetManager.batch();
      const { fileName, width, height } = await detailsFromFile(file);
      const key = await batch.store(file, { path: "/uploads", fileName });
      setMessage(key);
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload file.");
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}

      <div>
        {uploads.map((upload) => (
          <div key={upload.key} className={"App-image"}>
            <p>{upload.key}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadP;
