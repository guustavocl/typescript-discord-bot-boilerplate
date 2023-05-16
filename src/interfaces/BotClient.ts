import { SlashCommand } from "./SlashCommand";
import { MessageCommand } from "./MessageCommand";
import { Document } from "mongoose";
import { GuildConfigProps } from "../models/GuildConfig";
import { Client, WebhookClient } from "discord.js";

export interface BotClient extends Client {
  slashCommands: Map<string, SlashCommand>;
  messageCommands: Map<string, MessageCommand>;
  cache: {
    [key: string]: Omit<GuildConfigProps, keyof Document | "guildId">;
  };
  config: {
    token: string;
    mode: string;
    mongoUrl: string;
    debugHook?: WebhookClient | undefined;
    guildId: string;
    ownerId: string;
  };
}
