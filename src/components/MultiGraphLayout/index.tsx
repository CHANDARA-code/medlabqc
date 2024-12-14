import React from "react";
import LeveyJenningsChart from "../LeveyJenningsChart"; // Assuming this is your chart component
import { QCRecord } from "../../types/qc";

interface MultiGraphLayoutProps {
  chartDataList: {
    id: number;
    analyte: string;
    mean: number;
    cv: number;
    data: QCRecord[];
  }[];
}

const MultiGraphLayout: React.FC<MultiGraphLayoutProps> = ({
  chartDataList,
}) => {
  return (
    <div className="multi-graph-container bg-gray-50 p-4 rounded-md shadow overflow-auto h-[calc(100vh-100px)]">
      {chartDataList.map(({ id, analyte, mean, cv, data }) => (
        <div
          key={id}
          className="analyte-row grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 items-center"
        >
          {/* Metadata Section */}
          <div className="metadata bg-white p-4 rounded-md shadow-md col-span-1">
            <h3 className="text-lg font-semibold text-gray-800">{analyte}</h3>
            <p className="text-sm text-gray-600">
              <strong>Mean:</strong> {mean} mmol/L
            </p>
            <p className="text-sm text-gray-600">
              <strong>CV:</strong> {cv} %
            </p>
            <p className="text-sm text-gray-600">
              <strong>N:</strong> {data.length}
            </p>
          </div>

          {/* Chart Section */}
          <div className="chart bg-white p-4 rounded-md shadow-md col-span-4">
            <LeveyJenningsChart data={data} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiGraphLayout;
