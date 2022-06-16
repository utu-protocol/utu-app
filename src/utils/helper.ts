import {
  TELEGRAM_CONNECTION_TYPE_ID,
  TWITTER_CONNECTION_TYPE_ID,
} from "../config";

export const maskValues = (value: any) => {
  return value.replace(/(\d{2})(.*)(\d{2})/, "$1******$4");
};

export const getSocialConnectionType = (type: string) => {
  switch (Number(type)) {
    case TELEGRAM_CONNECTION_TYPE_ID:
      return "telegram";
    case TWITTER_CONNECTION_TYPE_ID:
      return "twitter";
    default:
      return type;
  }
};
