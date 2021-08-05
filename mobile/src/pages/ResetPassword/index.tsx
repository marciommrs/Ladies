import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../component/Input';
import Button from '../../component/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackSignInButton,
  BackSignInButtonText,
} from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

interface RouteParams {
  token: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordConfirmationInuptRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { navigate } = useNavigation();

  const { params } = useRoute();
  const routeParams = params as RouteParams;

  const handleSignIn = useCallback(
    async (data: ResetPasswordFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const { token } = routeParams;

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        navigate('SignIn');

        Alert.alert(
          'Senha alterada com sucesso!',
          'Utilize a nova senha para acessar o sistema.',
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro na alteração de senha',
          'Ocorreu um erro na alteração de senha, tente novamente',
        );
      }
    },
    [navigate, routeParams],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Redefinir senha</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() =>
                  passwordConfirmationInuptRef.current?.focus()}
              />

              <Input
                ref={passwordConfirmationInuptRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmação da senha"
                textContentType="newPassword"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>
            <Button onPress={() => formRef.current?.submitForm()}>
              Alterar senha
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackSignInButton onPress={() => navigation.navigate('SignIn')}>
        <Icon name="log-in" size={20} color="#f6d002" />
        <BackSignInButtonText>Voltar ao login</BackSignInButtonText>
      </BackSignInButton>
    </>
  );
};

export default ResetPassword;
