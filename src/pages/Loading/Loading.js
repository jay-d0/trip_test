import React from "react";
import { ClipLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "0 auto",
  borderColor: "#E50915",
  textAlign: "center",
};

const Loading = ({ loading }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        color: "purple",
        backgroundColor: "#F6EDD6",
      }}
    >
      <div>
        <ClipLoader
          color="#E50915"
          loading={loading}
          cssOverride={override}
          size={150}
        />
        <h1>Making your character…</h1>
      </div>
    </div>
  );
};

export default Loading;
