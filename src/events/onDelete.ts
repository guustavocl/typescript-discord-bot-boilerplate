import { Message, PartialMessage } from "discord.js";
import { BotClient } from "../interfaces/BotClient";
import { errorHandler } from "../utils/errorHandler";

export const onDelete = async (bot: BotClient, message?: Message | PartialMessage) => {
  try {
    console.log("msg deleted");
    console.log(message?.content);
    // TO-DO what you want to do when a message is deleted!
    return;
  } catch (error) {
    await errorHandler(bot, error, "Error on delete event");
  }
};
