import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  
  import { User } from '../user/user.entity'
  import { Task } from '../task/task.entity'

  @Entity('list')
  export class List {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    name: string;

    @Column()
    description?: string;
    
    @ManyToOne(type => User)
    owner?: User;

    @Column()
    @CreateDateColumn()
    createdAt?: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt?: Date;

    @OneToMany(type => Task, task => task.list)
    tasks?: Task[];
  
    }
  