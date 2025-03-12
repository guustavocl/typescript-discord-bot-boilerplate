import { Message } from "discord.js";
import { BotClient } from "../interfaces/BotClient";
import { errorHandler } from "../utils/errorHandler";
import GuildConfig from "../models/Guild/GuildConfig";

export const onMessage = async (bot: BotClient, message: Message) => {
  try {
    if (message.author.bot || !message.content || !message.guild || message.guild.id !== bot.config.guildId) {
      return;
    }

    const guildConfig = await GuildConfig.findOneAndUpdate(
      { guildId: message.guild.id },
      { $inc: { totalTriggers: 1 } },
      { upsert: true },
    );

    if (guildConfig) {
      if (!message.content.startsWith(guildConfig.prefix)) {
        return;
      }

      const messageArray = message.content.split(" ");
      const command = messageArray[0].slice(guildConfig.prefix.length);
      const args = messageArray.slice(1);

      // Check if Command exist in Map Bot.messageCommands
      if (bot.messageCommands.get(command)) {
        await bot.messageCommands.get(command)?.run(bot, message, args);
      }
    }
  } catch (error) {
    errorHandler(error, "Error on message event");
  }
};
