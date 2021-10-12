import { Joi } from "celebrate";

export default {
  idValidator: { id: Joi.string().uuid().required() },
};
