import logger from "../utils/logger";
import { BotClient } from "../interfaces/BotClient";
import { onMessage } from "./onMessage";
import { onGuildCreate } from "./onGuildCreate";
import { onInteraction } from "./onInteraction";
import { onGuildUpdate } from "./onGuildUpdate";
import { setBotClient } from "../services/bot.service";
import { webhookHandler } from "../utils/webHookHandler";
import { onGuildDelete } from "./onGuildDelete";
import { checkAllowedGuilds } from "../services/guild.service";

export const handleEvents = (bot: BotClient) => {
  bot.on("ready", async () => {
    logger.info("Bot is ready!");
    setBotClient(bot);

    // Carefull if you bypassing this on development make sure you arent on production db
    if (bot.config.production) {
      webhookHandler("Info Message", `Bot restarted <@${bot.config.ownerId}>`);
      checkAllowedGuilds();
    }
  });

  bot.on("messageCreate", async message => {
    await onMessage(bot, message);
  });

  bot.on("interactionCreate", async interaction => {
    await onInteraction(bot, interaction);
  });

  bot.on("guildCreate", async guild => {
    await onGuildCreate(bot, guild);
  });

  bot.on("guildDelete", async guild => {
    await onGuildDelete(bot, guild);
  });

  bot.on("guildUpdate", async guild => {
    await onGuildUpdate(bot, guild);
  });
};
