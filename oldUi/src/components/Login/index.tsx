import { Box, Button, TextField } from '@mui/material';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import auth from 'src/store/auth';
import { LoginPayload } from 'src/store/auth/types';

const Login = (): JSX.Element => {
  const { control, handleSubmit } = useForm<LoginPayload>({
    defaultValues: { login: '', password: '' },
  });

  const onSubmit: SubmitHandler<LoginPayload> = (data) => auth.signIn(data);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '650px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
    >
      <Controller
        name="login"
        control={control}
        render={({ field }) => <TextField fullWidth sx={{ mb: 3 }} label="Логин" {...field} />}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => <TextField type="password" fullWidth sx={{ mb: 3 }} label="Пароль" {...field} />}
      />
      <Button fullWidth variant="contained" type="submit">
        Войти
      </Button>
    </Box>
  );
};

export default Login;
