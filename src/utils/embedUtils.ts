import { ColorResolvable, EmbedBuilder } from "discord.js";
import { errorHandler } from "./errorHandler";
import { getBotClient } from "../services/bot.service";

export const createNewEmbed = (title: string, color = "#9333ea") => {
  const bot = getBotClient();
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(`-`)
    .setColor(color as ColorResolvable)
    .setFooter({
      text: "Futures Bot~",
      iconURL: bot.user?.displayAvatarURL(),
    })
    .setTimestamp();
  return embed;
};

export const errorEmbedService = (embed: EmbedBuilder, err: Error, commandName: string, title = "Command failed") => {
  embed.setTitle(title);
  embed.setDescription(err.message || "Something went wrong!");
  embed.setColor("#b91c1c");
  errorHandler(err, `Error while calling service on ${commandName} slash command`);
};
