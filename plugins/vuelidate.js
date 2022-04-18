import { extend } from 'vee-validate'
import { required, email, between, min ,max,confirmed} from 'vee-validate/dist/rules'
extend('required', {
  ...required,
  message: 'required_validate'
})

extend('email', {
  ...email,
  message: 'email_validate'
})
extend('min', {
  ...max,
  message: 'min_validate'
})
extend('max', {
  ...min,
  message: 'max_validate'
})
extend('confirmed', {
  ...confirmed,
  message: 'confirmed_validate'
})
extend('between',  {
  ...between,
  message: 'between_validate'
}) 
