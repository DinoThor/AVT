import * as React from "react";
import { View } from "react-native";
import Svg, { Path, Line, Circle } from "react-native-svg";

export default function Happy () {
  return(
    <View style={{ aspectRatio: 1 }}>
      <Face/>
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
    aria-labelledby="happyFaceIconTitle"
    stroke="#2dc937"
    strokeWidth={2}
    strokeLinecap="square"
    strokeLinejoin="miter"
    {...props}
  >
    <Path d="M7.3010863,14.0011479 C8.0734404,15.7578367 9.98813711,17 11.9995889,17 C14.0024928,17 15.913479,15.7546194 16.6925307,14.0055328" />
    <Line strokeLinecap="round" x1={9} y1={9} x2={9} y2={9} />
    <Line strokeLinecap="round" x1={15} y1={9} x2={15} y2={9} />
    <Circle cx={12} cy={12} r={10} />
  </Svg>
);
