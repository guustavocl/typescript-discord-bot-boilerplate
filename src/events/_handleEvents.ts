import logger from "../utils/logger";
import { BotClient } from "../interfaces/BotClient";
import { onUpdate } from "./onUpdate";
import { onDelete } from "./onDelete";
import { onMessage } from "./onMessage";
import { onGuildCreate } from "./onGuildCreate";
import { onInteraction } from "./onInteraction";
import { onGuildUpdate } from "./onGuildUpdate";

export const handleEvents = (bot: BotClient) => {
  bot.on("ready", () => {
    logger.info("Bot is ready!");
  });

  bot.on("messageCreate", async message => {
    await onMessage(bot, message);
  });

  bot.on("messageUpdate", async (oldMessage, newMessage) => {
    await onUpdate(bot, oldMessage, newMessage);
  });

  bot.on("messageDelete", async message => {
    await onDelete(bot, message);
  });

  bot.on("interactionCreate", async interaction => {
    await onInteraction(bot, interaction);
  });

  bot.on("guildCreate", async guild => {
    await onGuildCreate(bot, guild);
  });

  bot.on("guildUpdate", async guild => {
    await onGuildUpdate(bot, guild);
  });
};
