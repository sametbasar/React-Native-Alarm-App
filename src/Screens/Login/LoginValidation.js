import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email adresi giriniz')
    .required('Bu alan boş geçilemez'),
  password: yup.string().required('Bu alan boş geçilemez'),
});
