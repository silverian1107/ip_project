export type TokensType = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // in milliseconds
};

export type JwtPayloadType = {
  session: string;
  iat: number;
  exp: number;
};

export type NetworkType = 'mainnet' | 'testnet';
export type JobPayload = { salt: string };

export type MailerActiveAdminPayload = {
  email: string;
  link: string;
  siteName: string;
};
