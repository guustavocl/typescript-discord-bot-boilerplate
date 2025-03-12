import logger from "../utils/logger";
import { Guild } from "discord.js";
import { BotClient } from "../interfaces/BotClient";
import { errorHandler } from "../utils/errorHandler";
import { webhookHandler } from "../utils/webHookHandler";

export const onGuildDelete = async (bot: BotClient, guild: Guild) => {
  try {
    logger.info(`Bot removed from a Server ${guild.name} - ${guild.id}`);
    webhookHandler("LEAVE GUILD", `Bot saiu da guild ${guild.id} / ${guild.name} / ${guild.ownerId} foi removido`);
    return;
  } catch (error) {
    errorHandler(error, "Error on guild delete event");
  }
};
