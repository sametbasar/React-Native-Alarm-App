import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email adresi giriniz')
    .required('Bu alan zorunlu'),
  password: yup
    .string()
    .min(8, ({min}) => `Şifreniz en az ${min} karakter olmalıdır`)
    .required('Bu alan zorunlu'),
  name: yup
    .string()
    .min(3, ({min}) => `İsminiz en az ${min} karakter olmalıdır`)
    .required('Bu alan zorunlu'),
  surname: yup
    .string()
    .min(3, ({min}) => `Soyadınız en az ${min} karakter olmalıdır`)
    .required('Bu alan zorunlu'),
  phone: yup
    .number()
    .min(10, ({min}) => `Telefon Numarası en az ${min} karakter olmalıdır`)
    .required('Bu alan zorunlu'),
  identityNumber: yup
    .number()
    .min(11, ({min}) => `Kimlik Numaranız en az ${min} karakter olmalıdır`)
    .required('Bu alan zorunlu'),
});
