import { EmbedBuilder } from "discord.js";
import { BotClient } from "../interfaces/BotClient";
import logger from "./logger";

export const errorHandler = async (bot: BotClient, err: unknown, message: string) => {
  const error = err as Error;
  const stack = JSON.stringify(error.stack || { stack: "not found" }, null, 2);
  logger.error(error.message, message);
  logger.error(`Stack trace:\n${stack}`);

  if (bot.config.debugHook) {
    const embed = new EmbedBuilder();
    embed.setTitle(message);
    embed.setDescription(`\`\`\`\n${stack}\n\`\`\``);
    embed.addFields([{ name: `Error message`, value: error.message }]);
    await bot.config.debugHook.send({ embeds: [embed] });
  }
};
