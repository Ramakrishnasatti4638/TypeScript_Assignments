using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace TSCrudAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private static List<User> _Users = new List<User>
        {
            // Add more Contacts here if needed
            new User { ID = "2", Name = "Ravi", Email = "wYUeh@example.com", Phone = "1234567890" },
            new User { ID = "3", Name = "Chandran", Email = "wYUeh@example.com", Phone = "1234567890" },
            new User { ID = "4", Name = "Baskaran", Email = "wYUeh@example.com", Phone = "1234567890" }
        };

        // GET: api/Contacts
        [HttpGet]
        public IActionResult GetContacts()
        {
            return Ok(_Users);
        }

        // GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetMedicine(string id)
        {
            var medicine = _Users.Find(m => m.ID == id);
            if (medicine == null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        //Adding a new medicine
        // POST: api/Contacts
        [HttpPost]
        public IActionResult PostMedicine([FromBody] User medicine)
        {
            _Users.Add(medicine);
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing medicine
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutMedicine(string id, [FromBody] User medicine)
        {
            var index = _Users.FindIndex(m => m.ID == id);
            if (index < 0)
            {
                return NotFound();
            }
            _Users[index] = medicine;
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing medicine
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(string id)
        {
            var medicine = _Users.Find(m => m.ID == id);
            if (medicine == null)
            {
                return NotFound();
            }
            _Users.Remove(medicine);
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}
