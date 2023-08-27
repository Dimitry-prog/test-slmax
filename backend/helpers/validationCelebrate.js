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

export const validationCreateChat = celebrate({
  body: Joi.object().keys({
    title: Joi.string().trim().min(2).required(),
  }),
});

export const validationCreateMessage = celebrate({
  body: Joi.object().keys({
    message: Joi.string().trim().min(2).required(),
    chatId: Joi.string().hex().length(24).required(),
  }),
});

export const validationAddUserToChat = celebrate(
  {
    params: Joi.object().keys({
      chatId: Joi.string().hex().length(24).required(),
    }),
  },
);
