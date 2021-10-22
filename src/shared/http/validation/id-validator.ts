import { Joi } from "celebrate";
const idValidator = { id: Joi.string().uuid().required() };
export { idValidator };
