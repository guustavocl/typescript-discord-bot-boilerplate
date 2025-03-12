import logger from "../utils/logger";
import { Guild } from "discord.js";
import { BotClient } from "../interfaces/BotClient";
import { errorHandler } from "../utils/errorHandler";
import { isGuildAllowed, registerGuildConfig } from "../services/guild.service";
import { webhookHandler } from "../utils/webHookHandler";
import { addCommandsToNewGuild } from "../utils/registerCommands copy";

export const onGuildCreate = async (bot: BotClient, guild: Guild) => {
  try {
    logger.info(`Bot entered a new Server ${guild.name} - ${guild.id}`);

    if (await isGuildAllowed(guild.id)) {
      await registerGuildConfig(guild);
      addCommandsToNewGuild(bot, guild.id);
    } else {
      bot.guilds.cache.get(guild.id)?.leave();
      webhookHandler(
        "LEAVE GUILD",
        `Bot saiu da guild ${guild.id} / ${guild.name} / ${guild.ownerId} pois nao é permitido nessa guild`
      );
    }

    return;
  } catch (error) {
    errorHandler(error, "Error on guild create event");
  }
};
