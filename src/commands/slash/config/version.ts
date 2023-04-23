import { CacheType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { BotClient } from "../../../interfaces/BotClient";
import { SlashCommand } from "../../../interfaces/SlashCommand";
import { errorHandler } from "../../../utils/errorHandler";

export const version: SlashCommand = {
  data: new SlashCommandBuilder().setName("version").setDescription("Display version info about the bot."),
  run: async (bot: BotClient, interaction: ChatInputCommandInteraction<CacheType>) => {
    try {
      await interaction.deferReply();

      const embed = new EmbedBuilder();
      embed.setTitle("Bot Version");
      embed.setDescription(`Currently running version 1.0.0`);

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, "Error on version slash command");
    }
  },
};
