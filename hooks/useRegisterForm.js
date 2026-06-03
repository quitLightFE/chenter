import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { registerUser } from '@/services';
import { useState } from 'react';

export const useRegisterForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setServerError('');

    try {
      await registerUser(data);
      router.replace('/dashboard');
    } catch (err) {
      console.error(err);

      const message =
        err?.data?.data?.email?.message ||
        err?.data?.message ||
        err?.message ||
        'Ошибка регистрации';

      const targetField = err?.data?.field;
      const validFields = ['name', 'email', 'password', 'passwordConfirm'];

      if (targetField && validFields.includes(targetField)) {
        setError(targetField, { type: 'server', message });
      } else {
        setServerError(message);
      }
    }
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    serverError,
    password,
  };
};
