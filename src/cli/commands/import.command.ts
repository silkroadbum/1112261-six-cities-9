import chalk from "chalk";

import { Command } from "./command.interface.js";
import { TSVFileReader } from "../../shared/libs/file-reader/index.js";
import { CommandEnum } from "../consts/index.js";

export class ImportCommand implements Command {
  public getName(): CommandEnum {
    return CommandEnum.Import;
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(chalk.yellow(fileReader.toArray()));
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${error.message}`);
    }
  }
}
