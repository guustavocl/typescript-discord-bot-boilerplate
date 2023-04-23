import http from "http";
import express from "express";
import mongoose from "mongoose";
import logger from "./utils/logger";
import { Client, Partials } from "discord.js";
import { botConfig } from "./config/botConfig";
import { BotClient } from "./interfaces/BotClient";
import { handleEvents } from "./events/_handleEvents";
import { errorHandler } from "./utils/errorHandler";
import { IntentOptions } from "./config/botIntents";
import { registerCommands } from "./utils/registerCommands";

const botApi = express();

(async () => {
  const bot = new Client({
    intents: IntentOptions,
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  }) as BotClient;

  botConfig(bot);

  mongoose
    .connect(bot.config.mongoUrl, { retryWrites: true })
    .then(async () => {
      logger.info("Mongoose successfully connected!");

      handleEvents(bot);
      await bot.login(bot.config.token).catch(err => errorHandler(bot, err, "Error on login"));
      await registerCommands(bot);

      botApi.get("/", (req, res) => res.send("Discord bot is running"));
      botApi.get("/ping", (req, res) => res.send("pong"));
      http.createServer(botApi).listen(3000, () => logger.info("Bot API is up"));
    })
    .catch(error => {
      logger.error(error, "Mongoose error");
    });
})();
