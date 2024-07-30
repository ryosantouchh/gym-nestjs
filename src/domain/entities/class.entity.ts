import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: 60 })
  duration: number

  // @OneToOne(() => ClassType)
  // classType: ClassType

  // @OneToMany(() => Trainer, (trainer) => trainer.class)
  // trainers: Trainer[]

  @Column({ default: false })
  isDeleted: boolean

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date
}
