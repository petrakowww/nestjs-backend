import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/users.model';

interface RoleCreationAttributes {
  value: string;
  description: string;
}

@Table({ tableName: 'user_role', createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole, RoleCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: string;
}
