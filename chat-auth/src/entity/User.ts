import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    password: string;

    @Column({nullable: true})
    email: string;

}
