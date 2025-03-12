import { getBotClient } from "../services/bot.service";
import { createNewEmbed } from "./embedUtils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const webhookHandler = async (title: string, message: string, stack?: any) => {
  const bot = getBotClient();

  if (bot.config.debugHook) {
    const embed = createNewEmbed(title, stack ? "#b91c1c" : "#7e22ce");
    embed.setDescription(`${stack ? `\`\`\`\n${stack}\n\`\`\`` : "👾👾👾👾👾"}`);
    embed.addFields([{ name: title, value: message }]);

    bot.config.debugHook.send({
      embeds: [embed],
    });
  }
};
