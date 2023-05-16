import { CacheType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { BotClient } from "../../../interfaces/BotClient";
import { SlashCommand } from "../../../interfaces/SlashCommand";
import { errorHandler } from "../../../utils/errorHandler";

const commandName = "version";
const versionSlashCommand: SlashCommand = {
  data: new SlashCommandBuilder().setName(commandName).setDescription("Display version info about the bot."),
  run: async (bot: BotClient, interaction: ChatInputCommandInteraction<CacheType>) => {
    try {
      await interaction.deferReply();

      const embed = new EmbedBuilder();
      embed.setTitle("Bot Version");
      embed.setDescription(`Currently running version 1.0.0`);

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, `Error on ${commandName} slash command`);
    }
  },
};
export default versionSlashCommand;
