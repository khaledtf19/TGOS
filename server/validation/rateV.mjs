import Joi from "joi";

export const rateValidation = (data) => {
  const schema = Joi.object({
    productId: Joi.string().min(1).required(),
    rate: Joi.number().min(1).max(10).required(),
    rateContent: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(data);
};
