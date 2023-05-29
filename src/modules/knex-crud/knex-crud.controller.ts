import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { KnexCrudService } from './knex-crud.service';
import { AuthGuard } from '@nestjs/passport';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

// @UseGuards(AuthGuard('jwt'))
@Controller('knex-crud')
export class KnexCrudController {
  constructor(private readonly knexCrudService: KnexCrudService, @InjectModel() private knex: Knex) { }

  // @Post(':table')
  // async create(
  //   @Param('table') table: string,
  //   @Body() data: any,
  // ): Promise<number> {
  //   const transaction = await this.knexCrudService.transaction();
  //   try { 
  //     const id = await this.knexCrudService.create(table, data);
  //     await transaction.commit();
  //     return id;
  //   } catch (error) {
  //     await this.knexCrudService.rollback(transaction);
  //     throw error;
  //   }
  // }

  // @Post()
  // async create(
  //   @Body() data: any,
  // ) {

  //  let queryData1 = ['insert into employee(name, lastname, email) VALUES ($name, $lastname, $email)',
  // 'insert into usertbl(employee_id) VALUES ($employee_id)'
  // ]

  // // let queryData = ['insert into adress(name, email) VALUES ($name, $email)',
  // // 'insert into addressDetail(adress_Id) VALUES ($adressId)',
  // // 'insert into city(addressDetail_Id) VALUES ($addressDetailId)'
  // // ]

  // let queryData = ['insert into book(name, email) VALUES ($name, $email)',
  // 'insert into bookDetail(book_Id) VALUES ($bookId)',
  // ]
  // // jis me me employee me insertion kr k id ko ly k usertbl k table me insert kr du
  //   try {
  //     queryData.forEach(async element => {
  //       await this.knex.raw(element);
  // });
  //   } catch (error) {

  //   }
  // }
  @Post()
  async create(@Body() data: any) {
    const trx = await this.knex.transaction();
  
    let screenId = data.screenId;
    let modalData = data.modalData;
  
    let queryData = [
      { query: 'insert into employee(name, lastname, email) OUTPUT INSERTED.ID VALUES ($name, $lastname, $email)', returningPlaceholder: '$employee_id' },
      { query: 'insert into usertbl(employee_id) VALUES ($employee_id)' , returningPlaceholder: '$usertbl_id'},
      // ... other queries
    ];
  
    // Generate queryValues from queryData and incoming data
    let queryValues = {};
    queryData.forEach(queryObj => {
      const matches = queryObj.query.match(/\$[a-z_]+/gi);  // Match all placeholders in the query
      if (matches) {
        matches.forEach(match => {
          if (!(match in queryValues)) {
            queryValues[match] = modalData[match.slice(1)];  // Initialize the placeholder with its corresponding value from data
          }
        });
      }
    });
  
    try {
      for (let i = 0; i < queryData.length; i++) {
        let queryObj = queryData[i];
        let query = queryObj.query;
  
        for (const [key, value] of Object.entries(queryValues)) {
          if (value !== null) {
            query = query.replace(key, `'${value}'`);  // Replace the placeholder with its corresponding value
          }
        }
  
        const result = await trx.raw(query);
        
        if (queryObj.returningPlaceholder && result.length > 0 && result[0]?.ID) {
          queryValues[queryObj.returningPlaceholder] = result[0]?.ID;  // Store the returned id to replace the next placeholder
        }
      }
  
      await trx.commit();  // Commit the transaction
    } catch (error) {
      await trx.rollback();  // Rollback the transaction on error
      throw new Error(`Failed to execute queries: ${error}`);
    }
  }
  



  generateQuery(query, model) {
    const values = model.modalData;
    for (const key in values) {
      const value = typeof values[key] === 'string' ? `'${values[key]}'` : values[key];
      query = query.replace('$' + key, value);
    }
    return query;
  }
  @Get(':table')
  async read(@Param('table') table: string): Promise<any> {
    return this.knexCrudService.read(table);
  }

  @Get(':table/:id')
  async readById(
    @Param('table') table: string,
    @Param('id') id: number,
  ): Promise<any> {
    return this.knexCrudService.readById(table, id);
  }

  @Put(':table/:id')
  async update(
    @Param('table') table: string,
    @Param('id') id: number,
    @Body() data: any,
  ): Promise<void> {
    const transaction = await this.knexCrudService.transaction();
    try {
      await this.knexCrudService.update(table, id, data);
      await transaction.commit();
    } catch (error) {
      await this.knexCrudService.rollback(transaction);
      throw error;
    }
  }

  @Delete(':table/:id')
  async delete(
    @Param('table') table: string,
    @Param('id') id: number,
  ): Promise<void> {
    const transaction = await this.knexCrudService.transaction();
    try {
      await this.knexCrudService.delete(table, id);
      await transaction.commit();
    } catch (error) {
      await this.knexCrudService.rollback(transaction);
      throw error;
    }
  }
}
