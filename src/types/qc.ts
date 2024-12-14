export const mockQCData: QCRecord[] = [
  { id: 1, date: "2024-10-08", result: 102 },
  { id: 2, date: "2024-10-09", result: 98 },
  { id: 3, date: "2024-10-10", result: 101 },
  { id: 4, date: "2024-10-11", result: 99 },
  { id: 5, date: "2024-10-12", result: 103 },
  { id: 6, date: "2024-10-13", result: 97 },
  { id: 7, date: "2024-10-14", result: 100 },
  { id: 8, date: "2024-10-15", result: 104 },
  { id: 9, date: "2024-10-16", result: 96 },
  { id: 10, date: "2024-10-17", result: 102 },
  { id: 11, date: "2024-10-18", result: 101 },
  { id: 12, date: "2024-10-19", result: 99 },
  { id: 13, date: "2024-10-20", result: 100 },
  { id: 14, date: "2024-10-21", result: 103 },
  { id: 15, date: "2024-10-22", result: 97 },
  { id: 16, date: "2024-10-23", result: 98 },
  { id: 17, date: "2024-10-24", result: 104 },
  { id: 18, date: "2024-10-25", result: 96 },
  { id: 19, date: "2024-10-26", result: 102 },
  { id: 20, date: "2024-10-27", result: 101 },
  { id: 21, date: "2024-10-28", result: 99 },
  { id: 22, date: "2024-10-29", result: 100 },
  { id: 23, date: "2024-10-30", result: 103 },
  { id: 24, date: "2024-10-31", result: 97 },
  { id: 25, date: "2024-11-01", result: 98 },
  { id: 26, date: "2024-11-02", result: 104 },
  { id: 27, date: "2024-11-03", result: 96 },
  { id: 28, date: "2024-11-04", result: 102 },
  { id: 29, date: "2024-11-05", result: 101 },
  { id: 30, date: "2024-11-06", result: 99 },
];

// types/qc.ts
export interface QCRecord {
  id: number;
  date: string; // ISO date string
  result: number;
}
