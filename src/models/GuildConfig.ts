import { Document, model, Schema } from "mongoose";

export interface GuildConfigProps extends Document {
  guildId: string;
  guildName: string;
  ownerId: string;
  icon: string;
  banner: string;
  shardId: number;
  memberCount: number;
  large: boolean;
  totalTriggers: number;
  prefix: string;
}

const GuildConfigSchema = new Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  guildName: { type: String },
  ownerId: { type: String },
  icon: { type: String },
  banner: { type: String },
  shardId: { type: Number, default: 0 },
  memberCount: { type: Number, default: 0 },
  large: { type: Boolean, default: false },
  totalTriggers: {
    type: Number,
    required: false,
    unique: false,
    default: 0,
  },
  prefix: { required: true, type: String, default: ">" },
});

export default model<GuildConfigProps>("GuildConfig", GuildConfigSchema);
