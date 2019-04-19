import React from 'react';
import { ToastAndroid, View, WebView, BackHandler, Platform } from 'react-native';
import { Server } from './Properties';
import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AndroidWebView from 'react-native-webview-file-upload-android';
// 아이콘 검색 - https://materialdesignicons.com/

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

        console.log('constructor ==== ')

        this.state = {
            source: {uri: Server.getMainPage()},
            tabs : [
                {
                    key: 'home',
                    icon: 'home-outline',
                    label: '홈',
                    barColor: '#f3f3f3',
                    pressColor: 'rgba(255,255,255,0.16)'
                },
                {
                    key: 'goods',
                    icon: 'package-variant',
                    label: '상품목록',
                    barColor: '#f3f3f3',
                    pressColor: 'rgba(255,255,255,0.16)'
                },
                {
                    key: 'farmDiary',
                    icon: 'notebook',
                    label: '재배일지',
                    barColor: '#f3f3f3',
                    pressColor: 'rgba(255,255,255,0.16)'
                },
                {
                    key: 'myPage',
                    icon: 'account-outline',
                    label: '마이페이지',
                    barColor: '#f3f3f3',
                    pressColor: 'rgba(255,255,255,0.16)'
                }
            ]
        }
    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color='gray' name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            labelStyle={{ color: '#313131' }}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    sendInfoToWebView = (key) => {

        switch(key) {
            case 'home' :
                this.setState({
                    source: {uri: Server.getMainPage()}
                });
                break;
            case 'goods' :
                this.setState({
                    source: {uri: Server.getGoodsPage()}
                });
                break;
            case 'farmDiary' :
                this.setState({
                    source: {uri: Server.getDiaryPage()}
                });
                break;
            case 'myPage' :
                this.setState({
                    source: {uri: Server.getMyPage()}
                });
                break;
        }
    };

    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
            this.webView.ref.goBack();
        } else if(this.exitApp === undefined || !this.exitApp){
            ToastAndroid.show('한 번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
            this.exitApp = true;

            this.timeout = setTimeout(
                () => {
                    this.exitApp = false;
                }, 2000
            );
        } else {
            clearTimeout(this.timeout);
            BackHandler.exitApp();
        }
        return true;
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            this.exitApp = false;
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    // popup
    goPopupScreen = (event) => {
        const { url, type } = JSON.parse(event.nativeEvent.data);

        if(type === 'NEW_POPUP'){
            this.props.navigation.navigate('Popup', {
                url: Server.getServerURL() + url,
                onGoBack: this.refresh //callback
            });
        }
    };

    // callback  string으로 넘어옴
    refresh = (data) => {

        console.log('HomeScreen : ',data)

        const { url, param } = JSON.parse(data)

        //페이지 Redirection
        if(url){
            const uri = {uri: Server.getServerURL() + url}

            this.setState({
                key: this.state.key+1,  //새로고침을 위해
                source: uri
            })

        }else{
            this.webView.ref.postMessage(data);
        }

    }

    render() {
        return (
            <View style={{flex: 1}}>
                {Platform.select({
                    android: () => <AndroidWebView
                        //source={{ uri: 'https://mobilehtml5.org/ts/?id=23' }}
                        key={this.state.key}
                        source={this.state.source}
                        ref={(webView) => {
                            this.webView.ref = webView;
                        }}
                        onNavigationStateChange={(navState) => {
                            this.webView.canGoBack = navState.canGoBack;
                        }}
                        // onMessage={(event) => this.goPopupScreen(event)}
                        onMessage={this.goPopupScreen}
                    />,
                    ios:  () => <WebView
                        //source={{ uri: 'https://mobilehtml5.org/ts/?id=23' }}
                        key={this.state.key}
                        source={this.state.source}
                        ref={(webView) => {
                            this.webView.ref = webView;
                        }}
                        onNavigationStateChange={(navState) => {
                            this.webView.canGoBack = navState.canGoBack;
                        }}
                        // onMessage={(event) => this.goPopupScreen(event)}
                        onMessage={this.goPopupScreen}
                    />
                })()}
                {/*<WebView
                    key={this.state.key}
                    source={this.state.source}
                    ref={(webView) => {
                        this.webView.ref = webView;
                    }}
                    onNavigationStateChange={(navState) => {
                        this.webView.canGoBack = navState.canGoBack;
                    }}
                    // onMessage={(event) => this.goPopupScreen(event)}
                    onMessage={this.goPopupScreen}
                />*/}
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