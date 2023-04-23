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

    if (bot.config.mode === "production") {
      logger.info("Registering commands globally");
      await rest.put(Routes.applicationCommands(bot.user.id), {
        body: commandData,
      });
    } else {
      logger.info("Registering to home guild only!");
      await rest.put(Routes.applicationGuildCommands(bot.user.id, bot.config.guild), { body: commandData });
    }
  } catch (err) {
    await errorHandler(bot, err, "Error while registering slash commands");
  }
};
