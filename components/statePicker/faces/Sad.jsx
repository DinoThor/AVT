import * as React from "react";
import { View } from "react-native";
import Svg, { Line, Path, Circle } from "react-native-svg";

export default function Sad() {
  return (
    <View style={{ aspectRatio: 1 }}>
      <Face />
    </View>
  );
}

const Face = (props) => (
  <Svg
    width="100%"
    height="120px"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="sadFaceIconTitle"
    stroke="#cc3232"
    strokeWidth={2}
    strokeLinecap="square"
    strokeLinejoin="miter"
    fill="none"
    color="#000000"
    {...props}
  >
    <Line strokeLinecap="round" x1={9} y1={9} x2={9} y2={9} />
    <Line strokeLinecap="round" x1={15} y1={9} x2={15} y2={9} />
    <Path d="M8,16 C9.33333333,15.3333333 10.6656028,15.0003822 11.9968085,15.0011466 C13.3322695,15.0003822 14.6666667,15.3333333 16,16" />
    <Circle cx={12} cy={12} r={10} />
  </Svg>
);
