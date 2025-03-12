import { Interaction } from "discord.js";
import { BotClient } from "../interfaces/BotClient";
import { errorHandler } from "../utils/errorHandler";

export const onInteraction = async (bot: BotClient, interaction: Interaction) => {
  try {
    if (!interaction.guild) return;

    if (interaction.isChatInputCommand()) {
      if (bot.slashCommands.get(interaction.commandName)) {
        await bot.slashCommands.get(interaction.commandName)?.run(bot, interaction);
      }
    }
  } catch (err) {
    errorHandler(err, "Error on interaction event");
  }
};
