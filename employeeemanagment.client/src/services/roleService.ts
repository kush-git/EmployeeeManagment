import { IRole, IResponse } from '../interface';
import { BaseService } from '../services';

export class RoleService {
    static getAll = async (): Promise<IRole[]> => {
        const result = await BaseService.createInstance().get('Department/GetAll')
        return result.data;
    }
}