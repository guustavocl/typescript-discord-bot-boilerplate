import dotenv from "dotenv";
import logger from "../utils/logger";
import { join } from "path";
import fs from "fs";
import { BotClient } from "../interfaces/BotClient";
import { errorHandler } from "./../utils/errorHandler";
import { WebhookClient } from "discord.js";
import { SlashCommand } from "../interfaces/SlashCommand";
import { MessageCommand } from "../interfaces/MessageCommand";

dotenv.config();

const recursiveLoadSlashCommands = async (bot: BotClient, rootDir: string) => {
  try {
    const files = fs.readdirSync(rootDir);
    for (const file of files) {
      const finalPath = join(rootDir, file);
      if (fs.statSync(finalPath).isDirectory()) {
        recursiveLoadSlashCommands(bot, finalPath);
      } else {
        const name = file.split(".")[0];
        const command = await import(finalPath);
        bot.slashCommands.set(name, command["default"] as SlashCommand);
        logger.info(`slash command ${file} loaded`);
      }
    }
  } catch (err) {
    errorHandler(err, `Error loading slash commands`);
  }
};

const recursiveLoadMessageCommands = async (bot: BotClient, rootDir: string) => {
  try {
    const files = fs.readdirSync(rootDir);
    for (const file of files) {
      const finalPath = join(rootDir, file);
      if (fs.statSync(finalPath).isDirectory()) {
        recursiveLoadMessageCommands(bot, finalPath);
      } else {
        const name = file.split(".")[0];
        const command = await import(finalPath);
        for (const alias of command[name].aliases) {
          bot.messageCommands.set(alias, command[name] as MessageCommand);
        }
        logger.info(`message command ${file} loaded`);
      }
    }
  } catch (err) {
    errorHandler(err, `Error loading slash commands`);
  }
};

export const botConfig = async (bot: BotClient) => {
  if (process.env.NODE_MODE === "production" && !process.env.BOT_TOKEN_PROD) {
    logger.error('Missing "BOT_TOKEN_PROD" environment variables!');
    process.exit(1);
  }
  if (process.env.NODE_MODE !== "production" && !process.env.BOT_TOKEN_DEV) {
    logger.error('Missing "BOT_TOKEN_DEV" environment variables!');
    process.exit(1);
  }
  if (!process.env.BOT_GUILD_ID) {
    logger.error('Missing "BOT_GUILD" environment variables!');
    process.exit(1);
  }
  if (!process.env.BOT_OWNER_ID) {
    logger.error('Missing "BOT_OWNER" environment variables!');
    process.exit(1);
  }
  if (!process.env.PROD_MONGO_URL) {
    logger.error('Missing "PROD_MONGO_URL" environment variables!');
    process.exit(1);
  }
  if (!process.env.TEST_MONGO_URL) {
    logger.error('Missing "TEST_MONGO_URL" environment variables!');
    process.exit(1);
  }

  const production = process.env.NODE_MODE === "production";

  bot.cache = {};
  bot.config = {
    token: (production ? process.env.BOT_TOKEN_PROD : process.env.BOT_TOKEN_DEV) || "",
    mode: process.env.NODE_MODE || "test",
    production: production,
    mongoUrl: production ? process.env.PROD_MONGO_URL : process.env.TEST_MONGO_URL,
    debugHook: production
      ? process.env.BOT_WEBHOOK_PROD
        ? new WebhookClient({
            url: process.env.BOT_WEBHOOK_PROD,
          })
        : undefined
      : process.env.BOT_WEBHOOK_DEV
      ? new WebhookClient({
          url: process.env.BOT_WEBHOOK_DEV,
        })
      : undefined,
    guildId: process.env.BOT_GUILD_ID,
    ownerId: process.env.BOT_OWNER_ID,
    adminRoleId: "1076589065656336506",
  };

  const rootDir = bot.config.mode === "production" ? "build" : "src";

  // Load slash commands
  bot.slashCommands = new Map<string, SlashCommand>([]);
  recursiveLoadSlashCommands(bot, join(process.cwd(), rootDir, "commands", "slash"));

  // Load message commands
  bot.messageCommands = new Map<string, MessageCommand>([]);
  recursiveLoadMessageCommands(bot, join(process.cwd(), rootDir, "commands", "message"));
};
