import { Column, Model, Table, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';
import { Rent } from '../rent/rent.entity';

@Table({
  tableName: "film"
})
export class Film extends Model<Film> {

  @PrimaryKey
  @Column(DataType.STRING)
  public id: string;

  @Column(DataType.STRING) public title: String;

  @Column(DataType.STRING) public editor: String;

  @Column(DataType.INTEGER) public copies: number;

  @HasMany(() => Rent)
  public rent: Rent[];
 
}
