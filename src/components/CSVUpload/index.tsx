import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { parse } from "papaparse";
import { QCRecord } from "../../types/qc";
import MultiGraphLayout from "../MultiGraphLayout";

const CSVUpload: React.FC = () => {
  const [chartDataList, setChartDataList] = useState<
    {
      id: number;
      analyte: string;
      mean: number;
      cv: number;
      data: QCRecord[];
    }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    setError(null);
    setIsLoading(true);

    const newChartDataList: {
      id: number;
      analyte: string;
      mean: number;
      cv: number;
      data: QCRecord[];
    }[] = [];

    acceptedFiles.forEach((file, index) => {
      parse(file, {
        complete: (result) => {
          const data: QCRecord[] = result.data.map((row: any) => ({
            id: row.id,
            date: row.date,
            result: parseFloat(row.result),
          }));

          if (
            data.every(
              (record) => record.id && record.date && !isNaN(record.result)
            )
          ) {
            // Calculate mean and CV (example: you can adjust as needed)
            const results = data.map((record) => record.result);
            const mean =
              results.reduce((acc, curr) => acc + curr, 0) / results.length;
            const variance =
              results.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) /
              results.length;
            const stdDev = Math.sqrt(variance);
            const cv = (stdDev / mean) * 100;

            newChartDataList.push({
              id: index + 1,
              analyte: file.name.split(".")[0], // Use file name as analyte for simplicity
              mean: parseFloat(mean.toFixed(3)), // Round mean to 3 decimal places
              cv: parseFloat(cv.toFixed(3)), // Round CV to 3 decimal places
              data,
            });
          } else {
            setError(`Invalid CSV format in file: ${file.name}`);
          }

          if (newChartDataList.length === acceptedFiles.length) {
            setChartDataList((prev) => [...prev, ...newChartDataList]);
            setIsLoading(false);
          }
        },
        header: true,
        skipEmptyLines: true,
      });
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: true,
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
            <p className="text-gray-500">Processing your files...</p>
          </div>
        ) : (
          <p className="text-lg text-gray-700">
            Drag & drop CSV files here, or click to select files
          </p>
        )}
      </div>

      {error && <div className="error-message text-red-600 mb-4">{error}</div>}

      {chartDataList.length > 0 && (
        <MultiGraphLayout chartDataList={chartDataList} />
      )}
    </div>
  );
};

export default CSVUpload;
