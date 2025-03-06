import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join((process.cwd(), '.env')),
});

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  bcrypt_solt:process.env.BCRYPT_SOLT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  access_token_expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
};
