import chalk from 'chalk';

import { CommandEnum } from '../consts/index.js';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): CommandEnum {
    return CommandEnum.Help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.blue('Программа для подготовки данных для REST API сервера.')}
        ${chalk.red('Пример')}
            ${chalk.yellow('cli.js --<command> [--arguments]')}
        ${chalk.red('Команды:')}
            ${chalk.yellow('--version:                   # выводит номер версии')}
            ${chalk.yellow('--help:                      # печатает этот текст')}
            ${chalk.yellow('--import <path>:             # импортирует данные из TSV')}
            ${chalk.yellow('--generate <n> <path> <url>  # генерирует произвольное количество тестовых данных')}
    `);
  }
}
