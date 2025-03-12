import { BotClient } from "../interfaces/BotClient";

let botClient: BotClient;

export const setBotClient = (newBotClient: BotClient) => {
  botClient = newBotClient;
};

export const getBotClient = () => {
  return botClient;
};
