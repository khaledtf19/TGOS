import Joi from "joi";

export const productValidation = (data) => {
  const schema = Joi.object({
    product_name: Joi.string().min(1).required(),
    product_description: Joi.string().min(10).required(),
    product_photo: Joi.string().uri().min(5).required(),
    product_type: Joi.string().min(1).required(),
    price: Joi.number().min(1).required(),
  });

  return schema.validate(data);
};
