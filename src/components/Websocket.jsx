import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import { WEB_SOCKETS_URL } from "../config/api.urls";
import { setPositions, setSocketConnection } from "../store/slice/groups.slice";

const WebSocket = (props) => {
  const { isForceStart = false } = props;

  const dispatch = useDispatch();
  const [isFirstCall, setIsFirstCall] = useState(!isForceStart);
  const { lastMessage } = useWebSocket(WEB_SOCKETS_URL, {
    share: true,
  });

  const [batchedPositions, setBatchedPositions] = useState([]);

  //
  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      if (data.positions) {
        setBatchedPositions((prev) => [...prev, ...data.positions]);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (batchedPositions?.length > 0) {
        dispatch(setPositions({ positions: batchedPositions, isFirstCall }));
        if (isFirstCall) dispatch(setSocketConnection(true));

        setBatchedPositions([]);
        setIsFirstCall(false);

        if (props.onConnection) {
          props.onConnection(true);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [batchedPositions]);

  return null;
};

export default WebSocket;
