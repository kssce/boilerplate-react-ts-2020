import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { login, User } from '../../data/auth/authReducer';
import { HookFormable } from '../../models/Form';
import { ID, PW } from './lib/constants';
import { FormableError } from './lib/data';
import { pwRules, idRules } from './lib/validation';
import { rootRouter } from '../pages/routes';
import { selectIsLogin } from '../../lib/helpers/selector';

function LoginContainer() {
  const isLogin = useSelector(selectIsLogin);
  if (isLogin) {
    return <Redirect to={rootRouter.uri} />;
  }
  return <Login />;
}

function Login() {
  const { control, errors, handleSubmit } = useForm<HookFormable & User>();
  const { submit } = useMethods();

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor={ID.field}>{ID.label}</label>
          <Controller
            as={<input type="text" />}
            name={ID.field}
            control={control}
            id={ID.field}
            variant="outlined"
            defaultValue=""
            rules={idRules}
          />
          <ErrPrinter errors={errors} field={ID.field} />
        </div>
        <div>
          <label htmlFor={PW.field}>{PW.label}</label>
          <Controller
            as={<input type="password" />}
            name={PW.field}
            control={control}
            id={PW.field}
            variant="outlined"
            defaultValue=""
            rules={pwRules}
          />
          <ErrPrinter errors={errors} field={PW.field} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function useMethods() {
  const dispatch = useDispatch();

  const submit = useCallback(
    (data: HookFormable) => {
      dispatch(login(data));
    },
    [dispatch],
  );

  return useMemo(() => ({ submit }), [submit]);
}

function ErrPrinter({ errors, field }: FormableError) {
  if (errors && errors[field]) {
    return <div>{errors[field].message}</div>;
  }
  return null;
}

export default LoginContainer;
