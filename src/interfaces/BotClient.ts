import { SlashCommand } from "./SlashCommand";
import { MessageCommand } from "./MessageCommand";
import { Document } from "mongoose";
import { Client, WebhookClient } from "discord.js";
import { GuildConfigProps } from "../models/Guild/GuildConfig";

export interface BotClient extends Client {
  slashCommands: Map<string, SlashCommand>;
  messageCommands: Map<string, MessageCommand>;
  cache: {
    [key: string]: Omit<GuildConfigProps, keyof Document | "guildId">;
  };
  config: {
    token: string;
    mode: string;
    production: boolean;
    mongoUrl: string;
    debugHook?: WebhookClient | undefined;
    guildId: string;
    ownerId: string;
    adminRoleId: string;
  };
}
