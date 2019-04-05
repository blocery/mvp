import React from 'react';
import { StyleSheet, View, Text, Button, WebView, BackHandler, Platform } from 'react-native';
import { Server } from './Properties';
import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// 아이콘 검색 - https://fontawesome.com/icons?d=gallery

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Home',
        header: null
    };

    webView = {
        canGoBack: false,
        ref: null
    }

    constructor(props){
        super(props);
        this.state = {
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
    }

    sendInfoToWebView = (key) => {
        const data = JSON.stringify({tab: key});
        this.webView.ref.postMessage(data);
    }


    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
            this.webView.ref.goBack();
            return true;
        }
        return false;
    }

    componentWillMount() {
        console.log('HomeScreen componentWillMount()');
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
    }

    componentDidMount() {
        console.log('HomeScreen componentDidMount()');
    }

    componentWillUnmount() {
        console.log('HomeScreen componentWillUnmount()');
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    goPopupScreen = (event) => {
        const data = JSON.parse(event.nativeEvent.data);
        // alert(data.url);
        console.log('url : ', data.url);
        this.props.navigation.navigate('Popup', {
            url: data.url
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: Server.getMainPage()}}
                    ref={(webView) => {
                        this.webView.ref = webView;
                    }}
                    onNavigationStateChange={(navState) => {
                        this.webView.canGoBack = navState.canGoBack;
                    }}
                    onMessage={(event) => this.goPopupScreen(event)}
                />
                <BottomNavigation
                    onTabPress={newTab => this.sendInfoToWebView(newTab.key)}
                    renderTab={this.renderTab}
                    tabs={this.state.tabs}
                />
            </View>

/*
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Login"
                    onPress={() => {
                        this.props.navigation.navigate('Popup', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
                <Button
                    title="Home... Push"
                    onPress={() => {
                        this.props.navigation.push('Home', {
                            itemId: 80,
                            others: 'whatever you want'
                        })
                    }}
                />
            </View> */
        );
    }
}