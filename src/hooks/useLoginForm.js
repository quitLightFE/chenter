import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/services';
import { useState } from 'react';

export const useLoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');

    try {
      await loginUser({ ...data, rememberMe });
      router.replace('/dashboard');
    } catch (err) {
      const errorData = err?.response?.data;
      const message = errorData?.message || err?.message || 'Ошибка входа';
      const targetField = errorData?.field;

      if (targetField === 'email' || targetField === 'password') {
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
    rememberMe,
    setRememberMe,
  };
};
