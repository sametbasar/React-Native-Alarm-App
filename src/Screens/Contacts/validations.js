import * as yup from 'yup';

export const ContactValidations = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email adresi giriniz')
    .required('Bu alan boş geçilemez'),
  name: yup.string().required('Bu alan boş geçilemez'),
  surname: yup.string().required('Bu alan boş geçilemez'),
  phone: yup.number().required('Bu alab boş geçilemez'),
});
