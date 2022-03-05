import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerComponent from './screens/DrawerNavigator/CustomDrawerComponent';
import LoadingScreen from './screens/AppSwitchNavigator/LoadingScreen';
import BooksReadingScreen from './screens/HomeTabNavigator/BooksReadingScreen';
import BooksReadScreen from './screens/HomeTabNavigator/BooksReadScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import colors from './assets/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { connect } from 'react-redux';
import SplashScreen from './screens/SplashScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import BooksCountContainer from './redux/containers/BooksCountContainer';
import { Ionicons } from '@expo/vector-icons';
class BookWorm extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    let unsubscribe;
    try {
      unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //sign in the user
          this.props.signIn(user);
        } else {
          console.log('No user signed in');
          //sign out the user
          this.props.signOut();
        }
        unsubscribe();
      });
    } catch (e) {
      //sign out user
      this.props.signOut();
    }
  };

  render() {
    if (this.props.auth.isLoading) {
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        {!this.props.auth.isSignedIn ? (
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.bgMain,
              },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerBackTitleVisible: false }}
            />
          </Stack.Navigator>
        ) : (
          <ActionSheetProvider>
            <AppDrawerNavigator />
          </ActionSheetProvider>
        )}
      </NavigationContainer>
    );
  }
}

const HomeTabNavigator = ({ navigation /*new addtion*/ }) => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput,
    }}
    screenOptions={({ route }) => ({
      headerStyle: { backgroundColor: colors.bgMain }, //new addition
      headerTintColor: 'white', //new addition
      //new addition
      headerLeft: () => (
        <Ionicons
          onPress={() => navigation.openDrawer()}
          name="ios-menu"
          size={30}
          color="white"
          style={{ marginLeft: 10 }}
        />
      ),
      tabBarStyle: { backgroundColor: colors.bgMain }, //new addition
      tabBarIcon: ({ color, size }) => {
        switch (route.name) {
          case 'Books':
            return <BooksCountContainer color={color} type="books" />;
          case 'BooksReading':
            return <BooksCountContainer color={color} type="booksReading" />;
          case 'BooksRead':
            return <BooksCountContainer color={color} type="booksRead" />;
        }
      },
    })}
  >
    <Tab.Screen name="Books" component={HomeScreen} />
    <Tab.Screen
      options={{
        title: 'Books Reading' /*new addition*/,
        tabBarLabel: 'Books Reading',
      }}
      name="BooksReading"
      component={BooksReadingScreen}
    />
    <Tab.Screen
      options={{
        title: 'Books Read' /*new addition*/,
        tabBarLabel: 'Books Read',
      }}
      name="BooksRead"
      component={BooksReadScreen}
    />
  </Tab.Navigator>
);

const HomeStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, //new addition
    }}
  >
    <Stack.Screen name="HomeTabNavigator" component={HomeTabNavigator} />
  </Stack.Navigator>
);

//new addition
const SettingsStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.bgMain },
      headerTintColor: 'white',
      headerLeft: () => (
        <Ionicons
          onPress={() => navigation.openDrawer()}
          name="ios-menu"
          size={30}
          color="white"
          style={{ marginLeft: 10 }}
        />
      ),
    }}
  >
    <Stack.Screen
      options={() => ({ title: 'Settings' })}
      name="SettingsScreen"
      component={SettingsScreen}
    />
  </Stack.Navigator>
);

const AppDrawerNavigator = ({ navigation }) => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }} //new addition
    drawerContent={(props) => <CustomDrawerComponent {...props} />}
  >
    <Drawer.Screen
      options={{ drawerIcon: () => <Ionicons name="ios-home" size={24} /> }}
      name="Home"
      component={HomeStackNavigator}
    />
    <Drawer.Screen
      options={{ drawerIcon: () => <Ionicons name="ios-settings" size={24} /> }}
      name="Settings"
      component={SettingsStackNavigator}
    />
  </Drawer.Navigator>
);

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: 'SIGN_IN', payload: user }),
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookWorm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
