import { celebrate, Joi } from 'celebrate';

export const validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30)
      .required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  }),
});

export const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  }),
});

export const validationUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30)
      .required(),
    email: Joi.string().trim().email().required(),
  }),
});
