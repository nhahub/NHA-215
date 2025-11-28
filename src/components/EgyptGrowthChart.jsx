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
        { x: "2025", y: 4.08 }, 
      ],
    },
  ];

  return (
    // التعديل هنا: خليت الطول متغير والبادينج يتغير حسب الشاشة
    <div className="h-[350px] md:h-[400px] w-full bg-[#0A1010] rounded-3xl p-2 md:p-4">
      <ResponsiveLine
        data={data}
        // قللت الهوامش اليمين واللي فوق عشان الموبايل
        margin={{ top: 30, right: 20, bottom: 50, left: 50 }}
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
          legendOffset: 36,
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
          // ضفت لون للكتابة عشان تبان على الخلفية السوداء
          text: {
            fill: "#e0e0e0", 
            fontSize: 12,
          },
          axis: {
            ticks: {
              line: {
                stroke: "#0E898E",
              },
              text: {
                fill: "#9ca3af", // لون رمادي فاتح للأرقام
              }
            },
            legend: {
                text: {
                    fill: "#ffffff" // لون أبيض للعناوين (Year/Growth)
                }
            }
          },
          grid: {
            line: {
                stroke: "#333333", // لون الجريد يكون هادي
                strokeWidth: 1
            }
          },
          tooltip: {
            container: {
                background: "#1f2937", // خلفية التولتيب
                color: "#fff",
            }
          }
        }}
      />
    </div>
  );
}