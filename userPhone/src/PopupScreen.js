import React from 'react';
import { View, Text, Button, WebView, BackHandler, Platform } from 'react-native';
import { Server } from './Properties';
import AndroidWebView from 'react-native-webview-file-upload-android';


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

        console.log('PopupScreen url : ' + this.props.navigation.getParam('url', 'default url'))
        this.state = {
            url: this.props.navigation.getParam('url', 'default url'),
        };
    }

    componentWillMount() {
        // console.log('Popup componentWillMount()');
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
    }

    componentDidMount() {
        // console.log('Popup componentDidMount()');

        // const { navigation } = this.props;
        // const goUrl = navigation.getParam('url', 'default url'); //TODO default url 넣어야 함
        // // console.log('url: ', goUrl);
        // this.setState({
        //     url: goUrl
        // });
    }

    componentWillUnmount() {
        // console.log('Popup componentWillUnmount()');
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
            this.webView.ref.goBack();
            return true;
        }
        return false;
    };

    onMessage = (event) => {
        console.log('PopupScreen : ',event.nativeEvent.data)

        const { url, type, param } = JSON.parse(event.nativeEvent.data)

        if(type === 'NEW_POPUP') {

            this.props.navigation.push('Popup', {
                url: Server.getServerURL() + url,
                onGoBack: this.refresh
            })
        }else if(type === 'CLOSE_POPUP'){
            this.props.navigation.state.params.onGoBack(event.nativeEvent.data); //callback
            this.props.navigation.goBack(); //창 닫기
        }
    }

    // callback  string으로 넘어옴
    refresh = (data) => {
        console.log('PopupScreen refresh : ')
        this.webView.ref.postMessage(data);
    }

    render() {

        return (
            <View style={{flex: 1}}>
                {Platform.select({
                    android: () => <AndroidWebView
                        source={{uri: this.state.url}}
                        ref={(webView) => {
                            this.webView.ref = webView;
                        }}
                        onNavigationStateChange={(navState) => {
                            this.webView.canGoBack = navState.canGoBack;
                        }}
                        onMessage={(event) => this.onMessage(event)}
                    />,
                    ios: () => <WebView
                        source={{uri: this.state.url}}
                        ref={(webView) => {
                            this.webView.ref = webView;
                        }}
                        onNavigationStateChange={(navState) => {
                            this.webView.canGoBack = navState.canGoBack;
                        }}
                        onMessage={(event) => this.onMessage(event)}
                    />
                })()}

                {/*
                <WebView
                    source={{uri: this.state.url}}
                    ref={(webView) => {
                        this.webView.ref = webView;
                    }}
                    onNavigationStateChange={(navState) => {
                        this.webView.canGoBack = navState.canGoBack;
                    }}
                    onMessage={(event) => this.onMessage(event)}
                />
                */}
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