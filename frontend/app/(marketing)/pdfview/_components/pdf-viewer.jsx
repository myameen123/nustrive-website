"use client";
import React, { useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { ProgressBar } from "@react-pdf-viewer/core";

// Import the styles provided by the react-pdf-viewer packages
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
function PdfViewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
      <div
        onContextMenu={(e) => e.preventDefault()}
        style={{
          height: "750px",
          width: "900px",
          marginLeft: "auto",
          marginRight: "auto",
          userSelect: "none",
        }}
      >
        <Viewer
          renderLoader={(percentages) => (
            <div style={{ width: "240px" }}>
              <ProgressBar progress={Math.round(percentages)} />
            </div>
          )}
          renderError={(error) => <div>Error: {error.message}</div>}
          theme={{
            theme: "dark",
          }}
          fileUrl="/mypdf.pdf"
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
}

export default PdfViewer;
