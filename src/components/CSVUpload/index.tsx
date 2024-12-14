// components/qc/CSVUpload.tsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { parse } from "papaparse";
import { QCRecord } from "../../types/qc";
import LeveyJenningsChart from "../LeveyJenningsChart";

// Add styling for better UX/UI
const CSVUpload: React.FC = () => {
  const [qcData, setQcData] = useState<QCRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  // Handle file upload via dropzone
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Reset states
      setError(null);
      setIsLoading(true);
      setFileName(file.name);

      // Parse CSV using papaparse
      parse(file, {
        complete: (result) => {
          const data: QCRecord[] = result.data.map((row: any) => ({
            id: row.id,
            date: row.date,
            result: parseFloat(row.result),
          }));

          // Check if the data is valid
          if (
            data.every(
              (record) => record.id && record.date && !isNaN(record.result)
            )
          ) {
            setQcData(data);
          } else {
            setError(
              "Invalid CSV format. Please ensure the CSV is correctly structured."
            );
          }

          setIsLoading(false);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  // Initialize dropzone hook
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] }, // Ensure only CSV files are accepted
    multiple: false, // Allow only one file
  });

  return (
    <div className="csv-upload-container p-4 rounded-md bg-white shadow-lg">
      <div
        {...getRootProps()}
        className="dropzone relative border-dashed border-4 p-8 mb-4 text-center rounded-md cursor-pointer hover:border-blue-500 transition-all duration-200"
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <div className="loading-spinner">
            <svg
              className="w-8 h-8 mx-auto text-gray-400 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
              ></path>
            </svg>
            <p className="mt-2 text-gray-500">Processing your file...</p>
          </div>
        ) : (
          <>
            <p className="text-lg text-gray-700">
              Drag & drop a CSV file here, or click to select one
            </p>
            <p className="text-sm text-gray-400">Only .csv files are allowed</p>
          </>
        )}
      </div>

      {error && (
        <div className="error-message text-red-600 p-2 rounded-md mb-4">
          {error}
        </div>
      )}

      {fileName && !isLoading && !error && (
        <div className="file-name mb-4 text-gray-700">
          <strong>File Selected:</strong> {fileName}
        </div>
      )}

      {qcData.length > 0 && !isLoading && !error && (
        <div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-800">
            Levey-Jennings Chart
          </h3>
          <LeveyJenningsChart data={qcData} />
        </div>
      )}

      <button
        className="reset-button mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
        onClick={() => {
          setQcData([]);
          setError(null);
          setFileName("");
        }}
      >
        Reset Upload
      </button>
    </div>
  );
};

export default CSVUpload;
