import { useState } from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

function AudioPermission() {
  const [micPermission, setMicPermission] = useState("prompt");

  function handlePermissionState(state) {
    setMicPermission(state);
  }

  //'prompt', 'denied', and 'granted'
  navigator.permissions
    .query({ name: "microphone" })
    .then(function (queryResults) {
      handlePermissionState(queryResults.state);
      queryResults.onchange = function (onChangeResult) {
        if (onChangeResult.target) {
          setMicPermission(onChangeResult.target.state);
        }
      };
    });

  return (
    <div className="mb-10">
      {micPermission === "prompt" && (
        <Alert status="warning">
          <AlertIcon />
          🎤
        </Alert>
      )}
      {micPermission === "granted" && (
        <Alert status="success">
          <AlertIcon />
          🎤
        </Alert>
      )}
      {micPermission === "denied" && (
        <Alert status="error">
          <AlertIcon />
          🎤
        </Alert>
      )}
    </div>
  );
}

export default AudioPermission;
