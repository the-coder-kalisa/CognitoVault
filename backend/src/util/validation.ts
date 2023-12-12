import Joi from "joi";

export const userSchema = Joi.object({
  fullname: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
