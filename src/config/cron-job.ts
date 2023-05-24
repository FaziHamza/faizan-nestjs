import { CronJob } from 'cron';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { KnexSchemaBuilderService } from 'src/modules/knex-dynamic-schema/knex.service';

const CRON_TABLE = 'CRON_JOB';

export class KnexCronJob {
  constructor(
    @InjectModel() private knex: Knex,
    private knexSchemaService: KnexSchemaBuilderService,
  ) {
    // Create a cron job that runs at a specified interval
    const cronJob = new CronJob(
      this.runCronJobAfterEvery(1, 'Minute'),
      async () => {
        try {
          // Retrieve data from the CRON_JOB table
          const cronData = await this.knex<Record<string, any>>(
            CRON_TABLE,
          ).select('table_name', 'schema');

          // Process each row of cronData
          for (const { table_name, schema } of cronData) {
            console.log(
              `CRON for table ${table_name} with schema ${schema} STARTED`,
            );

            // Parse the JSON schema
            const parsedSchema = JSON.parse(schema);

            // Create or update the table based on the parsed schema
            await this.knexSchemaService.createOrUpdateTable(
              table_name,
              parsedSchema,
            );

            // Delete the current row from the CRON_JOB table
            await this.knex(CRON_TABLE).where({ table_name: table_name }).del();

            console.log(`CRON for table ${table_name} END`);
          }
        } catch (error) {
          console.error('An error occurred during cron job execution:', error);
        }
      },
    );

    // Start the cron job
    cronJob.start();
  }

  // Set the cron job schedule based on the given time and unit
  runCronJobAfterEvery(time: number, unit: 'Minute' | 'Hour'): string {
    let schedule: string;

    if (unit === 'Minute') {
      schedule = `*/${time} * * * *`;
    } else if (unit === 'Hour') {
      schedule = `0 */${time} * * *`;
    } else {
      throw new Error(
        'Invalid unit. Please provide either "Minute" or "Hour".',
      );
    }

    return schedule;
  }
}
