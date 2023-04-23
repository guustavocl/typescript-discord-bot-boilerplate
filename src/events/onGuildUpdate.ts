import { Guild } from "discord.js";
import { BotClient } from "../interfaces/BotClient";
import { errorHandler } from "../utils/errorHandler";
import GuildConfig from "../models/GuildConfig";

export const onGuildUpdate = async (bot: BotClient, guild: Guild) => {
  try {
    await GuildConfig.findOneAndUpdate(
      { guildId: guild.id },
      {
        guildName: guild.name,
        ownerId: guild.ownerId,
        icon: guild.icon,
        banner: guild.banner,
        shardId: guild.shardId,
        memberCount: guild.memberCount,
        large: guild.large,
      },
      { upsert: true }
    );
    return;
  } catch (error) {
    await errorHandler(bot, error, "Error on guild create event");
  }
};
