import { View, Button, BackHandler } from "react-native";
import { CloseSession, setFeedBack } from "../../utils/asyncStorage";

export const FeedBack = ({ route }) => {
  return (
    <View>
      <Button title="flip"
        onPress={() => {
          CloseSession();
          setFeedBack(false);
          route.params['feedBack'](false);
          BackHandler.exitApp();
        }}>
      </Button>
    </View>
  );

}
