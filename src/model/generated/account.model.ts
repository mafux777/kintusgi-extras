import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  /**
   * Account address
   */
  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: true})
  kintsugi!: string | undefined | null

  @Column_("text", {nullable: true})
  karura!: string | undefined | null

  @Column_("text", {nullable: true})
  kusama!: string | undefined | null

  @Column_("text", {nullable: true})
  moonriver!: string | undefined | null
}
