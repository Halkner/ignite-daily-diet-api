import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary()
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable()
        table.text('username').notNullable()
        table.text('password').notNullable()
        table.text('email').notNullable()
        table.uuid('sessionId').index()
    })

    await knex.schema.createTable('meals', (table) => {
        table.uuid('id').primary()
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable()
        table.text('name').notNullable()
        table.text('description').notNullable()
        table.timestamp('datetime').notNullable()
        table.integer('isDietMeal').notNullable()
        table.uuid('userId').unsigned()
        
        table.foreign('userId').references('users.id')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users').dropTableIfExists('meals')
}

