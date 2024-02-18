using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using EmployeeeManagment.Domain;
using EmployeeeManagment.Domain.Models;
using EmployeeManagement.Service.Helper;
using EmployeeManagement.Service.Interface;

namespace EmployeeManagement.Service
{
    public class EmployeeService : IEmployee
    {
        private AppDbContext _context;
        private readonly ApplicationSettings _appSettings;
        public EmployeeService(AppDbContext context, ApplicationSettings applicationSettings)
        {
            _context = context;
            _appSettings = applicationSettings;
        }
        public async Task<Response> Add(Employee emp)
        {
            try
            {
                var employee = new Employee()
                {
                    FirstName = emp.FirstName,
                    LastName = emp.LastName,
                    DateJoined = emp.DateJoined,
                    EmployeeNumber = emp.EmployeeNumber,
                    Extension = emp.Extension,
                    RoleId = emp.RoleId,
                    Role = emp.Role,
                    EmployeeId = emp.EmployeeId,
                };
                await _context.Employees.AddAsync(employee);
                await _context.SaveChangesAsync();

                return new Response
                {
                    EmployeeId = (int)employee.EmployeeId,
                    IsSuccess = true,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "CreateEmployeeSuccess"),
                    HttpStatusCode = HttpStatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "CreateEmployeeFailure") + " " + ex.Message.ToString(),
                    HttpStatusCode = HttpStatusCode.BadRequest,
                };
            }
        }

        public async Task<Response> Update(Employee emp)
        {
            try
            {
                if (emp.EmployeeId <= 0)
                {
                    return new Response
                    {
                        EmployeeId = (int)emp.EmployeeId,
                        IsSuccess = true,
                        Message = _appSettings.GetConfigurationValue("EmployeeMessages", "EmployeeNotFound"),
                        HttpStatusCode = HttpStatusCode.BadRequest,
                    };
                }

                var employee = _context.Employees.Where(x => x.EmployeeId == emp.EmployeeId).FirstOrDefault();
                if (employee == null)
                {
                    return new Response
                    {
                        EmployeeId = (int)emp.EmployeeId,
                        IsSuccess = true,
                        Message = _appSettings.GetConfigurationValue("EmployeeMessages", "EmployeeNotFound"),
                        HttpStatusCode = HttpStatusCode.BadRequest,
                    };
                }
                employee.FirstName = emp.FirstName;
                employee.LastName = emp.LastName;
                employee.DateJoined = emp.DateJoined;
                employee.EmployeeNumber = emp.EmployeeNumber;
                employee.Extension = emp.Extension;
                employee.RoleId = emp.RoleId;
                employee.Role = emp.Role;
                employee.EmployeeId = emp.EmployeeId;

                await _context.SaveChangesAsync();

                return new Response
                {
                    EmployeeId = (int)employee.EmployeeId,
                    IsSuccess = true,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "UpdateEmployeeSuccess"),
                    HttpStatusCode = HttpStatusCode.OK,
                };

            }
            catch (Exception ex)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "UpdateEmployeeFailure") +" "+ ex.Message.ToString(),
                    HttpStatusCode = HttpStatusCode.BadRequest,
                };
            }
        }

        public async Task<Response> Delete(int EmployeeId)
        {
            try
            {
                if (EmployeeId <= 0)
                {
                    return new Response
                    {
                        IsSuccess = false,
                        Message = _appSettings.GetConfigurationValue("EmployeeMessages", "EmployeeNotFound"),
                        HttpStatusCode = HttpStatusCode.BadRequest,
                    };
                }

                var employee = _context.Employees.Where(x => x.EmployeeId == EmployeeId).FirstOrDefault();

                if (employee == null)
                {
                    return new Response
                    {
                        IsSuccess = false,
                        Message = _appSettings.GetConfigurationValue("EmployeeMessages", "EmployeeNotFound"),
                        HttpStatusCode = HttpStatusCode.BadRequest,
                    };
                }

                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();

                return new Response
                {
                    IsSuccess = true,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "DeleteEmployeeSuccess"),
                    HttpStatusCode = HttpStatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "DeleteEmployeeFailure") + " "+ ex.Message.ToString(),
                    HttpStatusCode = HttpStatusCode.BadRequest,
                };
            }
        }

        public async Task<List<Employee>> GetAll()
        {
            try
            {
                var s = _context.Employees;
                var employee = (from emp in _context.Employees
                                join dep in _context.Roles
                                on emp.RoleId equals dep.RoleId
                                select new Employee
                                {
                                    FirstName = emp.FirstName,
                                    LastName = emp.LastName,
                                    DateJoined = emp.DateJoined,
                                    EmployeeNumber = emp.EmployeeNumber,
                                    Extension = emp.Extension,
                                    RoleId = emp.RoleId,
                                    Role = emp.Role,
                                    EmployeeId = emp.EmployeeId,
                                }).OrderByDescending(x=>x.EmployeeId).ToListAsync();

                return await employee;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task<Employee> GetById(int employeeId)
        {
            try
            {
                var employee = (from emp in _context.Employees
                                join dep in _context.Roles
                                on emp.RoleId equals dep.RoleId
                                where emp.EmployeeId == employeeId
                                select new Employee
                                {
                                    FirstName = emp.FirstName,
                                    LastName = emp.LastName,
                                    DateJoined = emp.DateJoined,
                                    EmployeeNumber = emp.EmployeeNumber,
                                    Extension = emp.Extension,
                                    RoleId = emp.RoleId,
                                    Role = emp.Role,
                                    EmployeeId = emp.EmployeeId,
                                }).FirstOrDefaultAsync();
                return await employee;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.ToString());
            }           
        }
    }
}
