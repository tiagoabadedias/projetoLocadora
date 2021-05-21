import { Sequelize } from 'sequelize-typescript';
import { Film } from '../../film/film.entity';
import { User } from '../../user/user.entity';
import { Rent } from '../../rent/rent.entity';
import { Auth } from '../../auth/auth.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: "bmlx3df4ma7r1yh4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        username: "scj2yqdzveml2q1c",
        password: "q1s9dgv8rhe0vjqx",
        database: "lte7u4simgynaard",        
      });
      sequelize.addModels([
        Film,
        User,
        Rent,
        Auth
      ]);
      await sequelize.sync();
      return sequelize;
    },
    
  }
];
