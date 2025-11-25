import { ResponsiveLine } from "@nivo/line";
import React from "react";

export default function EgyptGrowthChart() {
  const data = [
    {
      id: "Egypt GDP Growth",
      color: "#0E898E",
      data: [
        { x: "2018", y: 5.33 },
        { x: "2019", y: 5.55 },
        { x: "2020", y: 3.55 },
        { x: "2021", y: 3.29 },
        { x: "2022", y: 6.59 },
        { x: "2023", y: 3.76 },
        { x: "2024", y: 2.40 },
        // ممكن تضيف توقعات:
        { x: "2025", y: 4.08 }, // من Statistictimes :contentReference[oaicite:3]{index=3}
      ],
    },
  ];

  return (
    <div className="h-[400px] bg-[#0A1010] rounded-3xl">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Year",
          legendOffset: 30,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Growth",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "set1" }}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor", modifiers: [] }} 
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        enableGridX={false}
        enableGridY={true}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={{
          axis: {
            ticks: {
              line: {
                stroke: "#0E898E",
              },
            },
          },
        }}
      />
    </div>
  );
}
