import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
    NODE_ENV: Joi.string().valid('development', 'product', 'test').default('develompment'),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    port: value.PORT,
    jwtSecret: value.JWT_SECRET,
    nodeEnv: value.NODE_ENV,
};