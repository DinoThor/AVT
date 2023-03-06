import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Neutral() {
  return (
    <View style={{ aspectRatio: 1 }}>
      <Face />
    </View>
  );
}

const Face = (props) => (
  <Svg
    fill="#000000"
    width="100%"
    height="120px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="m12 1.316c-5.901 0-10.684 4.783-10.684 10.684s4.783 10.684 10.684 10.684 10.684-4.783 10.684-10.684c-.012-5.896-4.788-10.672-10.683-10.684h-.001zm0 22.297c-6.414 0-11.613-5.199-11.613-11.613s5.199-11.613 11.613-11.613 11.613 5.199 11.613 11.613v.015c0 6.405-5.192 11.597-11.597 11.597-.005 0-.011 0-.016 0h.001z" />
    <Path d="m12 24c-6.614-.034-11.966-5.386-12-11.997v-.003c0-6.627 5.373-12 12-12s12 5.373 12 12c-.034 6.614-5.386 11.966-11.997 12zm0-23.226c-6.2 0-11.226 5.026-11.226 11.226s5.026 11.226 11.226 11.226 11.226-5.026 11.226-11.226c-.004-6.198-5.028-11.221-11.225-11.226zm0 22.297c-6.114 0-11.071-4.957-11.071-11.071s4.957-11.071 11.071-11.071c6.114 0 11.071 4.957 11.071 11.071s-4.957 11.071-11.071 11.071zm0-21.368c-5.687 0-10.297 4.61-10.297 10.297s4.61 10.297 10.297 10.297 10.297-4.61 10.297-10.297c0-.001 0-.003 0-.005 0-5.684-4.608-10.292-10.292-10.292-.002 0-.003 0-.005 0z" />
    <Path d="m9.677 9.91v.009c0 1.15-.932 2.082-2.082 2.082-.003 0-.006 0-.009 0-1.154 0-2.09-.936-2.09-2.09s.936-2.09 2.09-2.09h.009c1.15 0 2.082.932 2.082 2.082v.009z" />
    <Path d="m18.581 9.91c0 1.154-.936 2.09-2.09 2.09s-2.09-.936-2.09-2.09c0-.003 0-.006 0-.009 0-1.15.932-2.082 2.082-2.082h.009c1.145.023 2.067.945 2.09 2.088v.002z" />
    <Path d="m16.413 17.187h-8.903c-.257 0-.465-.208-.465-.465s.208-.465.465-.465h8.903c.249.017.447.215.464.463v.002.019c0 .246-.2.446-.446.446-.007 0-.013 0-.02 0h.001z" />
    <Path d="m16.413 17.574h-8.903c-.47 0-.852-.381-.852-.852s.381-.852.852-.852h8.903c.47 0 .852.381.852.852s-.381.852-.852.852zm-8.826-.929c-.077 0-.077.077 0 0-.02.02-.033.047-.033.077s.013.058.033.077h8.903c.043 0 .077-.035.077-.077 0-.077 0-.077-.077-.077z" />
  </Svg>
);
