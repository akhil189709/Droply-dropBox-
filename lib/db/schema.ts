import { pgTable, text, uuid, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import path from "path";


export const files = pgTable('files', {

    id: uuid("id").defaultRandom().primaryKey(),

    //basic files and folder files
    name: text("name").notNull(),
    path: text("path").notNull(),//  /documents/projects/resume
    size: integer("size").notNull(),
    type: text("type").notNull(), // "folder",

    //Storage information
    fileUrl: text("file_url").notNull(), // URL to access the files
    thumbnailUrl: text("thumbnail_url"),

    //ownership information
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"), // parent folder id (Null for root items)

    // file/folder flags
    isFolder: boolean("is_Folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    //Time Stamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),


})
/*
parent: each file/folder can have one parent folder
children: each folder can have many child which can be file and folder
*/
export const filesRelations = relations(files, ({ one, many }) => ({

    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),

    //relationship to child file/folder
    children: many(files)
}))


//Type definations
export const File = typeof files.$inferSelect
export const NewFile = typeof files.$inferInsert


