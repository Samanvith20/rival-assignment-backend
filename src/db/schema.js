import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", [
  "USER",
  "ADMIN",
]);

export const taskStatusEnum = pgEnum(
  "task_status",
  [
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
  ]
);

export const taskPriorityEnum = pgEnum(
  "task_priority",
  [
    "LOW",
    "MEDIUM",
    "HIGH",
  ]
);

export const users = pgTable("users", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  name: varchar("name", {
    length: 255,
  }).notNull(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  passwordHash: text(
    "password_hash"
  ).notNull(),

  role: roleEnum("role")
    .default("USER")
    .notNull(),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  createdAt: timestamp(
    "created_at"
  )
    .defaultNow()
    .notNull(),

  updatedAt: timestamp(
    "updated_at"
  )
    .defaultNow()
    .notNull(),
});


export const tasks = pgTable("tasks", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  title: varchar("title", {
    length: 255,
  }).notNull(),

  description: text(
    "description"
  ),

  status: taskStatusEnum(
    "status"
  )
    .default("PENDING")
    .notNull(),

  priority: taskPriorityEnum(
    "priority"
  )
    .default("MEDIUM")
    .notNull(),

  dueDate: timestamp(
    "due_date"
  ),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  createdAt: timestamp(
    "created_at"
  )
    .defaultNow()
    .notNull(),

  updatedAt: timestamp(
    "updated_at"
  )
    .defaultNow()
    .notNull(),
});