import { Message } from "discord.js";
import { BotClient } from "../../interfaces/BotClient";
import { MessageCommand } from "../../interfaces/MessageCommand";
import { errorHandler } from "../../utils/errorHandler";

export const ping: MessageCommand = {
  name: "ping",
  aliases: ["ping", "p"],
  run: async (bot: BotClient, message?: Message) => {
    try {
      message?.reply("pong!");
    } catch (err) {
      await errorHandler(err, `Error on ping slash command`);
    }
  },
};
