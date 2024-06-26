import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;

  @BeforeInsert()
  async hashedPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column()
  password: string;
}
