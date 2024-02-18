using EmployeeeManagment.Domain;
using EmployeeeManagment.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Service.Interface
{
    public interface IEmployee
    {
        Task<Response> Add(Employee emp);
        Task<Response> Update(Employee emp);
        Task<Response> Delete(int employeeId);
        Task<List<Employee>> GetAll();
        Task<Employee> GetById(int employeeId);
    }
}
