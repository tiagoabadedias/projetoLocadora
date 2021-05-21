import { Column, Model, Table, PrimaryKey, DataType, AllowNull, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table({
  tableName: "Auth"
})
export class Auth extends Model<Auth> {

  @PrimaryKey
  @Column(DataType.STRING)
  public id: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING) public token: string;

  @Column(DataType.BOOLEAN) public isExpired: boolean;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  public UserId: string;

  @BelongsTo(() => User)
  public user: User;
}
