import { Column, Model, Table, PrimaryKey, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Film } from '../film/film.entity';

@Table({
  tableName: "rent"
})
export class Rent extends Model<Rent> {

  @PrimaryKey
  @Column(DataType.STRING)
  public id: string;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  public UserId: string;

  @ForeignKey(() => Film)
  @Column(DataType.STRING)
  public FilmId: string;

  @Column(DataType.BOOLEAN) public isRent: boolean;

  @BelongsTo(() => User)
  public user: User;

  @BelongsTo(() => Film)
  public film: Film;
 
}
