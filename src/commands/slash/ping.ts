import { CacheType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { BotClient } from "../../interfaces/BotClient";
import { SlashCommand } from "../../interfaces/SlashCommand";
import { errorHandler } from "../../utils/errorHandler";

const commandName = "ping";
const pingSlashCommand: SlashCommand = {
  data: new SlashCommandBuilder().setName(commandName).setDescription("Just a ping command."),
  run: async (bot: BotClient, interaction: ChatInputCommandInteraction<CacheType>) => {
    try {
      await interaction.deferReply();

      const embed = new EmbedBuilder();
      embed.setTitle("Pong!");

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, `Error on ${commandName} slash command`);
    }
  },
};
export default pingSlashCommand;
