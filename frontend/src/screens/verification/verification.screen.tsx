import { useGetVerificationStatusQuery } from "@/slices/postApiSlice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
export const VerificationScreen = () => {
  const [status, setStatus] = useState("");
  const { state } = useLocation();
  const { callbackId, reclaimUrl } = state;
  console.log("location", state, callbackId, reclaimUrl);

  const { data, isLoading, refetch } =
    useGetVerificationStatusQuery(callbackId);
  const navigate = useNavigate();
  const refetchStatus = async () => {
    await refetch();
    setStatus(data?.status);
    console.log(data?.status);
    if (data?.status === "VERIFIED") {
      navigate("/profile");
    }
    if (data?.status === "FAILED") {
      //TODO: handle error
    }
  };

  useEffect(() => {
    console.log("effect ran");
    const id = setInterval(() => {
      refetchStatus();
    }, 5000);

    return () => clearInterval(id); // Clear the interval when component unmounts
  }, [data]);
  console.log("statusssss--", status);
  console.log("statusssss--", data);
  return (
    <>
      {isLoading && <h1>Loading.....</h1>}

      <QRCode appUrl={reclaimUrl} />
    </>
  );
};

export const QRCode = ({ appUrl }: any) => {
  return (
    <div className="form-container">
      <h1 className="title">
        Almost there. verify and avail exclusive Deals!!
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a className="link" target="_blank" rel="noreferrer" href={appUrl}>
          {" "}
          Click here to open in Reclaim Wallet
        </a>
      </div>

      <span>OR</span>

      <div className="qr-code">
        <QRCodeSVG value={appUrl} className="react-qr" />
      </div>

      <p className="scan-helper-text">
        <span>Scan the QR </span> to submit your claim on the Reclaim app
      </p>

      <>Waiting to be verified. Please don't close this tab</>
    </div>
  );
};
