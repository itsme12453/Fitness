import * as Font from "expo-font";

export default useFonts = async() => {
    Font.loadAsync({
        'SourceSansPro-Bold': require('../../assets/fonts/SourceSansPro-Bold.ttf'),
        'SourceSansPro-SemiBold': require('../../assets/fonts/SourceSansPro-SemiBold.ttf'),
    });
}