import { BotClient } from "./BotClient";
import { Message } from "discord.js";

export interface MessageCommand {
  name: string;
  aliases: string[];
  run: (bot: BotClient, message: Message, args?: string[]) => Promise<void>;
}
