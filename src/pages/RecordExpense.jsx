import api from "../api";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useState, useRef } from "react";
import Navigation from "../components/Navigation";
import AudioPermission from "../components/AudioPermission";
import { FaSquare } from "react-icons/fa";

function RecordExpense() {
  const [recording, setRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  //const [recordingUrl, setRecordingUrl] = useState();
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const navigate = useNavigate();

  const uploadUrl = async (response) => {
    try {
      const newData = { url: response["fileUrl"] };
      await api.post("/api/expenses/", newData).then(console.log("Uploaded"));
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/expenses");
    }
  };

  async function basicUpload(params) {
    const baseUrl = "https://api.bytescale.com";
    const path = `/v2/accounts/${params.accountId}/uploads/binary`;
    const entries = (obj) =>
      Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
    const query = entries(params.querystring ?? {})
      .flatMap(([k, v]) =>
        Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]
      )
      .map((kv) => kv.join("="))
      .join("&");
    const response = await fetch(
      `${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`,
      {
        method: "POST",
        body: params.requestBody,
        headers: Object.fromEntries(
          entries({
            Authorization: `Bearer ${params.apiKey}`,
            "X-Upload-Metadata": JSON.stringify(params.metadata),
          })
        ),
      }
    );
    const result = await response.json();
    if (Math.floor(response.status / 100) !== 2)
      throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
    return result;
  }

  const startRecording = async () => {
    setRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        basicUpload({
          accountId: import.meta.env.VITE_BYTESCALE_ACCOUNT,
          apiKey: import.meta.env.VITE_BYTESCALE_KEY,
          requestBody: recordedBlob,
        }).then(
          (response) => uploadUrl(response),
          (error) => console.error(error)
        );
        chunks.current = [];
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const stopRecording = () => {
    setRecording(false);
    setIsUploading(true);
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  return (
    <>
      <Navigation />

      <div className="pt-40 m-2 flex flex-col justify-center items-center">
        <div className="text-center w-60 sm:w-auto">
          <h1 className="text-4xl font-bold mb-2">
            Record your latest expense
          </h1>
          <div className="flex flex-col text-center items-center">
            <p className="text-stone-700 text-lg mb-5">
              Just tell us your most recent expense.{" "}
              <span className="underline font-semibold">
                It is that simple.
              </span>
            </p>
            <p className=" text-center items-center justify-center mb-5 italic text-neutral-500 lg:w-45">
              We can handle every language there is. Just make sure to say
              something like -{" "}
              <span className="font-bold">I bought a 10 dollar book</span>,
              where we can hear a product and a total
            </p>
            <AudioPermission />
          </div>

          {recording ? (
            <Button
              onClick={stopRecording}
              colorScheme="messenger"
              rightIcon={<FaSquare />}
            >
              Stop Recording
            </Button>
          ) : (
            <Button onClick={startRecording} colorScheme="messenger">
              Record
            </Button>
          )}

          {isUploading && (
            <Button
              isLoading
              loadingText="Submitting"
              variant="outline"
            ></Button>
          )}
        </div>
      </div>
    </>
  );
}

export default RecordExpense;
