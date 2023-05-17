import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export function generateEntityFromJSON(json: any, tableName: string): any {
  @Entity({ name: tableName })
  class DynamicEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    constructor() {
      for (const key in json) {
        if (json.hasOwnProperty(key)) {
          this[key] = json[key];
        }
      }
    }
  }

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      let columnOptions = {};

      if (typeof json[key] === 'string') {
        columnOptions = { type: 'varchar' };
      } else if (typeof json[key] === 'number') {
        columnOptions = { type: 'int' };
      } else if (json[key] === true || json[key] === false) {
        columnOptions = {
          type: 'bit',
          transformer: {
            to(value) {
              return value ? 1 : 0;
            },
            from(value) {
              return value === 1;
            },
          },
        };
      } else if (json[key] instanceof Date) {
        columnOptions = { type: 'datetime' };
      }

      Reflect.defineMetadata(
        'design:type',
        typeof json[key],
        DynamicEntity.prototype,
        key,
      );
      Column(columnOptions)(DynamicEntity.prototype, key);
    }
  }

  return DynamicEntity;
}
