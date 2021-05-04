import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';

  import { List } from '../list/list.entity';
  
  @Entity('task')
  export class Task {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ type: 'varchar', nullable: false }) 
    name: string;

    @Column({ nullable: true })
    priority?: number;  

    @CreateDateColumn({name: 'created_at'}) 
    createdAt?: Date;

    @CreateDateColumn({name: 'updated_at'}) 
    updatedAt?: Date;
  
    @ManyToOne(type => List, list => list.tasks)
    list?: List;
  }
  