import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import {Colors} from '../../constants/styles';

function AuthContent({isLogin, onAuthenticate}){
    const navigation = useNavigation();
    const [credentialsIsInvalid, setCredentialsInvalid] = useState({
        email: false,
        password: false,
        confirmEmail: false,
        confirmPassword: false
    });

    function switchAuthModeHandler(){
        if(isLogin){
            navigation.replace('Signup');
        }else{
            navigation.replace('Login');
        }
    }

    function submitHandler(credentials){
        let {email, confirmEmail, password, confirmPassword} = credentials;

        email = email.trim();
        password = password.trim();


        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
        const emailsAreEqual = email === confirmEmail;
        const passwordsAreEqual = password === confirmPassword;

        if(
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
        ){
            setCredentialsInvalid({
                email: !emailIsValid,
                confirmEmail: !emailIsValid || !emailsAreEqual,
                password: !passwordIsValid,
                confirmPassword: !passwordIsValid || !passwordsAreEqual
            });
            return;
        }
        onAuthenticate({email, password});
    }


    return(
        <View style={styles.authContent}>
            <AuthForm
                isLogin={isLogin}
                onSubmit={submitHandler}
                credentialsIsInvalid={credentialsIsInvalid}
            />
            <View style={styles.buttons}>
                <FlatButton onPress={switchAuthModeHandler}>
                    {isLogin ? 'Create a new user' : 'Log in instead'}
                </FlatButton>
            </View>
        </View>
    )
}

export default AuthContent;

const styles = StyleSheet.create({
    authContent:{
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        shadowColor:'black',
        shadowOpacity:0.35,
        shadowOffset:{width:1, height:1},
        shadowRadius:4,
    },
    buttons:{
        marginTop:8,
    }
})