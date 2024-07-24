import React, { useState, useEffect } from "react";
import { Card, Textarea, Button, Spinner } from "@material-tailwind/react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/use-auth-client";

const generateAPIKey = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};

const APInew = () => {
  const [data, setData] = useState({
    apikey: "",
    timestamp: "",
  });
  const [text, setText] = useState("");
  const [isprocess, setIsprocess] = useState(false);
  const navigate = useNavigate();
  const { whoamiActor } = useAuth();

  useEffect(() => {
    const apiKey = generateAPIKey();
    setText(apiKey);
    setData((prevData) => ({
      ...prevData,
      apikey: apiKey,
      timestamp: BigInt(Date.now()) * BigInt(1_000_000), // Convert to nanoseconds
    }));
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      toast.success("Failed to copy text. Please try again.!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const addrecord = async () => {
    setIsprocess(true); // Show spinner
    setData((prevData) => ({
      ...prevData,
      timestamp: BigInt(Date.now()) * BigInt(1_000_000), // Update timestamp to current time in nanoseconds
    }));
    console.log(data, "data");
    const result = await whoamiActor.addApikey(data);
    if ("ok" in result) {
      toast.success("🦄 Created successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsprocess(false);
      setTimeout(() => {
        navigate("/datauser");
      }, 2000);
    } else {
      setIsprocess(false);
      toast.error("Something wrong try again later!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    // Handle the result as needed
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Card className="p-4">
        <Textarea
          value={text}
          readOnly
          rows="4"
          cols="50"
          onChange={(e) => {
            setData((prevData) => ({
              ...prevData,
              apikey: e.target.value,
            }));
          }}
        />
        {isprocess && (
          <div className="flex justify-center items-center">
            <Spinner color="green" className="my-2" />
          </div>
        )}
        <Button onClick={copyToClipboard} className="mt-4">
          Copy to Clipboard
        </Button>
        <Button onClick={addrecord} className="mt-4">
          Save
        </Button>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default APInew;
