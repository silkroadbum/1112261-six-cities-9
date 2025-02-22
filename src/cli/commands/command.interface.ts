import { CommandEnum } from '../consts/commands.js';

export interface Command {
  getName(): CommandEnum;
  execute(...parameters: string[]): void;
}
