import { Message, PermissionFlagsBits } from "discord.js";
import { BotClient } from "../../../interfaces/BotClient";
import { MessageCommand } from "../../../interfaces/MessageCommand";
import { errorHandler } from "../../../utils/errorHandler";
import GuildConfig from "../../../models/GuildConfig";

export const prefix: MessageCommand = {
  name: "prefix",
  aliases: ["prefix"],
  run: async (bot: BotClient, message: Message, args?: string[]) => {
    try {
      if (args?.[0] && args[0].length < 3 && message.guild) {
        if (message.member?.permissions.has(PermissionFlagsBits.Administrator)) {
          await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { prefix: args[0] });
          message?.reply(`Prefix changed to: ${args[0]}`);
        } else {
          message?.reply(`Only admins can change the prefix!`);
        }
      }
    } catch (err) {
      await errorHandler(bot, err, `Error on ping slash command`);
    }
  },
};
