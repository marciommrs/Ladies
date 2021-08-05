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
import { useNavigation } from '@react-navigation/native';
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

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInuptRef = useRef<TextInput>(null);
  const { navigate } = useNavigation();

  const navigation = useNavigation();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // recuperação de senha
        await api.post('/password/forgot', {
          email: data.email,
        });

        navigate('SignIn');

        Alert.alert(
          'E-mail de recuperação enviado',
          'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro na recuperação de senha',
          'Ocorreu na recuperação de senha, tente novamente.',
        );
      }
    },
    [navigate],
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
              <Title>Recuperar senha</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInuptRef.current?.focus()}
              />
            </Form>
            <Button onPress={() => formRef.current?.submitForm()}>
              Recuperar
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

export default ForgotPassword;
