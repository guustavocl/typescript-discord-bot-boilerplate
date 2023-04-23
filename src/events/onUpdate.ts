import { Message, PartialMessage } from "discord.js";
import { BotClient } from "../interfaces/BotClient";
import { errorHandler } from "../utils/errorHandler";

export const onUpdate = async (
  bot: BotClient,
  oldMessage: Message | PartialMessage,
  newMessage: Message | PartialMessage
) => {
  if (newMessage.partial) {
    try {
      newMessage = await newMessage.fetch();
    } catch (error) {
      return await errorHandler(bot, error, "Error fetching partial message");
    }
  }

  if (newMessage.author.bot || !newMessage.content || !newMessage.guild) {
    return;
  }

  // TO-DO what you want to do when a message is updated!
  return;
};
