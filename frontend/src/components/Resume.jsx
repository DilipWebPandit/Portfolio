import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Download, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaUndo } from "react-icons/fa";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showPdf, setShowPdf] = useState(false);
  const [scale, setScale] = useState(1.2); // default zoom

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const goToPreviousPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));

  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages));

  const handleDownloadClick = () => setShowPdf(true);

  // Zoom controls
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3)); // max 3x zoom
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6)); // min 0.6x zoom
  const resetZoom = () => setScale(1.2);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Dilip_Resume.pdf";
    link.click();
  };

  return (
    <section
      id="resume"
      className="relative py-24 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
    >
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.1),transparent_70%)]"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400"
        >
          My Resume
        </motion.h2>

        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Here's a detailed look at my professional background, skills, and
          experience.
        </p>

        {/* Resume Section */}
        <AnimatePresence>
          {!showPdf ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/60 border border-indigo-500/20 rounded-2xl p-10 shadow-lg backdrop-blur-md"
              >
                <FileText size={64} className="text-indigo-400 mb-6 mx-auto" />
                <h3 className="text-2xl font-semibold mb-3">
                  Download My Resume
                </h3>
                <p className="text-gray-400 mb-6">
                  Click below to view or download the full PDF version.
                </p>

                <button
                  onClick={handleDownloadClick}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition-all duration-300"
                >
                  View Resume
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="flex gap-4 mb-4">
                <button
                  onClick={zoomOut}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <FaMinus /> Zoom Out
                </button>
                <button
                  onClick={resetZoom}
                  className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <FaUndo /> Reset
                </button>
                <button
                  onClick={zoomIn}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <FaPlus /> Zoom In
                </button>
              </div>

              {/* PDF Viewer */}
              <div className="overflow-auto border-4 border-indigo-500/20 rounded-2xl shadow-2xl p-4 bg-gray-800/80 backdrop-blur-md mb-6 w-full max-w-3xl overflow-auto">
                <Document
                  file="/resume.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="flex justify-center"
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="rounded-lg shadow-lg"
                  />
                </Document>
              </div>

              {numPages && (
                <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                  <button
                    onClick={goToPreviousPage}
                    disabled={pageNumber <= 1}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 rounded-lg transition-all duration-200"
                  >
                    <ChevronLeft size={18} /> Previous
                  </button>

                  <span className="text-gray-200 font-medium">
                    Page {pageNumber} of {numPages}
                  </span>

                  <button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 rounded-lg transition-all duration-200"
                  >
                    Next <ChevronRight size={18} />
                  </button>

                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200"
                  >
                    <Download size={18} /> Download PDF
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Resume;
