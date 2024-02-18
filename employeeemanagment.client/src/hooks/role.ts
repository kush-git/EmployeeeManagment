import { IRole } from '../interface';
import { useEffect, useState } from 'react';
import { RoleService } from '../services';

export const RoleHook = (loadingRole: boolean) => {
    const [data, setData] = useState<IRole[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await RoleService.getAll();
                setData([...result]);
            }
            catch (error: any) {
                setData([]);
                setError(error.toString())
            }
            finally {
                setLoading(false);
            }
        }

        if (loadingRole) {
            fetchData();
        }
    }, [loadingRole])

    return { data, loading, error, setData }
}