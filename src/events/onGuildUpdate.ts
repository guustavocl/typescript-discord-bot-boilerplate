import { Guild } from "discord.js";
import { BotClient } from "../interfaces/BotClient";
import { errorHandler } from "../utils/errorHandler";
import { registerGuildConfig } from "../services/guild.service";

export const onGuildUpdate = async (bot: BotClient, guild: Guild) => {
  try {
    await registerGuildConfig(guild);
    return;
  } catch (error) {
    errorHandler(error, "Error on guild update event");
  }
};
