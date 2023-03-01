import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { makeStyles } from "@rneui/themed";

import { Icon } from "@rneui/base";

export default function Header() {
    const styles = useStyles();
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/avatar.jpg')} // Hardcoded
                    style={styles.Avatar}
                />
            </TouchableOpacity>
        </View>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 30
    },
    Avatar: {
        borderRadius: 30,
        backgroundColor: theme.colors.background,
        width: 50,
        height: 50,
    }
}));