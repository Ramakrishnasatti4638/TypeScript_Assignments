using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Medical.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private static List<Contacts> _Contacts = new List<Contacts>
        {
            // Add more Contacts here if needed
            new Contacts { ID = "2", Name = "Ravi", Email = "wYUeh@example.com", Phone = "1234567890" },
            new Contacts { ID = "3", Name = "Chandran", Email = "wYUeh@example.com", Phone = "1234567890" },
            new Contacts { ID = "4", Name = "Baskaran", Email = "wYUeh@example.com", Phone = "1234567890" }
        };

        // GET: api/Contacts
        [HttpGet]
        public IActionResult GetContacts()
        {
            return Ok(_Contacts);
        }

        // GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetMedicine(string id)
        {
            var medicine = _Contacts.Find(m => m.ID == id);
            if (medicine == null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        //Adding a new medicine
        // POST: api/Contacts
        [HttpPost]
        public IActionResult PostMedicine([FromBody] Contacts medicine)
        {
            _Contacts.Add(medicine);
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing medicine
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutMedicine(string id, [FromBody] Contacts medicine)
        {
            var index = _Contacts.FindIndex(m => m.ID == id);
            if (index < 0)
            {
                return NotFound();
            }
            _Contacts[index] = medicine;
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing medicine
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(string id)
        {
            var medicine = _Contacts.Find(m => m.ID == id);
            if (medicine == null)
            {
                return NotFound();
            }
            _Contacts.Remove(medicine);
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}
