import { TextField, Button, Box } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { FormValues } from 'src/store/auth/types';

import auth from 'src/store/auth';

const Login = (): JSX.Element => {
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { password: '', login: '' } });

  const onSubmit: SubmitHandler<FormValues> = (data): void => {
    auth.login(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        top: '50%',
        left: '50%',
        width: '40%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <Controller
        control={control}
        name="login"
        render={({ field }) => <TextField size="small" sx={{ mb: 3 }} {...field} />}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => <TextField type="password" size="small" sx={{ mb: 3 }} {...field} />}
      />
      <Button type="submit" variant="contained">
        Войти
      </Button>
    </Box>
  );
};

export default Login;
