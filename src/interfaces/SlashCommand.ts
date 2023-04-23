import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import { BotClient } from "./BotClient";

export interface SlashCommand {
  data: SlashCommandBuilder | SlashCommandSubcommandBuilder;
  run: (bot: BotClient, interaction: ChatInputCommandInteraction) => Promise<void>;
}
