"use client";
import React, { useEffect } from "react";
import PdfViewer from "./_components/pdf-viewer";

// import PDF from "@/pdfs/mypdf.pdf";
function PdfView() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Disable common screenshot shortcuts
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.key.toLowerCase() === "p") ||
        (e.metaKey && e.key.toLowerCase() === "p") ||
        (e.metaKey && e.shiftKey && e.key.toLowerCase() === "s") ||
        (e.key === "s" && (e.metaKey || e.ctrlKey || e.key === "OS")) ||
        (e.key === "PrintScreen" && (e.metaKey || e.ctrlKey || e.key === "OS"))
      ) {
        alert("Screenshots are disabled for this page.");
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className=" min-h-screen">
      <h1 className=" font-bold text-5xl">PDF Viewer</h1>
      <PdfViewer />
    </div>
  );
}

export default PdfView;
