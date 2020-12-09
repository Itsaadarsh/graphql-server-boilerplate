import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert} from "typeorm";
import * as bcrypt from "bcrypt"

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar",{length: 255})
    email: string;

    @Column("boolean", {default:false})
    confirmed: boolean;

    @Column("text")
    password: string;

    @BeforeInsert()
    async hash() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
