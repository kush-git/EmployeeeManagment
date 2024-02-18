using EmployeeeManagment.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Service.Interface
{
    public interface IRole
    {
        Task<List<Role>> GetAll();
        Task<Role> GetById(int departmentId);
    }
}
