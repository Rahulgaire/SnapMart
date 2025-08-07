// File: components/ui/file-upload.jsx

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};
const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FileUpload = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    setFiles([...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-4 group/file block rounded-md cursor-pointer w-full relative"
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <p className="relative z-20 font-medium text-sm text-neutral-700 dark:text-neutral-300">
            Upload file
          </p>
          <p className="relative z-20 text-xs text-neutral-400 mt-1">
            Drag or drop or click to upload
          </p>

          <div className="relative w-full mt-4 max-w-xs mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className="bg-white dark:bg-neutral-900 flex flex-col md:h-20 p-3 mt-2 w-full mx-auto rounded-md shadow-sm"
                >
                  <div className="flex justify-between w-full items-center gap-2">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-sm text-neutral-700 dark:text-neutral-300 truncate max-w-[150px]"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-2 py-0.5 text-xs text-neutral-600 dark:text-white bg-neutral-100 dark:bg-neutral-800 rounded"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                  <div className="flex text-xs justify-between text-neutral-600 dark:text-neutral-400 mt-1">
                    <motion.p>{file.type}</motion.p>
                    <motion.p>
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}

            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-white dark:bg-neutral-900 flex items-center justify-center h-24 mt-2 w-full max-w-[6rem] mx-auto rounded-md shadow-md"
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-500 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute border border-dashed border-sky-400 inset-0 z-30 rounded-md"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function GridPattern() {
  const columns = 25; // Fewer columns
  const rows = 6;     // Fewer rows
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-wrap justify-center items-center gap-px scale-100">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-6 h-6 rounded-sm ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_2px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_2px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}

export default FileUpload;
