import { CacheType, ChatInputCommandInteraction, Guild as GuildDiscord } from "discord.js";
import { getBotClient } from "./bot.service";
import { webhookHandler } from "../utils/webHookHandler";
import GuildAllowed from "../models/Guild/GuildAllowed";
import GuildConfig from "../models/Guild/GuildConfig";

export const registerGuildConfig = async (guild: GuildDiscord) => {
  return await GuildConfig.findOneAndUpdate(
    { guildId: guild.id },
    {
      guildId: guild.id,
      guildName: guild.name,
      ownerId: guild.ownerId,
      icon: guild.icon,
      banner: guild.banner,
      shardId: guild.shardId,
      memberCount: guild.memberCount,
      large: guild.large,
    },
    { upsert: true },
  );
};

export const isGuildAllowed = async (guildId: string) => {
  const guild = await GuildAllowed.findOne({ guildId: guildId });
  return guild && guild.allowed;
};

export const allowGuild = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const guildId = interaction.options.get("guildid")?.value?.toString().trim();
  const userId = interaction.options.get("userid")?.value?.toString().trim();
  return await GuildAllowed.findOneAndUpdate(
    { guildId: guildId },
    { guildId: guildId, userId: userId },
    { upsert: true },
  );
};

export const checkAllowedGuilds = async () => {
  const bot = getBotClient();
  if (bot) {
    const guilds = bot.guilds;
    guilds.cache.map(async guild => {
      if (guild.id !== bot.config.guildId) {
        if (!(await isGuildAllowed(guild.id))) {
          bot.guilds.cache.get(guild.id)?.leave();
          webhookHandler(
            "LEAVE GUILD",
            `Bot saiu da guild ${guild.id} / ${guild.name} / ${guild.ownerId} pois nao é permitido nessa guild`,
          );
        }
      }
    });
  }
};
