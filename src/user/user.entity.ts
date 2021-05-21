import { Column, Model, Table, PrimaryKey, DataType, AllowNull, Unique, HasMany } from 'sequelize-typescript';
import { Rent } from '../rent/rent.entity';

@Table({
  tableName: "user"
})
export class User extends Model<User> {

  @PrimaryKey
  @Column(DataType.STRING)
  public id: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING) public email: string;

  @AllowNull(false)
  @Column(DataType.STRING) public name: string;

  @AllowNull(false)
  @Column(DataType.STRING) public password: string;

  @HasMany(() => Rent)
  public rent: Rent[];
}
