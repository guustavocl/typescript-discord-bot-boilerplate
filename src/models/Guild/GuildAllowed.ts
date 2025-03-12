import { Document, model, Schema } from "mongoose";

export interface GuildAllowedProps extends Document {
  guildId: string;
  guildName: string;
  allowed: boolean;
  userId?: string;
}

const guildAllowedSchema = new Schema(
  {
    guildId: {
      type: String,
      required: true,
      unique: true,
    },
    guildName: { type: String },
    allowed: { type: Boolean, default: true },
    userId: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.updatedAt;
        delete returnedObject.createdAt;
      },
    },
  }
);

export default model<GuildAllowedProps>("GuildAllowed", guildAllowedSchema);
