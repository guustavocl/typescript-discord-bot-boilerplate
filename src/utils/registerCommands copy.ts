import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import { BotClient } from "../interfaces/BotClient";
import { errorHandler } from "./errorHandler";
import logger from "./logger";

export const registerCommands = async (bot: BotClient) => {
  try {
    if (!bot.user?.id) {
      logger.error("Cannot register commands as bot has not authenticated to Discord.");
      return;
    }
    const rest = new REST({ version: "10" }).setToken(bot.config.token);
    const slashCommands = [...bot.slashCommands.keys()];
    const commandData = slashCommands.map(command => bot.slashCommands.get(command)?.data?.toJSON());
    if (!commandData.length) {
      logger.warn("No commands found to register.");
      return;
    }

    logger.info("Registering to guilds");
    const guilds = bot.guilds.cache;
    guilds.map(async guild => {
      await rest.put(Routes.applicationGuildCommands(bot.user?.id || "", guild.id), { body: commandData });
    });
  } catch (err) {
    errorHandler(err, "Error while registering slash commands");
  }
};

export const addCommandsToNewGuild = async (bot: BotClient, guildId: string) => {
  try {
    if (!bot.user?.id) {
      logger.error("Cannot register commands as bot has not authenticated to Discord.");
      return;
    }
    const rest = new REST({ version: "10" }).setToken(bot.config.token);
    const slashCommands = [...bot.slashCommands.keys()];
    const commandData = slashCommands.map(command => bot.slashCommands.get(command)?.data?.toJSON());
    if (!commandData.length) {
      logger.warn("No commands found to register.");
      return;
    }

    logger.info("Registering commands to new guild!");
    await rest.put(Routes.applicationGuildCommands(bot.user.id, guildId), { body: commandData });
  } catch (err) {
    errorHandler(err, "Error while registering slash commands");
  }
};
