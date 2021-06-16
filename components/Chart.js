import React from "react";
import { View, Text } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import { COLORS, SIZES, FONTS } from "../constants";
import moment from "moment";

const Chart = ({ containerStyle, chartPrices }) => {
  // Points
  let startUnixTimestamp = moment().subtract(7, "day").unix();
  let data = chartPrices
    ? chartPrices?.map((item, index) => {
        return {
          x: startUnixTimestamp + (index + 1) * 3600,
          Y: item,
        };
      })
    : [];

  let points = monotoneCubicInterpolation({ data, range: 40 });

  return (
    <View style={{ ...containerStyle }}>
      {/* chart */}
      {data.length > 0 && (
        <ChartPathProvider
          data={{
            points,
            smoothingStrategy: "bezier",
          }}
        ></ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;

// 127
