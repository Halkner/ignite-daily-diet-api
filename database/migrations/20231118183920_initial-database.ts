import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
        table.text('username').notNullable()
        table.text('password').notNullable()
        table.text('email').notNullable()
        table.uuid('session_id').index()
    })

    await knex.schema.createTable('meals', (table) => {
        table.uuid('id').primary()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
        table.text('name').notNullable()
        table.text('description').notNullable()
        table.timestamp('datetime').notNullable()
        table.boolean('isInDiet').notNullable()
        table.uuid('user_id').unsigned()
        
        table.foreign('user_id').references('users.id')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users').dropTableIfExists('meals')
}

