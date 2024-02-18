﻿using System;
using System.Collections.Generic;

namespace EmployeeeManagment.Domain.Models;

public partial class Employee
{
    public long EmployeeId { get; set; }

    public int EmployeeNumber { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateTime DateJoined { get; set; }

    public short? Extension { get; set; }

    public int? RoleId { get; set; }

    public virtual Role? Role { get; set; }
}
