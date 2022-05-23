module.exports = class initial1653322394205 {
  name = 'initial1653322394205'

  async up(db) {
    await db.query(`CREATE TABLE "height" ("id" character varying NOT NULL, "absolute" integer NOT NULL, "active" integer NOT NULL, CONSTRAINT "PK_90f1773799ae13708b533416960" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_fe03a1fb7b771bdb2e4bb27623" ON "height" ("absolute") `)
    await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "token" character varying(4) NOT NULL, "from_chain" integer NOT NULL, "to_chain" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "amount" numeric NOT NULL, "from_id" character varying NOT NULL, "to_id" character varying NOT NULL, "height_id" character varying NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from_id") `)
    await db.query(`CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to_id") `)
    await db.query(`CREATE INDEX "IDX_89d515806f93bf55c6dcc03c45" ON "transfer" ("height_id") `)
    await db.query(`ALTER TABLE "account" DROP COLUMN "balance"`)
    await db.query(`ALTER TABLE "account" ADD "kintsugi" text`)
    await db.query(`ALTER TABLE "account" ADD "karura" text`)
    await db.query(`ALTER TABLE "account" ADD "kusama" text`)
    await db.query(`ALTER TABLE "account" ADD "moonriver" text`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_0751309c66e97eac9ef11493623" FOREIGN KEY ("to_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_89d515806f93bf55c6dcc03c45b" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "height"`)
    await db.query(`DROP INDEX "public"."IDX_fe03a1fb7b771bdb2e4bb27623"`)
    await db.query(`DROP TABLE "transfer"`)
    await db.query(`DROP INDEX "public"."IDX_76bdfed1a7eb27c6d8ecbb7349"`)
    await db.query(`DROP INDEX "public"."IDX_0751309c66e97eac9ef1149362"`)
    await db.query(`DROP INDEX "public"."IDX_89d515806f93bf55c6dcc03c45"`)
    await db.query(`ALTER TABLE "account" ADD "balance" numeric NOT NULL`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "kintsugi"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "karura"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "kusama"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "moonriver"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_89d515806f93bf55c6dcc03c45b"`)
  }
}
