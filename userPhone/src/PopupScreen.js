import React from 'react';
import { View, Text, Button, WebView, BackHandler, Platform } from 'react-native';
import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// 아이콘 검색 - https://fontawesome.com/icons?d=gallery

export default class PopupScreen extends React.Component {

    static navigationOptions = {
        title: 'Popup',
        header: null
    };

    webView = {
        canGoBack: false,
        ref: null
    };

    constructor(props) {
        super(props);

        this.state = {
            url: null,

            tabs : [
                {
                    key: 'home',
                    icon: 'home-outline',
                    label: 'Home',
                    barColor: '#388E3C',
                    pressColor: 'rgba(255,255,255,0.16)',
                    defaultIcon: 'home-outline',
                    selectedIcon: 'home'
                },
                {
                    key: 'back',
                    icon: 'arrow-left-bold-circle-outline',
                    label: 'Back',
                    barColor: '#388E3C',
                    pressColor: 'rgba(255,255,255,0.16)',
                    defaultIcon: 'arrow-left-bold-circle-outline',
                    selectedIcon: 'arrow-left-bold-circle-outline'
                },
                {
                    key: 'category',
                    icon: 'animation-outline',
                    label: 'Category',
                    barColor: '#388E3C',
                    pressColor: 'rgba(255,255,255,0.16)',
                    defaultIcon: 'animation-outline',
                    selectedIcon: 'animation'
                },
                {
                    key: 'farmStory',
                    icon: 'home-city-outline',
                    label: 'MyFarmStory',
                    barColor: '#388E3C',
                    pressColor: 'rgba(255,255,255,0.16)',
                    defaultIcon: 'home-city-outline',
                    selectedIcon: 'home-city'
                },
                {
                    key: 'myPage',
                    icon: 'account-outline',
                    label: 'My Page',
                    barColor: '#388E3C',
                    pressColor: 'rgba(255,255,255,0.16)',
                    defaultIcon: 'account-outline',
                    selectedIcon: 'account'
                }
            ]
        };
    }

    componentWillMount() {
        console.log('Popup componentWillMount()');
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
    }

    componentDidMount() {
        console.log('Popup componentDidMount()');

        const { navigation } = this.props;
        const goUrl = navigation.getParam('url', 'default url'); //TODO default url 넣어야 함
        console.log('url: ', goUrl);
        this.setState({
            url: goUrl
        });
    }

    componentWillUnmount() {
        console.log('Popup componentWillUnmount()');
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color='white' name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    changeIcon = (key) => {
        const state = Object.assign({}, this.state)
        state.tabs[0].icon = state.tabs[0].defaultIcon;
        state.tabs[1].icon = state.tabs[1].defaultIcon;
        state.tabs[2].icon = state.tabs[2].defaultIcon;
        state.tabs[3].icon = state.tabs[3].defaultIcon;
        state.tabs[4].icon = state.tabs[4].defaultIcon;

        switch(key) {
            case 'home' :
                state.tabs[0].icon = state.tabs[0].selectedIcon;
                break;

            case 'back' :
                state.tabs[1].icon = state.tabs[1].selectedIcon;
                break;

            case 'category' :
                state.tabs[2].icon = state.tabs[2].selectedIcon;
                break;

            case 'farmStory' :
                state.tabs[3].icon = state.tabs[3].selectedIcon;
                break;

            case 'myPage' :
                state.tabs[4].icon = state.tabs[4].selectedIcon;
                break;
        }
        this.setState(state)
    };

    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
            this.webView.ref.goBack();
            return true;
        }
        return false;
    };

    sendInfoToWebView = (key) => {

        const data = JSON.stringify({tab: key});
        this.webView.ref.postMessage(data);

        switch(key) {
            case 'back' :
                // TODO navigation back과 webView의 back을 어떻게 같이  쓰지?? webView에서 postMessage로 back이 없음을 알려줘야 하나?
                this.props.navigation.goBack();
                break;
        }
    }

    render() {

        return (
            <View style={{flex: 1}}>

                <WebView
                    source={{uri: this.state.url}}
                    ref={(webView) => {
                        this.webView.ref = webView;
                    }}
                    onNavigationStateChange={(navState) => {
                        this.webView.canGoBack = navState.canGoBack;
                    }}
                />
                <BottomNavigation
                    onTabPress={newTab => this.sendInfoToWebView(newTab.key)}
                    renderTab={this.renderTab}
                    tabs={this.state.tabs}
                />
            </View>
            /*
            const { navigation } = this.props;
            const itemId = navigation.getParam('itemId', 'NO_ID');
            const otherParam = navigation.getParam('otherParam', 'some default value');

            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Login Page</Text>

                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>

                <Button
                    title="Go to Popup... Again"
                    onPress={() =>
                        this.props.navigation.push('Popup', {
                            itemId: Math.floor(Math.random() * 100),
                        })}
                />

                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />

                <Button
                    title="Go Back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>*/
        )
    }

}