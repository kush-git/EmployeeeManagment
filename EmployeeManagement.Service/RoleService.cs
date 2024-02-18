using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using EmployeeManagement.Service.Interface;
using EmployeeeManagment.Domain.Models;
using EmployeeManagement.Service.Helper;

namespace EmployeeManagement.Service
{
    public class RoleService : IRole
    {
        private AppDbContext _context;
        private readonly ApplicationSettings _appSettings;
        public RoleService(AppDbContext context, ApplicationSettings applicationSettings)
        {
            _context = context;
            _appSettings = applicationSettings;
        }

        public async Task<List<Role>> GetAll()
        {
            try
            {
                var department=(from dep in _context.Roles
                                select new Role
                                {
                                    RoleId=dep.RoleId,
                                    RoleName=dep.RoleName
                                }).OrderByDescending(x=>x.RoleId).ToListAsync();
                return await department;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }
        public async Task<Role> GetById(int departmentId)
        {
            try
            {
                var department = (from dep in _context.Roles
                                  where dep.RoleId == departmentId
                                  select new Role
                                  {
                                      RoleId = dep.RoleId,
                                      RoleName = dep.RoleName
                                  }).FirstOrDefaultAsync();
                return await department;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }
    }
}
