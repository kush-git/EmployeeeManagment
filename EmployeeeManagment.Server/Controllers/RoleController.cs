using EmployeeeManagment.Domain.Models;
using EmployeeManagement.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EmployeeeManagment.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRole _departmentService;
        public RoleController(IRole departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        [HttpGet, Route("GetAll")]
        [ProducesResponseType(typeof(List<Role>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> GetAll()
        {
            var response = await _departmentService.GetAll();
            return Ok(response);
        }

        [HttpGet, Route("Get/{departmentId}")]
        public async Task<ActionResult> Get(int departmentId)
        {
            var response = await _departmentService.GetById(departmentId);
            return Ok(response);
        }
    }
}
