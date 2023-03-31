import { View, Button, BackHandler } from "react-native";
import { closeSession } from "../../utils/asyncStorage";

export const FeedBack = ({ route }) => {
  return (
    <View>
      <Button title="flip"
        onPress={() => {
          closeSession();
          route.params['feedBack'](false);
          BackHandler.exitApp();
        }}>
      </Button>
    </View>
  );

}
