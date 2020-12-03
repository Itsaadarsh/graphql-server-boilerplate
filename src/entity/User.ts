import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity} from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar",{length: 255})
    email: string;

    @Column("text")
    password: string;

    @BeforeInsert()
    addId(){ 
        this.id = uuidv4()
    }
}
